from rest_framework import serializers
from .models import Event, EventImage


class EventImageSerializer(serializers.ModelSerializer):
    """Serializer for event gallery images"""
    imageUrl = serializers.SerializerMethodField()
    
    class Meta:
        model = EventImage
        fields = ['imageUrl']
    
    def get_imageUrl(self, obj):
        """Return the full URL to the image"""
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None


class EventSerializer(serializers.ModelSerializer):
    """Main event serializer matching frontend EventData interface"""
    id = serializers.SerializerMethodField()  # Convert to string for frontend
    imageUrl = serializers.SerializerMethodField()
    titleEn = serializers.CharField(source='title_en', read_only=True)
    dateRange = serializers.CharField(source='date_range', read_only=True)
    statusText = serializers.CharField(source='status_text', read_only=True)
    imageDir = serializers.SerializerMethodField()
    
    class Meta:
        model = Event
        fields = [
            'id',
            'title',
            'titleEn',
            'subtitle',
            'imageUrl',
            'date',
            'dateRange',
            'status',
            'statusText',
            'description',
            'location',
            'organizer',
            'imageDir',
        ]
    
    def get_id(self, obj):
        """Convert integer pk to string for frontend"""
        return str(obj.pk)
    
    def get_imageUrl(self, obj):
        """Return the full URL to the event image"""
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None
    
    def get_imageDir(self, obj):
        """Return array of image URLs from EventImage objects"""
        images = obj.images.all()
        request = self.context.get('request')
        image_urls = []
        for img in images:
            if img.image:
                url = request.build_absolute_uri(img.image.url) if request else img.image.url
                # Only add non-empty URLs
                if url and url.strip():
                    image_urls.append(url)
        return image_urls if image_urls else None

