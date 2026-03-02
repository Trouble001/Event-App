from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User


class CustomUserAdmin(UserAdmin):
    model = User

    list_display = (
        "phone_number",
        "email",
        "full_name",
        "gender",
        "is_staff",
        "is_active",
        "date_created",
    )

    list_filter = (
        "is_staff",
        "is_active",
        "gender",
        "email",
    )

    ordering = ("-date_created",)

    search_fields = ("phone_number", "email", "full_name")

    fieldsets = (
        (None, {"fields": ("phone_number", "password")}),
        ("Personal Info", {"fields": ("email", "full_name", "gender")}),
        ("Permissions", {
            "fields": (
                "is_active",
                "is_staff",
                "is_superuser",
                "groups",
                "user_permissions",
            )
        }),
        ("Important Dates", {"fields": ("last_login", "date_created")}),
    )

    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": (
                "phone_number",
                "email",
                "full_name",
                "gender",
                "password1",
                "password2",
                "is_staff",
                "is_active",
            ),
        }),
    )


admin.site.register(User, CustomUserAdmin)