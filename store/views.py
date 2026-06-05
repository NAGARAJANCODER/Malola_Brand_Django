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
from .models import Order, Product


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
    return render(request, 'store/index.html', {
        'db_our_products': db_our_products,
        'db_new_arrivals': db_new_arrivals,
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
            db_ingredients_json = json.dumps(ingredients)
            db_weights_json     = json.dumps(weights)
            db_nutrition_json   = json.dumps(nutrition)
    return render(request, 'store/product.html', {
        'db_new_arrivals':    db_new_arrivals,
        'db_product':         db_product,
        'db_ingredients_json': db_ingredients_json,
        'db_weights_json':     db_weights_json,
        'db_nutrition_json':   db_nutrition_json,
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
    stats = {
        'total':  products.count(),
        'our':    products.filter(category='our_products').count(),
        'new':    products.filter(category='new_arrival').count(),
        'active': products.filter(is_active=True).count(),
    }
    return render(request, 'store/admin_panel.html', {
        'products': products,
        'stats': stats,
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
    product_type = post.get('product_type', '').strip()
    weights      = post.get('weights', '100g,200g,500g').strip()
    ingredients  = post.get('ingredients', '').strip()
    nut_calories = post.get('nut_calories', '').strip()
    nut_protein  = post.get('nut_protein', '').strip()
    nut_fat      = post.get('nut_fat', '').strip()
    nut_carbs    = post.get('nut_carbs', '').strip()
    nut_fibre    = post.get('nut_fibre', '').strip()
    try:
        rating = float(post.get('rating', '4.5') or '4.5')
        rating = max(0.0, min(5.0, rating))
    except ValueError:
        rating = 4.5
    try:
        reviews_count = int(post.get('reviews_count', '0') or '0')
    except ValueError:
        reviews_count = 0

    if not all([title, slug, description, price]):
        return None, 'Title, slug, description and price are all required.'
    if not image and not product:
        return None, 'A product image is required.'

    data = dict(
        title=title, slug=slug, description=description, price=price,
        category=category, badge=badge, badge_color=badge_color, card_bg=card_bg,
        is_active=is_active, product_type=product_type, weights=weights,
        ingredients=ingredients, nut_calories=nut_calories, nut_protein=nut_protein,
        nut_fat=nut_fat, nut_carbs=nut_carbs, nut_fibre=nut_fibre,
        rating=rating, reviews_count=reviews_count,
    )
    if image:
        data['image'] = image
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
                    Product.objects.create(**data)
                    return redirect('manage_products')
                except Exception as exc:
                    error = str(exc)
    return render(request, 'store/admin_form.html', {'action': 'Add', 'error': error})


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
                return redirect('manage_products')
            except Exception as exc:
                error = str(exc)

    return render(request, 'store/admin_form.html', {
        'action': 'Edit',
        'product': product,
        'error': error,
    })


@_staff_required
def manage_delete_product(request, pk):
    product = get_object_or_404(Product, pk=pk)
    if request.method == 'POST':
        product.delete()
    return redirect('manage_products')


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
