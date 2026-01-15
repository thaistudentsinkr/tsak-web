from django.contrib import admin
from .models import Event, EventImage


class EventImageInline(admin.TabularInline):
    """Inline admin for event images"""
    model = EventImage
    extra = 1
    fields = ['image', 'order']


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ['title', 'status', 'date', 'location', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['title', 'title_en', 'subtitle', 'subtitle_en', 'description', 'description_en', 'location']
    list_editable = ['status']
    ordering = ['-created_at']
    inlines = [EventImageInline]
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'title_en', 'subtitle', 'subtitle_en', 'image')
        }),
        ('Date & Status', {
            'fields': ('date', 'date_range', 'status', 'status_text')
        }),
        ('Details', {
            'fields': ('description', 'description_en', 'location', 'registration_url', 'organizer')
        }),
    )


@admin.register(EventImage)
class EventImageAdmin(admin.ModelAdmin):
    list_display = ['event', 'order', 'created_at']
    list_filter = ['event', 'created_at']
    ordering = ['event', 'order', 'created_at']
