from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Member
from .serializers import MemberSerializer

@api_view(['GET'])
def member_list(request):
    """
    Get all members.
    Usage: GET /api/members/
    
    Returns JSON array of all members.
    Frontend will handle filtering by department.
    """
    members = Member.objects.all()
    serializer = MemberSerializer(members, many=True, context={'request': request})
    return Response(serializer.data)