from django.db import models
from django.contrib.auth.models import User


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
    category    = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='our_products')
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
    rating        = models.DecimalField(max_digits=3, decimal_places=1, default=4.5)
    reviews_count = models.IntegerField(default=0)
    is_active     = models.BooleanField(default=True)
    created_at    = models.DateTimeField(auto_now_add=True)
    updated_at    = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.title} (₹{self.price})'


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
