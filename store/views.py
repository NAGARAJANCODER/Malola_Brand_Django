import json
import hmac
import hashlib
import base64
import urllib.request
import urllib.error
from functools import wraps
from django.shortcuts import render, get_object_or_404, redirect
from django.http import JsonResponse, HttpResponseForbidden
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST, require_GET
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.contrib.auth.models import User
from django.conf import settings
from .models import Order, Product, OfferGroup, Review, SiteVideo, ProductImage, Category


# ── Razorpay helpers ──────────────────────────────────────────────────────────

def _rp_create_order(amount_paise, receipt):
    """Create a Razorpay order via REST API (no external package needed)."""
    creds = base64.b64encode(
        f'{settings.RAZORPAY_KEY_ID}:{settings.RAZORPAY_KEY_SECRET}'.encode()
    ).decode()
    payload = json.dumps({'amount': amount_paise, 'currency': 'INR', 'receipt': receipt}).encode()
    req = urllib.request.Request(
        'https://api.razorpay.com/v1/orders',
        data=payload,
        headers={'Authorization': f'Basic {creds}', 'Content-Type': 'application/json'},
    )
    with urllib.request.urlopen(req, timeout=15) as resp:
        return json.loads(resp.read())


def _rp_verify(rp_order_id, rp_payment_id, rp_signature):
    """Verify Razorpay payment signature using HMAC-SHA256."""
    msg = f'{rp_order_id}|{rp_payment_id}'.encode()
    expected = hmac.new(settings.RAZORPAY_KEY_SECRET.encode(), msg, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, rp_signature)


# ── helpers ──────────────────────────────────────────────────────────────────

def _staff_required(func):
    """Redirect to Django admin login if not authenticated/staff."""
    @wraps(func)
    def wrapper(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return redirect(f'/admin/login/?next={request.path}')
        if not request.user.is_staff:
            return HttpResponseForbidden(
                '<h2 style="font-family:sans-serif;padding:40px">403 — Staff access only. '
                '<a href="/admin/login/">Login as admin</a></h2>'
            )
        return func(request, *args, **kwargs)
    return wrapper


# ── public pages ─────────────────────────────────────────────────────────────

def home(request):
    db_our_products = Product.objects.filter(category='our_products', is_active=True)
    db_new_arrivals = Product.objects.filter(category='new_arrival',  is_active=True)
    db_reviews      = Review.objects.filter(is_active=True)
    db_videos       = SiteVideo.objects.filter(is_active=True)
    return render(request, 'store/index.html', {
        'db_our_products': db_our_products,
        'db_new_arrivals': db_new_arrivals,
        'db_reviews':      db_reviews,
        'db_videos':       db_videos,
    })


def shop(request):
    db_our_products = Product.objects.filter(category='our_products', is_active=True)
    db_new_arrivals = Product.objects.filter(category='new_arrival',  is_active=True)
    return render(request, 'store/shop.html', {
        'db_our_products': db_our_products,
        'db_new_arrivals': db_new_arrivals,
    })


def product(request):
    db_new_arrivals = Product.objects.filter(category='new_arrival', is_active=True)
    pid        = request.GET.get('id', '')
    db_product = None
    db_ingredients_json = '[]'
    db_weights_json     = '["100g","200g","500g"]'
    db_nutrition_json   = '{}'
    db_gallery_json     = '[]'
    if pid:
        db_product = Product.objects.filter(slug=pid, is_active=True).first()
        if db_product:
            ingredients = [i.strip() for i in db_product.ingredients.split(',') if i.strip()] if db_product.ingredients else []
            weights     = [w.strip() for w in db_product.weights.split(',') if w.strip()] if db_product.weights else ['100g', '200g', '500g']
            nutrition   = {}
            if db_product.nut_calories: nutrition['Calories'] = db_product.nut_calories
            if db_product.nut_protein:  nutrition['Protein']  = db_product.nut_protein
            if db_product.nut_fat:      nutrition['Fat']      = db_product.nut_fat
            if db_product.nut_carbs:    nutrition['Carbs']    = db_product.nut_carbs
            if db_product.nut_fibre:    nutrition['Fibre']    = db_product.nut_fibre
            if db_product.nut_sugar:    nutrition['Sugar']    = db_product.nut_sugar
            if db_product.nut_sodium:   nutrition['Sodium']   = db_product.nut_sodium
            gallery = [img.image.url for img in db_product.gallery_images.all()]
            db_ingredients_json = json.dumps(ingredients)
            db_weights_json     = json.dumps(weights)
            db_nutrition_json   = json.dumps(nutrition)
            db_gallery_json     = json.dumps(gallery)
    return render(request, 'store/product.html', {
        'db_new_arrivals':     db_new_arrivals,
        'db_product':          db_product,
        'db_ingredients_json': db_ingredients_json,
        'db_weights_json':     db_weights_json,
        'db_nutrition_json':   db_nutrition_json,
        'db_gallery_json':     db_gallery_json,
    })


def orders_page(request):
    if not request.user.is_authenticated:
        return redirect('/?login=1')
    orders = Order.objects.filter(user=request.user)
    return render(request, 'store/orders.html', {'orders': orders})


# ── admin product manager ─────────────────────────────────────────────────────

@_staff_required
def manage_products(request):
    products = Product.objects.all()
    pending_orders = Order.objects.filter(status='pending').count()
    stats = {
        'total':  products.count(),
        'our':    products.filter(category='our_products').count(),
        'new':    products.filter(category='new_arrival').count(),
        'active': products.filter(is_active=True).count(),
    }
    return render(request, 'store/admin_panel.html', {
        'products': products,
        'stats': stats,
        'pending_orders': pending_orders,
    })


def _product_from_post(post, files, product=None):
    """Pull all product fields from POST/FILES. Returns (data_dict, error_string)."""
    title        = post.get('title', '').strip()
    slug         = post.get('slug', '').strip()
    description  = post.get('description', '').strip()
    price        = post.get('price', '').strip()
    category     = post.get('category', 'our_products')
    badge        = post.get('badge', '').strip()
    badge_color  = post.get('badge_color', '#1565C0')
    card_bg      = post.get('card_bg', '#f4f7ff')
    is_active    = post.get('is_active') == 'on'
    image        = files.get('image')
    video        = files.get('video')
    product_type = post.get('product_type', '').strip()
    weights      = post.get('weights', '100g,200g,500g').strip()
    ingredients  = post.get('ingredients', '').strip()
    nut_calories = post.get('nut_calories', '').strip()
    nut_protein  = post.get('nut_protein', '').strip()
    nut_fat      = post.get('nut_fat', '').strip()
    nut_carbs    = post.get('nut_carbs', '').strip()
    nut_fibre    = post.get('nut_fibre', '').strip()
    # extended fields
    short_description    = post.get('short_description', '').strip()
    brand                = post.get('brand', '').strip()
    sku                  = post.get('sku', '').strip()
    discount_price_raw   = post.get('discount_price', '').strip()
    discount_price       = None
    if discount_price_raw:
        try:
            discount_price = float(discount_price_raw)
        except ValueError:
            pass
    try:
        stock_quantity = int(post.get('stock_quantity', '0') or '0')
    except ValueError:
        stock_quantity = 0
    package_size         = post.get('package_size', '').strip()
    country_of_origin    = post.get('country_of_origin', '').strip()
    shelf_life           = post.get('shelf_life', '').strip()
    storage_instructions = post.get('storage_instructions', '').strip()
    manufacturer_details = post.get('manufacturer_details', '').strip()
    nut_sugar            = post.get('nut_sugar', '').strip()
    nut_sodium           = post.get('nut_sodium', '').strip()
    recipe_name          = post.get('recipe_name', '').strip()
    recipe_prep_time     = post.get('recipe_prep_time', '').strip()
    recipe_cook_time     = post.get('recipe_cook_time', '').strip()
    recipe_servings      = post.get('recipe_servings', '').strip()
    recipe_ingredients   = post.get('recipe_ingredients', '').strip()
    recipe_instructions  = post.get('recipe_instructions', '').strip()
    recipe_image         = files.get('recipe_image')
    recipe_video_url     = post.get('recipe_video_url', '').strip()
    health_benefits      = post.get('health_benefits', '').strip()
    cert_organic         = post.get('cert_organic') == 'on'
    cert_non_gmo         = post.get('cert_non_gmo') == 'on'
    cert_vegan           = post.get('cert_vegan') == 'on'
    cert_halal           = post.get('cert_halal') == 'on'
    cert_iso             = post.get('cert_iso') == 'on'
    seo_title            = post.get('seo_title', '').strip()
    seo_description      = post.get('seo_description', '').strip()
    seo_keywords         = post.get('seo_keywords', '').strip()
    try:
        rating = float(post.get('rating', '4.5') or '4.5')
        rating = max(0.0, min(5.0, rating))
    except ValueError:
        rating = 4.5
    try:
        reviews_count = int(post.get('reviews_count', '0') or '0')
    except ValueError:
        reviews_count = 0
    offer_group_id = post.get('offer_group', '').strip()
    offer_group = None
    if offer_group_id:
        try:
            offer_group = OfferGroup.objects.get(pk=int(offer_group_id))
        except (OfferGroup.DoesNotExist, ValueError):
            pass

    product_category_id = post.get('product_category', '').strip()
    product_category = None
    if product_category_id:
        try:
            product_category = Category.objects.get(pk=int(product_category_id))
        except (Category.DoesNotExist, ValueError):
            pass

    if not all([title, slug, description, price]):
        return None, 'Title, slug, description and price are all required.'
    if not image and not product:
        return None, 'A product image is required.'

    data = dict(
        title=title, slug=slug, description=description, price=price,
        category=category, product_category=product_category,
        badge=badge, badge_color=badge_color, card_bg=card_bg,
        is_active=is_active, product_type=product_type, weights=weights,
        ingredients=ingredients, nut_calories=nut_calories, nut_protein=nut_protein,
        nut_fat=nut_fat, nut_carbs=nut_carbs, nut_fibre=nut_fibre,
        rating=rating, reviews_count=reviews_count, offer_group=offer_group,
        short_description=short_description, brand=brand, sku=sku,
        discount_price=discount_price, stock_quantity=stock_quantity,
        package_size=package_size, country_of_origin=country_of_origin,
        shelf_life=shelf_life, storage_instructions=storage_instructions,
        manufacturer_details=manufacturer_details,
        nut_sugar=nut_sugar, nut_sodium=nut_sodium,
        recipe_name=recipe_name, recipe_prep_time=recipe_prep_time,
        recipe_cook_time=recipe_cook_time, recipe_servings=recipe_servings,
        recipe_ingredients=recipe_ingredients, recipe_instructions=recipe_instructions,
        recipe_video_url=recipe_video_url,
        health_benefits=health_benefits,
        cert_organic=cert_organic, cert_non_gmo=cert_non_gmo,
        cert_vegan=cert_vegan, cert_halal=cert_halal, cert_iso=cert_iso,
        seo_title=seo_title, seo_description=seo_description, seo_keywords=seo_keywords,
    )
    if image:
        data['image'] = image
    if video:
        data['video'] = video
    if recipe_image:
        data['recipe_image'] = recipe_image
    return data, None


@_staff_required
def manage_add_product(request):
    error = None
    if request.method == 'POST':
        data, error = _product_from_post(request.POST, request.FILES)
        if not error:
            slug = data['slug']
            if Product.objects.filter(slug=slug).exists():
                error = f'A product with the slug "{slug}" already exists. Choose a different one.'
            else:
                try:
                    product = Product.objects.create(**data)
                    for gf in request.FILES.getlist('gallery_images'):
                        ProductImage.objects.create(product=product, image=gf)
                    return redirect('manage_products')
                except Exception as exc:
                    error = str(exc)
    return render(request, 'store/admin_form.html', {
        'action': 'Add', 'error': error,
        'offer_groups': OfferGroup.objects.filter(is_active=True),
        'categories': Category.objects.filter(is_active=True),
        'pending_orders': _pending_orders(),
    })


@_staff_required
def manage_edit_product(request, pk):
    product = get_object_or_404(Product, pk=pk)
    error = None
    if request.method == 'POST':
        data, error = _product_from_post(request.POST, request.FILES, product)
        if not error:
            for field, value in data.items():
                setattr(product, field, value)
            try:
                product.save()
                for gf in request.FILES.getlist('gallery_images'):
                    ProductImage.objects.create(product=product, image=gf)
                return redirect('manage_products')
            except Exception as exc:
                error = str(exc)

    return render(request, 'store/admin_form.html', {
        'action': 'Edit',
        'product': product,
        'error': error,
        'offer_groups': OfferGroup.objects.filter(is_active=True),
        'categories': Category.objects.filter(is_active=True),
        'gallery_images': product.gallery_images.all(),
        'pending_orders': _pending_orders(),
    })


@_staff_required
@require_POST
def manage_delete_gallery_image(request, pk, img_pk):
    product = get_object_or_404(Product, pk=pk)
    img = get_object_or_404(ProductImage, pk=img_pk, product=product)
    if img.image:
        img.image.delete(save=False)
    img.delete()
    return redirect(f'/manage/edit/{pk}/#media')


@_staff_required
def manage_delete_product(request, pk):
    product = get_object_or_404(Product, pk=pk)
    if request.method == 'POST':
        product.delete()
    return redirect('manage_products')


# ── admin categories ─────────────────────────────────────────────────────────

@_staff_required
def manage_categories(request):
    categories = Category.objects.all()
    return render(request, 'store/admin_categories.html', {
        'categories': categories,
        'pending_orders': _pending_orders(),
    })


@_staff_required
def manage_add_category(request):
    error = None
    if request.method == 'POST':
        name = request.POST.get('name', '').strip()
        description = request.POST.get('description', '').strip()
        sort_order = request.POST.get('sort_order', '0').strip()
        is_active = request.POST.get('is_active') == 'on'
        if not name:
            error = 'Category name is required.'
        elif Category.objects.filter(name=name).exists():
            error = f'A category named "{name}" already exists.'
        else:
            try:
                Category.objects.create(
                    name=name, description=description,
                    sort_order=int(sort_order or 0), is_active=is_active,
                )
                return redirect('manage_categories')
            except Exception as exc:
                error = str(exc)
    return render(request, 'store/admin_category_form.html', {
        'action': 'Add', 'error': error, 'pending_orders': _pending_orders(),
    })


@_staff_required
def manage_edit_category(request, pk):
    cat = get_object_or_404(Category, pk=pk)
    error = None
    if request.method == 'POST':
        name = request.POST.get('name', '').strip()
        description = request.POST.get('description', '').strip()
        sort_order = request.POST.get('sort_order', '0').strip()
        is_active = request.POST.get('is_active') == 'on'
        if not name:
            error = 'Category name is required.'
        elif Category.objects.filter(name=name).exclude(pk=pk).exists():
            error = f'A category named "{name}" already exists.'
        else:
            cat.name = name
            cat.description = description
            cat.sort_order = int(sort_order or 0)
            cat.is_active = is_active
            cat.save()
            return redirect('manage_categories')
    return render(request, 'store/admin_category_form.html', {
        'action': 'Edit', 'cat': cat, 'error': error, 'pending_orders': _pending_orders(),
    })


@_staff_required
def manage_delete_category(request, pk):
    cat = get_object_or_404(Category, pk=pk)
    if request.method == 'POST':
        cat.delete()
    return redirect('manage_categories')


# ── admin orders ──────────────────────────────────────────────────────────────

@_staff_required
def manage_orders(request):
    orders = Order.objects.select_related('user').all()
    status_filter = request.GET.get('status', '')
    if status_filter:
        orders = orders.filter(status=status_filter)
    stats = {
        'total':   Order.objects.count(),
        'pending': Order.objects.filter(status='pending').count(),
        'paid':    Order.objects.filter(payment_status='paid').count(),
        'cod':     Order.objects.filter(payment_status='cod').count(),
    }
    pending_orders = stats['pending']
    return render(request, 'store/admin_orders.html', {
        'orders': orders,
        'status_filter': status_filter,
        'status_choices': Order.STATUS_CHOICES,
        'stats': stats,
        'pending_orders': pending_orders,
    })


@_staff_required
def manage_order_status(request, pk):
    if request.method == 'POST':
        order = get_object_or_404(Order, pk=pk)
        new_status = request.POST.get('status', '')
        valid = [s[0] for s in Order.STATUS_CHOICES]
        if new_status in valid:
            order.status = new_status
            order.save(update_fields=['status'])
    status_back = request.POST.get('status_filter', '')
    if status_back in [s[0] for s in Order.STATUS_CHOICES]:
        return redirect(f'/manage/orders/?status={status_back}')
    return redirect('manage_orders')


# ── admin offers ──────────────────────────────────────────────────────────────

@_staff_required
def manage_offers(request):
    offers = OfferGroup.objects.prefetch_related('products').all()
    pending_orders = Order.objects.filter(status='pending').count()
    return render(request, 'store/admin_offers.html', {
        'offers': offers,
        'pending_orders': pending_orders,
    })


@_staff_required
def manage_add_offer(request):
    error = None
    if request.method == 'POST':
        name        = request.POST.get('name', '').strip()
        description = request.POST.get('description', '').strip()
        badge_label = request.POST.get('badge_label', '').strip()
        badge_color = request.POST.get('badge_color', '#c62828')
        is_active   = request.POST.get('is_active') == 'on'
        product_ids = request.POST.getlist('products')
        try:
            discount_pct = max(0, min(100, int(request.POST.get('discount_pct', 0) or 0)))
        except ValueError:
            discount_pct = 0
        if not name:
            error = 'Offer name is required.'
        else:
            offer = OfferGroup.objects.create(
                name=name, description=description, discount_pct=discount_pct,
                badge_label=badge_label, badge_color=badge_color, is_active=is_active,
            )
            if product_ids:
                Product.objects.filter(pk__in=product_ids).update(offer_group=offer)
            return redirect('manage_offers')
    all_products = Product.objects.filter(category='new_arrival').order_by('title')
    pending_orders = Order.objects.filter(status='pending').count()
    return render(request, 'store/admin_offer_form.html', {
        'action': 'Add', 'error': error,
        'all_products': all_products, 'offer': None,
        'pending_orders': pending_orders,
    })


@_staff_required
def manage_edit_offer(request, pk):
    offer = get_object_or_404(OfferGroup, pk=pk)
    error = None
    if request.method == 'POST':
        name        = request.POST.get('name', '').strip()
        description = request.POST.get('description', '').strip()
        badge_label = request.POST.get('badge_label', '').strip()
        badge_color = request.POST.get('badge_color', '#c62828')
        is_active   = request.POST.get('is_active') == 'on'
        product_ids = request.POST.getlist('products')
        try:
            discount_pct = max(0, min(100, int(request.POST.get('discount_pct', 0) or 0)))
        except ValueError:
            discount_pct = 0
        if not name:
            error = 'Offer name is required.'
        else:
            offer.name = name; offer.description = description
            offer.discount_pct = discount_pct; offer.badge_label = badge_label
            offer.badge_color = badge_color; offer.is_active = is_active
            offer.save()
            offer.products.update(offer_group=None)
            if product_ids:
                Product.objects.filter(pk__in=product_ids).update(offer_group=offer)
            return redirect('manage_offers')
    all_products  = Product.objects.filter(category='new_arrival').order_by('title')
    assigned_ids  = list(offer.products.values_list('pk', flat=True))
    pending_orders = Order.objects.filter(status='pending').count()
    return render(request, 'store/admin_offer_form.html', {
        'action': 'Edit', 'error': error,
        'all_products': all_products, 'offer': offer, 'assigned_ids': assigned_ids,
        'pending_orders': pending_orders,
    })


@_staff_required
def manage_delete_offer(request, pk):
    offer = get_object_or_404(OfferGroup, pk=pk)
    if request.method == 'POST':
        offer.products.update(offer_group=None)
        offer.delete()
    return redirect('manage_offers')


# ── admin reviews ─────────────────────────────────────────────────────────────

def _pending_orders():
    return Order.objects.filter(status='pending').count()


@_staff_required
def manage_reviews(request):
    reviews = Review.objects.select_related('order').all()
    return render(request, 'store/admin_reviews.html', {
        'reviews': reviews,
        'pending_orders': _pending_orders(),
    })


@_staff_required
def manage_delete_review(request, pk):
    review = get_object_or_404(Review, pk=pk)
    if request.method == 'POST':
        review.delete()
    return redirect('manage_reviews')


# ── admin videos ──────────────────────────────────────────────────────────────

@_staff_required
def manage_videos(request):
    videos = SiteVideo.objects.all()
    return render(request, 'store/admin_videos.html', {
        'videos':         videos,
        'pending_orders': _pending_orders(),
    })


@_staff_required
@require_POST
def manage_upload_video(request):
    video_file = request.FILES.get('video')
    title      = request.POST.get('title', '').strip()
    sort_order = request.POST.get('sort_order', '0').strip()
    if not video_file:
        return redirect('manage_videos')
    try:
        sort_order = int(sort_order)
    except ValueError:
        sort_order = 0
    SiteVideo.objects.create(video=video_file, title=title, sort_order=sort_order)
    return redirect('manage_videos')


@_staff_required
@require_POST
def manage_delete_video(request, pk):
    video = get_object_or_404(SiteVideo, pk=pk)
    if video.video:
        video.video.delete(save=False)
    video.delete()
    return redirect('manage_videos')


@_staff_required
@require_POST
def manage_toggle_video(request, pk):
    video = get_object_or_404(SiteVideo, pk=pk)
    video.is_active = not video.is_active
    video.save(update_fields=['is_active'])
    return redirect('manage_videos')


def submit_review(request, order_pk):
    order = get_object_or_404(Order, pk=order_pk)
    already = hasattr(order, 'review') and order.review is not None
    if already:
        return render(request, 'store/submit_review.html', {
            'order': order, 'already_reviewed': True,
        })
    if request.method == 'POST':
        name   = request.POST.get('name', '').strip() or order.name
        text   = request.POST.get('review_text', '').strip()
        rating = request.POST.get('rating', '5')
        photo  = request.FILES.get('photo')
        if text:
            rev = Review(
                order=order, name=name, review_text=text,
                rating=min(5, max(1, int(rating) if rating.isdigit() else 5)),
                is_active=True,
            )
            if photo:
                rev.photo = photo
            rev.save()
            return render(request, 'store/submit_review.html', {
                'order': order, 'success': True,
            })
        return render(request, 'store/submit_review.html', {
            'order': order, 'error': 'Please write your review before submitting.',
        })
    return render(request, 'store/submit_review.html', {'order': order})


# ── checkout & payment ────────────────────────────────────────────────────────

def checkout_page(request, order_id):
    if not request.user.is_authenticated:
        return redirect(f'/?login=1')
    order = get_object_or_404(Order, id=order_id, user=request.user)
    if order.payment_status in ('paid', 'cod'):
        return redirect('orders')
    db_new_arrivals = Product.objects.filter(category='new_arrival', is_active=True)
    return render(request, 'store/checkout.html', {
        'order':            order,
        'razorpay_key':     settings.RAZORPAY_KEY_ID,
        'db_new_arrivals':  db_new_arrivals,
    })


@csrf_exempt
@require_POST
def create_razorpay_order(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Login required'}, status=401)
    try:
        data     = json.loads(request.body)
        order    = get_object_or_404(Order, id=data['order_id'], user=request.user)
        rp_order = _rp_create_order(int(float(order.total) * 100), f'order_{order.id}')
        order.razorpay_order_id = rp_order['id']
        order.save(update_fields=['razorpay_order_id'])
        return JsonResponse({
            'razorpay_order_id': rp_order['id'],
            'amount':            rp_order['amount'],
            'currency':          rp_order['currency'],
            'key':               settings.RAZORPAY_KEY_ID,
        })
    except urllib.error.URLError:
        return JsonResponse({'error': 'Could not connect to payment gateway. Check your Razorpay keys.'}, status=502)
    except Exception as exc:
        return JsonResponse({'error': str(exc)}, status=400)


@csrf_exempt
@require_POST
def verify_payment(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Login required'}, status=401)
    try:
        data = json.loads(request.body)
        ok   = _rp_verify(
            data['razorpay_order_id'],
            data['razorpay_payment_id'],
            data['razorpay_signature'],
        )
        if not ok:
            return JsonResponse({'success': False, 'error': 'Signature mismatch'}, status=400)
        order = get_object_or_404(Order, id=data['order_db_id'], user=request.user)
        order.payment_status      = 'paid'
        order.payment_method      = 'online'
        order.razorpay_payment_id = data['razorpay_payment_id']
        order.status              = 'confirmed'
        order.save(update_fields=['payment_status','payment_method','razorpay_payment_id','status'])
        return JsonResponse({'success': True})
    except Exception as exc:
        return JsonResponse({'success': False, 'error': str(exc)}, status=400)


@csrf_exempt
@require_POST
def confirm_cod(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Login required'}, status=401)
    try:
        data  = json.loads(request.body)
        order = get_object_or_404(Order, id=data['order_id'], user=request.user)
        order.payment_method = 'cod'
        order.payment_status = 'cod'
        order.status         = 'confirmed'
        order.save(update_fields=['payment_method','payment_status','status'])
        return JsonResponse({'success': True})
    except Exception as exc:
        return JsonResponse({'success': False, 'error': str(exc)}, status=400)


# ── order API ─────────────────────────────────────────────────────────────────

@csrf_exempt
@require_POST
def place_order(request):
    if not request.user.is_authenticated:
        return JsonResponse({'success': False, 'error': 'Login required'}, status=401)
    try:
        data  = json.loads(request.body)
        order = Order.objects.create(
            user           = request.user,
            name           = data['name'],
            phone          = data['phone'],
            address        = data['address'],
            items          = data['items'],
            total          = data['total'],
            payment_status = 'pending',
        )
        return JsonResponse({
            'success':  True,
            'order_id': order.id,
            'redirect': f'/checkout/{order.id}/',
        })
    except (KeyError, json.JSONDecodeError) as e:
        return JsonResponse({'success': False, 'error': str(e)}, status=400)


@require_GET
def get_saved_address(request):
    """Return the name/phone/address from the user's most recent order."""
    if not request.user.is_authenticated:
        return JsonResponse({'found': False})
    order = Order.objects.filter(user=request.user).order_by('-created_at').first()
    if not order:
        return JsonResponse({'found': False})
    return JsonResponse({
        'found':   True,
        'name':    order.name,
        'phone':   order.phone,
        'address': order.address,
    })


@require_GET
def get_order(request, order_id):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Login required'}, status=401)
    order = get_object_or_404(Order, id=order_id, user=request.user)
    return JsonResponse({
        'id':         order.id,
        'name':       order.name,
        'phone':      order.phone,
        'address':    order.address,
        'items':      order.items,
        'total':      str(order.total),
        'status':     order.status,
        'created_at': order.created_at.isoformat(),
    })


# ── auth API ──────────────────────────────────────────────────────────────────

@csrf_exempt
@require_POST
def register_view(request):
    try:
        data     = json.loads(request.body)
        name     = data.get('name', '').strip()
        email    = data.get('email', '').strip().lower()
        password = data.get('password', '')
        if not email or not password:
            return JsonResponse({'success': False, 'error': 'Email and password are required'})
        if len(password) < 6:
            return JsonResponse({'success': False, 'error': 'Password must be at least 6 characters'})
        if User.objects.filter(username=email).exists():
            return JsonResponse({'success': False, 'error': 'Email is already registered'})
        parts      = name.split()
        first_name = parts[0] if parts else ''
        last_name  = ' '.join(parts[1:]) if len(parts) > 1 else ''
        user = User.objects.create_user(
            username=email, email=email, password=password,
            first_name=first_name, last_name=last_name,
        )
        auth_login(request, user)
        return JsonResponse({'success': True, 'name': name or email})
    except json.JSONDecodeError:
        return JsonResponse({'success': False, 'error': 'Invalid data'}, status=400)


@csrf_exempt
@require_POST
def login_view(request):
    try:
        data     = json.loads(request.body)
        email    = data.get('email', '').strip().lower()
        password = data.get('password', '')
        user     = authenticate(request, username=email, password=password)
        if user:
            auth_login(request, user)
            name = user.get_full_name() or user.first_name or user.username
            return JsonResponse({'success': True, 'name': name})
        return JsonResponse({'success': False, 'error': 'Invalid email or password'})
    except json.JSONDecodeError:
        return JsonResponse({'success': False, 'error': 'Invalid data'}, status=400)


@csrf_exempt
@require_POST
def logout_view(request):
    auth_logout(request)
    return JsonResponse({'success': True})
