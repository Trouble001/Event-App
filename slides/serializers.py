from rest_framework import serializers
from .models import Slide, SlideGroup


class SlideGroupSerializer(serializers.ModelSerializer):
    image = serializers.ImageField()
    image_url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = SlideGroup
        fields = "__all__"

    def validate_slug(self, value):
        if self.instance and self.instance.slug == value:
            return value
        if SlideGroup.objects.filter(slug=value).exists():
            raise serializers.ValidationError("Slug already exists")
        return value

    def get_image_url(self, obj):
        request = self.context.get("request")
        if obj.image:
            return request.build_absolute_uri(obj.image.url)
        return None


class SlideSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slide
        fields = "__all__"
        read_only_fields = ["order"]

    def validate_duration(self, value):

        if value < 1000:
            raise serializers.ValidationError(
                "Duration must be at least 1000ms"
            )
        return value
