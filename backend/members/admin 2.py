from django.contrib import admin
from .models import Member

@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):
    list_display = ['firstname', 'lastname', 'position', 'department', 'working', 'university']
    list_filter = ['department', 'position', 'working']
    search_fields = ['firstname', 'lastname', 'university', 'major']
    list_editable = ['working']
    ordering = ['position', 'department', 'lastname']
    
    fieldsets = (
        ('Personal Information', {
            'fields': ('firstname', 'lastname', 'picture')
        }),
        ('Academic Information', {
            'fields': ('university', 'major')
        }),
        ('Organization', {
            'fields': ('position', 'department', 'working')
        }),
    )