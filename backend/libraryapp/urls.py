from django.contrib import admin
from django.urls import path
from .views import admin_login_api

urlpatterns = [
    path("api/admin/login/", admin_login_api),
]