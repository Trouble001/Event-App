from rest_framework import serializers
from .models import Slide


class SlideSerializer(serializers.ModelSerializer):

    class Meta:
        model = Slide
        fields = [
            "id",
            "title",
            "subtitle",
            "text",
            "image",
            "duration",
            "order",
        ]

    def validate_duration(self, value):

        if value < 1000:
            raise serializers.ValidationError(
                "Duration must be at least 1000ms"
            )

        return value