from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny, IsAdminUser
from .models import Slide, SlideGroup
from .serializers import SlideGroupSerializer, SlideSerializer
from common.responses import success_response, error_response


class SlideGroupViewSet(ModelViewSet):
    queryset = SlideGroup.objects.all()
    serializer_class = SlideGroupSerializer

    def get_permissions(self):
        # Anyone can view groups
        if self.action in ["list", "retrieve"]:
            return [AllowAny()]

        # Only admin can create/update/delete
        return [IsAdminUser()]

    def list(self, request, *args, **kwargs):
        try:
            groups = self.get_queryset()
            if not groups.exists():
                return error_response(message="No slide groups found")

            serializer = self.get_serializer(groups, many=True)
            return success_response(
                data=serializer.data,
                message="Slide groups fetched successfully"
            )
        except Exception as e:
            return error_response(
                message="Something went wrong",
                errors=str(e),
            )


class SlideViewSet(ModelViewSet):
    queryset = Slide.objects.all()
    serializer_class = SlideSerializer

    def get_permissions(self):
        if self.action == "list" or self.action == "retrieve":
            return [AllowAny()]
        return [IsAdminUser()]

    def get_queryset(self):
        queryset = Slide.objects.all()
        group_slug = self.request.query_params.get("group")
        if group_slug:
            queryset = queryset.filter(group__slug=group_slug)
        return queryset

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            if not queryset.exists():
                return error_response(message="No slides found")

            serializer = self.get_serializer(
                queryset,
                many=True,
                context={"request": request}
            )

            return success_response(
                data=serializer.data,
                message="Slides fetched successfully"
            )

        except Exception as e:
            return error_response(
                message="Something went wrong",
                errors=str(e)
            )
