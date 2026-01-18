from django.contrib import admin
from .models import Event, EventImage


class EventImageInline(admin.TabularInline):
    """Inline admin for event images"""
    model = EventImage
    extra = 1
    fields = ['image', 'order']


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ['title', 'status', 'date', 'ordering_type', 'order', 'location', 'created_at']
    list_filter = ['status', 'ordering_type', 'created_at']
    search_fields = ['title', 'title_en', 'subtitle', 'subtitle_en', 'description', 'description_en', 'location']
    list_editable = ['status', 'ordering_type', 'order']
    ordering = ['order', '-created_at']
    filter_horizontal = ['sponsors']
    inlines = [EventImageInline]
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'title_en', 'subtitle', 'subtitle_en', 'image')
        }),
        ('Date & Status', {
            'fields': ('date', 'date_range', 'status', 'status_text')
        }),
        ('Ordering', {
            'fields': ('ordering_type', 'order'),
            'description': "Choose 'Manual Order' to set custom order using the order field, or 'Sort by Date' to automatically sort by event date."
        }),
        ('Details', {
            'fields': ('description', 'description_en', 'location', 'registration_url', 'organizer', 'organizer_logo')
        }),
        ('Relationships', {
            'fields': ('sponsors',),
            'description': 'Select sponsors for this event. If no sponsors are available, add them in the Sponsors section first.'
        }),
    )


@admin.register(EventImage)
class EventImageAdmin(admin.ModelAdmin):
    list_display = ['event', 'order', 'created_at']
    list_filter = ['event', 'created_at']
    ordering = ['event', 'order', 'created_at']
