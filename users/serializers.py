from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate
from phonenumber_field.serializerfields import PhoneNumberField
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string

class RegisterSerializer(serializers.ModelSerializer):
    phone_number = PhoneNumberField()
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            "phone_number",
            "email",
            "full_name",
            "gender",
            "password",
            "confirm_password",
        ]
        extra_kwargs = {
            "password": {"write_only": True}
        }

    def validate_phone_number(self, value):
        if not value.is_valid():
            raise serializers.ValidationError("Invalid phone number")

        if User.objects.filter(phone_number=value).exclude(pk=self.instance.pk if self.instance else None).exists():
            raise serializers.ValidationError("Phone number already registered")

        return value

    def validate(self, attrs):
        if attrs["password"] != attrs["confirm_password"]:
            raise serializers.ValidationError("Passwords do not match")
        return attrs

    def create(self, validated_data):
        validated_data.pop("confirm_password")
        user = User.objects.create_user(**validated_data)
        return user


class LoginSerializer(serializers.Serializer):
    phone_number = PhoneNumberField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        request = self.context.get("request")

        user = authenticate(
            request=request,
            phone_number=attrs["phone_number"],
            password=attrs["password"]
        )

        if not user:
            raise serializers.ValidationError(
                "Invalid phone number or password"
            )

        if not user.is_active:
            raise serializers.ValidationError(
                "Account is disabled"
            )

        attrs["user"] = user
        return attrs
    

class UserMeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "phone_number",
            "email",
            "full_name",
            "gender",
            "date_created",
        ]
        read_only_fields = ["id", "email", "phone_number"]


class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError("No user found with this email.")
        return value

    def save(self):
        user = User.objects.get(email=self.validated_data["email"])

        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)

        reset_link = f"http://localhost:5173/reset-password/{uid}/{token}"

        subject = "Reset Your Pasword"
        from_email = "noreply@yourapp.com"
        to_email = [user.email]

        html_content = render_to_string(
        "emails/reset_password.html",
        {
            "user": user,
            "reset_link": reset_link,
        },
        )

        email = EmailMultiAlternatives(subject, "", from_email, to_email)
        email.attach_alternative(html_content, "text/html")
        email.send()


class ResetPasswordSerializer(serializers.Serializer):
    uid = serializers.CharField()
    token = serializers.CharField()
    new_password = serializers.CharField(write_only=True)

    def validate(self, data):
        try:
            uid = urlsafe_base64_decode(data["uid"]).decode()
            user = User.objects.get(pk=uid)
        except:
            raise serializers.ValidationError("Invalid link.")

        if not default_token_generator.check_token(user, data["token"]):
            raise serializers.ValidationError("Invalid or expired token.")

        data["user"] = user
        return data

    def save(self):
        user = self.validated_data["user"]
        user.set_password(self.validated_data["new_password"])
        user.save()


class AdminUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            "id",
            "phone_number",
            "email",
            "full_name",
            "gender",
            "is_active",
            "is_staff",
            "is_superuser",
        ]