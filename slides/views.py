from rest_framework.views import APIView
from .models import Slide
from .serializers import SlideSerializer
from common.responses import success_response, error_response


class SlideByGroupView(APIView):

    def get(self, request, slug):
        try:
            slides = Slide.objects.filter(
                group__slug=slug
            )

            if not slides.exists():
                return error_response(
                    message="No slides found",
                    status_code=404
                )

            serializer = SlideSerializer(slides, many=True)
            return success_response(
                data=serializer.data,
                message="Slides fetched successfully"
            )

        except Exception as e:
            return error_response(
                message="Something went wrong",
                errors=str(e),
                status_code=500
            )