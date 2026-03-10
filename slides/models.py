from django.db import models


class SlideGroup(models.Model):

    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class Slide(models.Model):

    group = models.ForeignKey(
        SlideGroup,
        on_delete=models.CASCADE,
        related_name="slides"
    )

    title = models.CharField(max_length=200)

    subtitle = models.CharField(
        max_length=200,
        blank=True
    )

    text = models.TextField(blank=True)

    image = models.ImageField(
        upload_to="slides/"
    )

    duration = models.PositiveIntegerField(
        default=6000
    )

    order = models.PositiveIntegerField(
        default=0
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.title