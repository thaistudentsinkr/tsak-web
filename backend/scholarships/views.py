from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Scholarship
from .serializers import ScholarshipSerializer


@api_view(["GET"])
def scholarships_list(request):
    """
    Returns all active scholarships
    Frontend handles filtering and language selection
    """
    try:
        # Get only active scholarships
        scholarships = Scholarship.objects.filter(is_active=True)
        
        # Serialize the data
        serializer = ScholarshipSerializer(scholarships, many=True)
        
        return Response({
            "scholarships": serializer.data,
            "count": scholarships.count()
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response(
            {"error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(["GET"])
def scholarship_detail(request, pk):
    """
    Returns a single scholarship by ID
    """
    try:
        scholarship = Scholarship.objects.get(pk=pk, is_active=True)
        serializer = ScholarshipSerializer(scholarship)
        return Response(serializer.data, status=status.HTTP_200_OK)
        
    except Scholarship.DoesNotExist:
        return Response(
            {"error": "Scholarship not found"},
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return Response(
            {"error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(["GET"])
def scholarships_by_type(request, scholarship_type):
    """
    Returns scholarships filtered by type
    """
    try:
        valid_types = ["government", "university", "private", "organization"]
        
        if scholarship_type not in valid_types:
            return Response(
                {"error": f"Invalid type. Must be one of: {', '.join(valid_types)}"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        scholarships = Scholarship.objects.filter(
            type=scholarship_type,
            is_active=True
        )
        
        serializer = ScholarshipSerializer(scholarships, many=True)
        
        return Response({
            "type": scholarship_type,
            "scholarships": serializer.data,
            "count": scholarships.count()
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response(
            {"error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )