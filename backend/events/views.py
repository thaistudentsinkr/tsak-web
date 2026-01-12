from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Event
from .serializers import EventSerializer


@api_view(['GET'])
def event_list(request):
    """
    Get all events.
    Usage: GET /api/events/
    
    Returns JSON array of all events.
    """
    events = Event.objects.all()
    serializer = EventSerializer(events, many=True, context={'request': request})
    return Response(serializer.data)


@api_view(['GET'])
def event_detail(request, event_id):
    """
    Get a single event by ID.
    Usage: GET /api/events/{id}/
    
    Returns JSON object of the event.
    """
    try:
        event = Event.objects.get(pk=event_id)
    except Event.DoesNotExist:
        return Response(
            {'detail': 'Event not found'},
            status=status.HTTP_404_NOT_FOUND
        )
    
    serializer = EventSerializer(event, context={'request': request})
    return Response(serializer.data)
