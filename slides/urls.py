from rest_framework.routers import DefaultRouter
from .views import SlideViewSet, SlideGroupViewSet

router = DefaultRouter()

router.register("slides", SlideViewSet, basename="slides")
router.register("slide-groups", SlideGroupViewSet, basename="slide-groups")

urlpatterns = router.urls
