from django.urls import path
from .views import ExperienceListView, ExperienceDetailView

urlpatterns = [
    path("", ExperienceListView.as_view(), name="experience-list"),
    path("<uuid:id>/", ExperienceDetailView.as_view(), name="experience-detail"),
]
