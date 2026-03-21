from rest_framework import serializers
from .models import Slide, SlideGroup


class SlideGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = SlideGroup
        fields = "__all__"


class SlideSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = Slide
        fields = "__all__"
        read_only_fields = ["order"]

    def get_image(self, obj):
        request = self.context.get("request")
        if obj.image:
            return request.build_absolute_uri(obj.image.url)
        return None

    def validate_duration(self, value):

        if value < 1000:
            raise serializers.ValidationError(
                "Duration must be at least 1000ms"
            )
        return value
