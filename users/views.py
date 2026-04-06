from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import AccessToken
from django.conf import settings
from django.contrib.auth import get_user_model
from django.db.models import Q
from math import ceil
from django.contrib.auth.hashers import check_password
from django.contrib.auth.password_validation import validate_password
from .serializers import RegisterSerializer, LoginSerializer, UserMeSerializer, ForgotPasswordSerializer, ResetPasswordSerializer, AdminUserSerializer, AdminCreateUserSerializer
from common.responses import success_response, error_response

User = get_user_model()

# User Register
class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return success_response(message="User registered successfully")

        # Extract first error message as string
        errors = serializer.errors
        first_error = next(iter(errors.values()))[0]

        return error_response(message=first_error)


# User Login
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(
            data=request.data,
            context={"request": request}  # IMPORTANT
        )

        if serializer.is_valid():
            user = serializer.validated_data["user"]
            token = AccessToken.for_user(user)

            response = success_response(message="Login successful")

            response.set_cookie(
                key=settings.SIMPLE_JWT["AUTH_COOKIE"],
                value=str(token),
                httponly=settings.SIMPLE_JWT["AUTH_COOKIE_HTTP_ONLY"],
                secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
                samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
                max_age=7 * 24 * 60 * 60
            )

            return response

        errors = serializer.errors
        first_error = next(iter(errors.values()))[0]

        return error_response(message=first_error)


# User Profile
class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserMeSerializer(request.user)
        return success_response(
            data=serializer.data,
            message="User fetched successfully"
        )
    
    def patch(self, request):
        serializer = UserMeSerializer(
            request.user,
            data=request.data,
            partial=True
        )
        if serializer.is_valid():
            user = serializer.save()
            return success_response(
                data=UserMeSerializer(user).data,
                message="User updated successfully"
            )
        

        # Extract first error message as string
        errors = serializer.errors
        first_error = next(iter(errors.values()))[0]

        return error_response(message=first_error)

# User Logout
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]  # Added

    def post(self, request):
        response = success_response(message="Logged out successfully")
        response.delete_cookie(settings.SIMPLE_JWT["AUTH_COOKIE"])
        return response
    
# User Password Forgot
class ForgotPasswordView(APIView):
    def post(self, request):
        serializer = ForgotPasswordSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return success_response(message="Reset link sent to email.")

        errors = serializer.errors
        first_error = next(iter(errors.values()))[0]

        return error_response(message=first_error)
    
# User Password Reset
class ResetPasswordView(APIView):
    def post(self, request):
        serializer = ResetPasswordSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return success_response(message="Password reset successful.")
        
        errors = serializer.errors
        first_error = next(iter(errors.values()))[0]

        return error_response(message=first_error)
    

# User Password Change
class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user

        old_password = request.data.get("old_password")
        new_password = request.data.get("new_password")

        # Validate fields
        if not old_password or not new_password:
            return error_response(
                message="Both old and new password are required"
            )

        # Check old password
        if not check_password(old_password, user.password):
            return error_response(
                message="Old password is incorrect"
            )

        # Validate new password strength
        try:
            validate_password(new_password, user)
        except Exception as e:
            return error_response(
                message=list(e)
            )

        # Prevent same password reuse
        if check_password(new_password, user.password):
            return error_response(
                message="New password cannot be same as old password"
            )

        # ✅ Set new password
        user.set_password(new_password)
        user.save()

        return success_response(
            message="Password changed successfully"
        )


# Users for Admin
class AdminUsersView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk=None):
        if not request.user.is_staff:
            return error_response(message="Admin access required")
        if pk:
            try:
                user = User.objects.get(pk=pk)
            except User.DoesNotExist:
                return error_response(message="User not found")

            serializer = AdminUserSerializer(user)

            return success_response(
                data=serializer.data,
                message="User fetched successfully"
            )


        # Query Params and Search logic
        search = request.query_params.get("search", "")
        page = int(request.query_params.get("page", 1))
        page_size = int(request.query_params.get("page_size", 5))

        users = User.objects.all().order_by("-id")

        if search:
            users = users.filter(
                Q(full_name__icontains=search) |
                Q(email__icontains=search) |
                Q(phone_number__icontains=search)
            )

        total = users.count()
        total_pages = ceil(total / page_size)
        
        start = (page - 1) * page_size
        end = start + page_size

        users = users[start:end]

        serializer = AdminUserSerializer(users, many=True)

        return success_response(
            data={
                "users": serializer.data,
                "total": total,
                "page": page,
                "page_size": page_size,
                "total_pages": total_pages,
            },
            message="Users fetched successfully"
        )
    

    def post(self, request):
        if not request.user.is_staff:
            return error_response(message="Admin access required")
        serializer = AdminCreateUserSerializer(
            data=request.data,
            context={"request": request}
        )
        if serializer.is_valid():
            user = serializer.save()
            return success_response(
                data=AdminUserSerializer(user).data,
                message="User created successfully"
            )

        errors = serializer.errors
        first_error = next(iter(errors.values()))[0]

        return error_response(message=first_error)
    
    def patch(self, request, pk):
        if not request.user.is_staff:
            return error_response(message="Admin access required")
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return error_response(message="User not found")

        serializer = AdminUserSerializer(
            user,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save()
            return success_response(
                data=serializer.data,
                message="User updated successfully"
            )

        errors = serializer.errors
        first_error = next(iter(errors.values()))[0]

        return error_response(message=first_error)


    def delete(self, request, pk):

        if not request.user.is_staff:
            return error_response(message="Admin access required")

        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return error_response(message="User not found")

        if user == request.user:
            return error_response(message="You cannot delete yourself")

        user.delete()

        return success_response(message="User deleted successfully")
