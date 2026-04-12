from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import *
from .serializers import *


# ✅ ADMIN LOGIN
@api_view(["POST"])
def admin_login_api(request):
    username = request.data.get("username")
    password = request.data.get("password")

    try:
        user = authenticate(username=username, password=password)

        if user is not None and user.is_staff:
            return Response(
                {
                    "success": True,
                    "message": "Login successful",
                    "username": username
                },
                status=status.HTTP_200_OK
            )
        else:
            return Response(
                {
                    "success": False,
                    "message": "Invalid credentials"
                },
                status=status.HTTP_401_UNAUTHORIZED
            )

    except Exception as e:
        print("LOGIN ERROR:", str(e))
        return Response(
            {"success": False, "message": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


# ✅ GET ALL CATEGORIES
@api_view(["GET"])
def get_categories(request):
    try:
        print("GET CATEGORIES HIT")  # 🔥 debug

        categories = Category.objects.all().order_by("-id")[:20]
        serializer = CategorySerializer(categories, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    except Exception as e:
        print("GET ERROR:", str(e))
        return Response(
            {"success": False, "message": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


# ✅ ADD CATEGORY
@api_view(["POST"])
def add_category(request):
    try:
        print("ADD CATEGORY HIT")  # 🔥 debug

        name = request.data.get("name")
        category_status = request.data.get("status", "1")

        # ✅ validation
        if not name:
            return Response(
                {"success": False, "message": "Category name is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # ✅ convert status
        is_active = True if str(category_status) == "1" else False

        category = Category.objects.create(
            name=name,
            is_active=is_active
        )

        serializer = CategorySerializer(category)

        print("CATEGORY CREATED SUCCESSFULLY")  # 🔥 debug

        return Response(
            {
                "success": True,
                "message": "Category has been created",
                "category": serializer.data
            },
            status=status.HTTP_201_CREATED
        )

    except Exception as e:
        print("ADD ERROR:", str(e))  # 🔥 REAL ERROR
        return Response(
            {"success": False, "message": str(e)},  # ✅ show actual error
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )