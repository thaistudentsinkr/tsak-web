from rest_framework import generics
from .models import Experience
from .serializers import ExperienceSerializer


class ExperienceListView(generics.ListAPIView):
    queryset = Experience.objects.all().order_by("-date_posted")
    serializer_class = ExperienceSerializer


class ExperienceDetailView(generics.RetrieveAPIView):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer
    lookup_field = "id"
