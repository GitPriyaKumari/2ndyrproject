from django.contrib import admin
from django.urls import path
from .views import admin_login_api, add_category, get_categories

urlpatterns = [
    path('admin/login/', admin_login_api),
    path('categories/', get_categories),
    path('categories/add/', add_category),
]