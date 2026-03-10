from django.urls import path
from .views import SlideByGroupView


urlpatterns = [
    path(
        "slides/<slug:slug>/",
        SlideByGroupView.as_view(),
        name="slides-by-group"
    ),

]