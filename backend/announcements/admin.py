from django.contrib import admin
from .models import Announcement, RelatedLink, Semester


class RelatedLinkInline(admin.TabularInline):
    model = RelatedLink
    extra = 1
    fields = ['name_th', 'name_en', 'url', 'order']


@admin.register(Announcement)
class AnnouncementAdmin(admin.ModelAdmin):
    list_display = [
        'title_th', 
        'department', 
        'semester', 
        'date', 
        'views', 
        'is_published',
        'created_at'
    ]
    list_filter = [
        'is_published',
        'department', 
        'semester', 
        'date'
    ]
    search_fields = [
        'title_th', 
        'title_en', 
        'content_th', 
        'content_en'
    ]
    readonly_fields = ['views', 'created_at', 'updated_at']
    date_hierarchy = 'date'
    
    fieldsets = (
        ('Thai Content', {
            'fields': ('title_th', 'content_th')
        }),
        ('English Content', {
            'fields': ('title_en', 'content_en'),
            'classes': ('collapse',)
        }),
        ('Metadata', {
            'fields': ('date', 'semester', 'department', 'is_published')
        }),
        ('Statistics', {
            'fields': ('views', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    inlines = [RelatedLinkInline]
    
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.prefetch_related('related_links')


@admin.register(RelatedLink)
class RelatedLinkAdmin(admin.ModelAdmin):
    list_display = ['name_th', 'announcement', 'url', 'order']
    list_filter = ['announcement__department']
    search_fields = ['name_th', 'name_en', 'url', 'announcement__title_th']
    list_editable = ['order']

@admin.register(Semester)
class SemesterAdmin(admin.ModelAdmin):
    list_display = ['code', 'name_th', 'name_en', 'is_active']
    list_filter = ['is_active']
    search_fields = ['code', 'name_th', 'name_en']