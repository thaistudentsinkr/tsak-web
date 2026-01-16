from django.urls import path
from . import views

urlpatterns = [
    # Get all scholarships
    path('', views.scholarships_list, name='scholarships-list'),
    
    # Get scholarship by ID
    path('<int:pk>/', views.scholarship_detail, name='scholarship-detail'),
    
    # Get scholarships by type (government, university, private, organization)
    path('type/<str:scholarship_type>/', views.scholarships_by_type, name='scholarships-by-type'),
]