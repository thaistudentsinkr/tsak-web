from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
from django.utils.dateparse import parse_date
from .models import Announcement, Semester
from .serializers import AnnouncementListSerializer, AnnouncementDetailSerializer, SemesterSerializer


class AnnouncementViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for announcements with filtering, sorting, and view tracking
    """
    queryset = Announcement.objects.filter(is_published=True)
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return AnnouncementDetailSerializer
        return AnnouncementListSerializer
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        # Get locale from query params or default to 'th'
        context['locale'] = self.request.query_params.get('locale', 'th')
        return context
    
    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Get filter parameters
        date_from = self.request.query_params.get('date_from')
        date_to = self.request.query_params.get('date_to')
        semester = self.request.query_params.get('semester')
        department = self.request.query_params.get('department')
        search = self.request.query_params.get('search')
        sort_by = self.request.query_params.get('sort_by', 'date')
        sort_order = self.request.query_params.get('sort_order', 'desc')
        
        # Apply filters
        if date_from:
            parsed_date = parse_date(date_from)
            if parsed_date:
                queryset = queryset.filter(date__gte=parsed_date)
        
        if date_to:
            parsed_date = parse_date(date_to)
            if parsed_date:
                queryset = queryset.filter(date__lte=parsed_date)
        
        if semester and semester != 'All':
            queryset = queryset.filter(semester__code=semester)
        
        if department and department != 'All':
            queryset = queryset.filter(department=department)
        
        if search:
            queryset = queryset.filter(
                Q(title_th__icontains=search) | 
                Q(title_en__icontains=search) |
                Q(content_th__icontains=search) |
                Q(content_en__icontains=search)
            )
        
        # Apply sorting
        sort_field = 'views' if sort_by == 'views' else 'date'
        if sort_order == 'asc':
            queryset = queryset.order_by(sort_field)
        else:
            queryset = queryset.order_by(f'-{sort_field}')
        
        return queryset
    
    def retrieve(self, request, *args, **kwargs):
        """
        Override retrieve to increment view count
        """
        instance = self.get_object()
        
        # Increment view count
        instance.increment_views()
        
        serializer = self.get_serializer(
            instance,
            context=self.get_serializer_context()
        )
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def filters(self, request):
        locale = request.query_params.get('locale', 'th')

        semesters = Semester.objects.filter(is_active=True)

        semester_data = SemesterSerializer(
            semesters,
            many=True,
            context={'locale': locale}
        ).data

        departments = (
            Announcement.objects
            .filter(is_published=True)
            .values_list('department', flat=True)
            .distinct()
        )

        return Response({
            'semesters': [
                {
                    'code': 'All',
                    'display_name': 'All' if locale == 'en' else 'ทั้งหมด'
                }
            ] + semester_data,
            'departments': ['All'] + list(departments)
        })


    @action(detail=True, methods=['get'])
    def related(self, request, pk=None):
        """
        Get related announcements (same department, excluding current)
        """
        announcement = self.get_object()
        related = Announcement.objects.filter(
            is_published=True,
            department=announcement.department
        ).exclude(id=announcement.id)[:4]
        
        serializer = AnnouncementListSerializer(
            related, 
            many=True, 
            context=self.get_serializer_context()
        )
        return Response(serializer.data)