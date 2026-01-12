from django.contrib import admin
from .models import Sponsor


@admin.register(Sponsor)
class SponsorAdmin(admin.ModelAdmin):
    list_display = ("name", "type", "order", "created_at", "updated_at")
    list_filter = ("type", "created_at")
    search_fields = ("name", "description")
    list_editable = ("order",)
    readonly_fields = ("created_at", "updated_at")
    
    fieldsets = (
        ("Basic Information", {
            "fields": ("name", "type", "logo", "description")
        }),
        ("Display Settings", {
            "fields": ("order",)
        }),
        ("Timestamps", {
            "fields": ("created_at", "updated_at"),
            "classes": ("collapse",)
        }),
    )