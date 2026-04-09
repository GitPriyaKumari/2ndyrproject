from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from .serializers import *

@api_view(["POST"])
def admin_login_api(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username, password=password)

    if user is not None and user.is_staff:
        return Response(
            {
                "success": True,
                "message": "Login successful",
                "username": username
            },
            status=200
        )
    else:
        return Response(
            {
                "success": False,
                "message": "Invalid credentials"
            },
            status=401
        )
    
from rest_framework import status

@api_view(["POST"])
def add_category(request):
    name = request.data.get("name")
    category_status = request.data.get("status","1")
    is_active=True if str(status)=="1" else False
    category=Category.objects.create(name=name,is_active=is_active)
    serializer=CategorySerializer(category)

    
    return Response(
        {
            "success": True,
            "message": "Category has been created",
            "category": serializer.data
        },
        status=201
    )
