from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime
from .models import Event
from .serializers import EventSerializer


def parse_date_from_string(date_str):
    """Parse date string in DD.MM.YYYY format and return datetime object for sorting"""
    try:
        # Handle date range format: "20.07.2025 - 23.07.2025"
        if ' - ' in date_str:
            date_part = date_str.split(' - ')[0].strip()
        else:
            date_part = date_str.strip()
        return datetime.strptime(date_part, '%d.%m.%Y')
    except (ValueError, AttributeError):
        # Return a far future date if parsing fails (will sort last)
        return datetime(9999, 12, 31)


@api_view(['GET'])
def event_list(request):
    """
    Get all events.
    Usage: GET /api/events/
    
    Returns JSON array of all events, sorted by:
    - Manual order (if ordering_type='manual')
    - Date (if ordering_type='date')
    """
    events = Event.objects.all()
    
    # Separate events by ordering type
    manual_events = events.filter(ordering_type='manual').order_by('order', '-created_at')
    date_events = events.filter(ordering_type='date')
    
    # For date-based events, we need to sort by parsed date
    # Convert to list and sort by parsed date
    date_events_list = list(date_events)
    date_events_list.sort(key=lambda e: parse_date_from_string(e.date), reverse=True)
    
    # Combine: manual events first (in their order), then date-sorted events
    all_events = list(manual_events) + date_events_list
    
    serializer = EventSerializer(all_events, many=True, context={'request': request})
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
