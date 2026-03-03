from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import AccessToken
from django.conf import settings

from .serializers import RegisterSerializer, LoginSerializer, UserMeSerializer, ForgotPasswordSerializer, ResetPasswordSerializer
from common.responses import success_response, error_response


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
                httponly=True,
                secure=False,  # True in production
                samesite="Lax",
                max_age=7 * 24 * 60 * 60
            )

            return response

        errors = serializer.errors
        first_error = next(iter(errors.values()))[0]

        return error_response(message=first_error)


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
            serializer.save()
            return success_response(message="User updated successfully")
        

        # Extract first error message as string
        errors = serializer.errors
        first_error = next(iter(errors.values()))[0]

        return error_response(message=first_error)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]  # Added

    def post(self, request):
        response = success_response(message="Logged out successfully")
        response.delete_cookie(settings.SIMPLE_JWT["AUTH_COOKIE"])
        return response
    

class ForgotPasswordView(APIView):
    def post(self, request):
        serializer = ForgotPasswordSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return success_response(message="Reset link sent to email.")

        errors = serializer.errors
        first_error = next(iter(errors.values()))[0]

        return error_response(message=first_error)
    

class ResetPasswordView(APIView):
    def post(self, request):
        serializer = ResetPasswordSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return success_response(message="Password reset successful.")
        
        errors = serializer.errors
        first_error = next(iter(errors.values()))[0]

        return error_response(message=first_error)