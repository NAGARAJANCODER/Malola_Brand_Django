from django.urls import path
from . import views

urlpatterns = [
    # public pages
    path('',        views.home,        name='home'),
    path('shop/',   views.shop,        name='shop'),
    path('product/', views.product,    name='product'),
    path('orders/', views.orders_page, name='orders'),

    # product admin panel
    path('manage/',                      views.manage_products,     name='manage_products'),
    path('manage/add/',                  views.manage_add_product,  name='manage_add'),
    path('manage/edit/<int:pk>/',        views.manage_edit_product, name='manage_edit'),
    path('manage/delete/<int:pk>/',      views.manage_delete_product, name='manage_delete'),

    # checkout & payment
    path('checkout/<int:order_id>/',     views.checkout_page,           name='checkout'),
    path('api/razorpay-order/',          views.create_razorpay_order,   name='razorpay_order'),
    path('api/verify-payment/',          views.verify_payment,          name='verify_payment'),
    path('api/confirm-cod/',             views.confirm_cod,             name='confirm_cod'),

    # order API
    path('api/place-order/',             views.place_order,       name='place_order'),
    path('api/orders/<int:order_id>/',   views.get_order,         name='get_order'),
    path('api/saved-address/',           views.get_saved_address, name='saved_address'),

    # auth API
    path('api/register/', views.register_view, name='register'),
    path('api/login/',    views.login_view,    name='login'),
    path('api/logout/',   views.logout_view,   name='logout'),
]
