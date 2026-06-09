from django.db import models
from django.contrib.auth.models import User


class OfferGroup(models.Model):
    name         = models.CharField(max_length=200)
    description  = models.TextField(blank=True)
    discount_pct = models.IntegerField(default=0, help_text='Discount 0-100%')
    badge_label  = models.CharField(max_length=60, blank=True, help_text='e.g. SALE 20% OFF')
    badge_color  = models.CharField(max_length=20, default='#c62828')
    is_active    = models.BooleanField(default=True)
    created_at   = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.name


class Category(models.Model):
    name        = models.CharField(max_length=100, unique=True)
    description = models.CharField(max_length=300, blank=True)
    sort_order  = models.IntegerField(default=0)
    is_active   = models.BooleanField(default=True)
    created_at  = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['sort_order', 'name']
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.name


class Product(models.Model):
    CATEGORY_CHOICES = [
        ('our_products', 'Our Products'),
        ('new_arrival',  'New Arrival'),
    ]
    title       = models.CharField(max_length=200)
    slug        = models.SlugField(max_length=200, unique=True, help_text='URL id, e.g. choco-bytes')
    description = models.TextField()
    price       = models.DecimalField(max_digits=10, decimal_places=2)
    image       = models.ImageField(upload_to='products/')
    video       = models.FileField(upload_to='products/videos/', blank=True, null=True)
    category         = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='our_products')
    product_category = models.ForeignKey('Category', on_delete=models.SET_NULL, null=True, blank=True, related_name='products')
    offer_group = models.ForeignKey(OfferGroup, on_delete=models.SET_NULL, null=True, blank=True, related_name='products')
    badge         = models.CharField(max_length=50, blank=True, help_text='Badge text e.g. NEW ✨')
    badge_color   = models.CharField(max_length=20, default='#1565C0', blank=True)
    card_bg       = models.CharField(max_length=20, default='#f4f7ff', blank=True, help_text='Image area background colour')
    # Product detail info
    product_type  = models.CharField(max_length=100, blank=True, help_text='e.g. Bites & Crunchies')
    weights       = models.CharField(max_length=200, default='100g,200g,500g', help_text='Comma-separated e.g. 100g,200g,500g')
    ingredients   = models.TextField(blank=True, help_text='Comma-separated e.g. Whole Millet, Jaggery, Cocoa')
    nut_calories  = models.CharField(max_length=50, blank=True, verbose_name='Calories (per 100g)')
    nut_protein   = models.CharField(max_length=50, blank=True, verbose_name='Protein')
    nut_fat       = models.CharField(max_length=50, blank=True, verbose_name='Fat')
    nut_carbs     = models.CharField(max_length=50, blank=True, verbose_name='Carbs')
    nut_fibre     = models.CharField(max_length=50, blank=True, verbose_name='Fibre')
    # ── Extended info ────────────────────────────────────────────
    short_description    = models.CharField(max_length=300, blank=True)
    brand                = models.CharField(max_length=100, blank=True)
    sku                  = models.CharField(max_length=100, blank=True)
    discount_price       = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    stock_quantity       = models.IntegerField(default=0)
    # ── Packaging & origin ──────────────────────────────────────
    package_size         = models.CharField(max_length=100, blank=True)
    country_of_origin    = models.CharField(max_length=100, blank=True, default='India')
    shelf_life           = models.CharField(max_length=100, blank=True)
    storage_instructions = models.TextField(blank=True)
    manufacturer_details = models.TextField(blank=True)
    # ── Extra nutrition ─────────────────────────────────────────
    nut_sugar            = models.CharField(max_length=50, blank=True, verbose_name='Sugar')
    nut_sodium           = models.CharField(max_length=50, blank=True, verbose_name='Sodium')
    # ── Recipe ──────────────────────────────────────────────────
    recipe_name          = models.CharField(max_length=200, blank=True)
    recipe_prep_time     = models.CharField(max_length=50, blank=True)
    recipe_cook_time     = models.CharField(max_length=50, blank=True)
    recipe_servings      = models.CharField(max_length=50, blank=True)
    recipe_ingredients   = models.TextField(blank=True)
    recipe_instructions  = models.TextField(blank=True)
    recipe_image         = models.ImageField(upload_to='products/recipes/', blank=True, null=True)
    recipe_video_url     = models.URLField(blank=True)
    # ── Health & certifications ──────────────────────────────────
    health_benefits      = models.TextField(blank=True, help_text='One benefit per line')
    cert_organic         = models.BooleanField(default=False)
    cert_non_gmo         = models.BooleanField(default=False)
    cert_vegan           = models.BooleanField(default=False)
    cert_halal           = models.BooleanField(default=False)
    cert_iso             = models.BooleanField(default=False)
    # ── SEO ─────────────────────────────────────────────────────
    seo_title            = models.CharField(max_length=200, blank=True)
    seo_description      = models.TextField(blank=True)
    seo_keywords         = models.CharField(max_length=500, blank=True)
    rating        = models.DecimalField(max_digits=3, decimal_places=1, default=4.5)
    reviews_count = models.IntegerField(default=0)
    is_active     = models.BooleanField(default=True)
    created_at    = models.DateTimeField(auto_now_add=True)
    updated_at    = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.title} (₹{self.price})'


class Review(models.Model):
    order       = models.OneToOneField('Order', on_delete=models.SET_NULL, null=True, blank=True, related_name='review')
    name        = models.CharField(max_length=100)
    photo       = models.ImageField(upload_to='reviews/', blank=True, null=True)
    review_text = models.TextField()
    rating      = models.IntegerField(default=5)
    is_active   = models.BooleanField(default=True)
    created_at  = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.name} ({self.rating}★)'


class SiteVideo(models.Model):
    title      = models.CharField(max_length=200, blank=True, help_text='Optional caption shown in admin')
    video      = models.FileField(upload_to='site_videos/')
    is_active  = models.BooleanField(default=True)
    sort_order = models.IntegerField(default=0, help_text='Lower number shown first')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['sort_order', '-created_at']

    def __str__(self):
        return self.title or f'Video #{self.pk}'


class ProductImage(models.Model):
    product    = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='gallery_images')
    image      = models.ImageField(upload_to='products/gallery/')
    sort_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['sort_order', 'id']

    def __str__(self):
        return f'Gallery image for {self.product}'


class Order(models.Model):
    STATUS_CHOICES = [
        ('pending',    'Pending'),
        ('confirmed',  'Confirmed'),
        ('processing', 'Processing'),
        ('shipped',    'Shipped'),
        ('delivered',  'Delivered'),
        ('cancelled',  'Cancelled'),
    ]
    user       = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='orders')
    name       = models.CharField(max_length=200)
    phone      = models.CharField(max_length=20)
    address    = models.TextField()
    items      = models.JSONField()
    total      = models.DecimalField(max_digits=10, decimal_places=2)
    PAYMENT_STATUS = [
        ('pending',     'Pending'),
        ('paid',        'Paid Online'),
        ('cod',         'Cash on Delivery'),
        ('failed',      'Payment Failed'),
    ]
    status              = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    payment_method      = models.CharField(max_length=50, blank=True, default='')
    payment_status      = models.CharField(max_length=20, choices=PAYMENT_STATUS, default='pending')
    razorpay_order_id   = models.CharField(max_length=100, blank=True)
    razorpay_payment_id = models.CharField(max_length=100, blank=True)
    created_at          = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'Order #{self.id} — {self.name} (₹{self.total})'
