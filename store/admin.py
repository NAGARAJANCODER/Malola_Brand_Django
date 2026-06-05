from django.contrib import admin
from .models import Order, Product


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display   = ('id', 'title', 'category', 'price', 'is_active', 'created_at')
    list_filter    = ('category', 'is_active')
    search_fields  = ('title', 'slug', 'description')
    prepopulated_fields = {'slug': ('title',)}
    list_editable  = ('is_active',)
    readonly_fields = ('created_at', 'updated_at')


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display  = ('id', 'name', 'phone', 'total', 'status', 'created_at')
    list_filter   = ('status',)
    search_fields = ('name', 'phone', 'address')
    list_editable = ('status',)
    readonly_fields = ('created_at',)
    ordering      = ('-created_at',)
