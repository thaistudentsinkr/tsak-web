from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AnnouncementViewSet

# Create router
router = DefaultRouter()
router.register(r'', AnnouncementViewSet, basename='announcement')

urlpatterns = [
    path('', include(router.urls)),
]

# This will generate the following endpoints:
# GET    /api/announcements/              - List all announcements (with filters)
# GET    /api/announcements/{id}/         - Get single announcement (increments view)
# GET    /api/announcements/filters/      - Get available filter options
# GET    /api/announcements/{id}/related/ - Get related announcements

# Example API calls:
# 
# List with filters:
# /api/announcements/?locale=th&semester=spring_2025&department=executive&search=ไฟป่า&sort_by=views&sort_order=desc&date_from=2025-01-01&date_to=2025-12-31
#
# Get single (auto-increments view count):
# /api/announcements/1/?locale=en
#
# Get filter options:
# /api/announcements/filters/
#
# Get related announcements:
# /api/announcements/1/related/?locale=th