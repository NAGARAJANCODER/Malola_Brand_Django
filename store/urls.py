from django.urls import path
from . import views

urlpatterns = [
    # public pages
    path('',        views.home,        name='home'),
    path('shop/',   views.shop,        name='shop'),
    path('product/', views.product,    name='product'),
    path('orders/', views.orders_page, name='orders'),

    # product admin panel
    path('manage/',                         views.manage_products,      name='manage_products'),
    path('manage/add/',                     views.manage_add_product,   name='manage_add'),
    path('manage/edit/<int:pk>/',           views.manage_edit_product,  name='manage_edit'),
    path('manage/delete/<int:pk>/',         views.manage_delete_product, name='manage_delete'),
    path('manage/products/<int:pk>/gallery/<int:img_pk>/delete/', views.manage_delete_gallery_image, name='manage_delete_gallery_image'),
    # orders admin
    path('manage/orders/',                  views.manage_orders,        name='manage_orders'),
    path('manage/orders/<int:pk>/status/',  views.manage_order_status,  name='manage_order_status'),
    # offers admin
    path('manage/offers/',                  views.manage_offers,        name='manage_offers'),
    path('manage/offers/add/',              views.manage_add_offer,     name='manage_add_offer'),
    path('manage/offers/edit/<int:pk>/',    views.manage_edit_offer,    name='manage_edit_offer'),
    path('manage/offers/delete/<int:pk>/',  views.manage_delete_offer,  name='manage_delete_offer'),
    # categories admin
    path('manage/categories/',                     views.manage_categories,      name='manage_categories'),
    path('manage/categories/add/',                 views.manage_add_category,    name='manage_add_category'),
    path('manage/categories/edit/<int:pk>/',       views.manage_edit_category,   name='manage_edit_category'),
    path('manage/categories/delete/<int:pk>/',     views.manage_delete_category, name='manage_delete_category'),
    # reviews — admin view + customer submission
    path('manage/reviews/',                 views.manage_reviews,       name='manage_reviews'),
    path('manage/reviews/delete/<int:pk>/', views.manage_delete_review, name='manage_delete_review'),
    path('review/<int:order_pk>/',          views.submit_review,        name='submit_review'),
    # videos admin
    path('manage/videos/',                  views.manage_videos,        name='manage_videos'),
    path('manage/videos/upload/',           views.manage_upload_video,  name='manage_upload_video'),
    path('manage/videos/delete/<int:pk>/',  views.manage_delete_video,  name='manage_delete_video'),
    path('manage/videos/toggle/<int:pk>/',  views.manage_toggle_video,  name='manage_toggle_video'),

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
