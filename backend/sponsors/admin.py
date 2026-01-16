from django.contrib import admin
from .models import Sponsor


@admin.register(Sponsor)
class SponsorAdmin(admin.ModelAdmin):
    list_display = ("name", "name_en", "type", "order", "created_at", "updated_at")
    list_filter = ("type", "created_at")
    search_fields = ("name", "name_en", "description", "description_en")
    list_editable = ("order",)
    readonly_fields = ("created_at", "updated_at")
    
    fieldsets = (
        ("Basic Information (Thai)", {
            "fields": ("name", "description")
        }),
        ("Basic Information (English)", {
            "fields": ("name_en", "description_en")
        }),
        ("Media & Type", {
            "fields": ("type", "logo")
        }),
        ("Display Settings", {
            "fields": ("order",)
        }),
        ("Timestamps", {
            "fields": ("created_at", "updated_at"),
            "classes": ("collapse",)
        }),
    )