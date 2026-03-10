from django.contrib import admin
from .models import SlideGroup, Slide


class SlideInline(admin.TabularInline):

    model = Slide
    extra = 1

@admin.register(SlideGroup)
class SlideGroupAdmin(admin.ModelAdmin):

    list_display = ["name", "slug", "created_at"]
    prepopulated_fields = {"slug": ("name",)}
    inlines = [SlideInline]

@admin.register(Slide)
class SlideAdmin(admin.ModelAdmin):
    list_display = ["title", "group", "order"]
    list_filter = ["group"]