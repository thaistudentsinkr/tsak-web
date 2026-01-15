from rest_framework import serializers
from .models import Event, EventImage
from sponsors.models import Sponsor


class SponsorSerializer(serializers.ModelSerializer):
    """Serializer for sponsor in event context"""
    logoUrl = serializers.SerializerMethodField()
    
    class Meta:
        model = Sponsor
        fields = ['name', 'logoUrl']
    
    def get_logoUrl(self, obj):
        """Return the full URL to the logo"""
        if obj.logo:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.logo.url)
            return obj.logo.url
        return None


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
    subtitleEn = serializers.CharField(source='subtitle_en', read_only=True)
    descriptionEn = serializers.CharField(source='description_en', read_only=True)
    dateRange = serializers.CharField(source='date_range', read_only=True)
    statusText = serializers.CharField(source='status_text', read_only=True)
    registrationUrl = serializers.URLField(source='registration_url', read_only=True)
    sponsors = SponsorSerializer(many=True, read_only=True)
    imageDir = serializers.SerializerMethodField()
    
    class Meta:
        model = Event
        fields = [
            'id',
            'title',
            'titleEn',
            'subtitle',
            'subtitleEn',
            'imageUrl',
            'date',
            'dateRange',
            'status',
            'statusText',
            'description',
            'descriptionEn',
            'location',
            'registrationUrl',
            'organizer',
            'sponsors',
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

