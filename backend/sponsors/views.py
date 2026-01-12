from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Q
from .models import Sponsor
from .serializers import SponsorSerializer


@api_view(["GET"])
def sponsors_list(request):
    """
    Returns sponsors grouped by type: embassies, partners, and networks
    """
    # More efficient: query once per type instead of fetching all and filtering
    embassies = Sponsor.objects.filter(type="embassy")
    partners = Sponsor.objects.filter(type="partner")
    networks = Sponsor.objects.filter(type="network")

    grouped = {
        "embassies": SponsorSerializer(embassies, many=True, context={'request': request}).data,
        "partners": SponsorSerializer(partners, many=True, context={'request': request}).data,
        "networks": SponsorSerializer(networks, many=True, context={'request': request}).data,
    }

    return Response(grouped)