from django.urls import path
from .views import RegisterView, LoginView, LogoutView, MeView, ForgotPasswordView, ResetPasswordView, AdminUsersView

urlpatterns = [
    path("register/", RegisterView.as_view()),
    path("login/", LoginView.as_view()),
    path("logout/", LogoutView.as_view()),
    path("me/", MeView.as_view()),
    path("forgot-password/", ForgotPasswordView.as_view()),
    path("reset-password/", ResetPasswordView.as_view()),
    path("users/", AdminUsersView.as_view()),
    path("users/<int:pk>/", AdminUsersView.as_view()),
]