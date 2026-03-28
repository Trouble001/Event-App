from django.contrib.auth.base_user import BaseUserManager


class UserManager(BaseUserManager):

    def create_user(self, phone_number, email, full_name, password=None, **extra_fields):
        if not phone_number:
            raise ValueError("Phone number required")

        if not email:
            raise ValueError("Email is required")

        email = self.normalize_email(email)

        user = self.model(
            phone_number=phone_number,
            email=email,
            full_name=full_name,
            **extra_fields
        )
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, phone_number, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        full_name = extra_fields.pop("full_name", "Admin User")

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")

        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(
            phone_number=phone_number,
            email=email,
            full_name=full_name,
            password=password,
            **extra_fields,
        )
