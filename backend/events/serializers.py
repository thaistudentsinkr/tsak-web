from rest_framework import serializers
from .models import Event, EventImage
# from sponsors.models import Sponsor


# class SponsorSerializer(serializers.ModelSerializer):
#     """Serializer for sponsor in event context"""
#     logoUrl = serializers.SerializerMethodField()
#     
#     class Meta:
#         model = Sponsor
#         fields = ['name', 'logoUrl']
#     
#     def get_logoUrl(self, obj):
#         """Return the full URL to the logo"""
#         if obj.logo:
#             request = self.context.get('request')
#             if request:
#                 return request.build_absolute_uri(obj.logo.url)
#             return obj.logo.url
#         return None


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
    # sponsors = SponsorSerializer(many=True, read_only=True)
    sponsors = serializers.SerializerMethodField()  # Return empty array for now
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
    
    def get_sponsors(self, obj):
        """Return empty array for sponsors (commented out for now)"""
        return []
    
    def get_imageDir(self, obj):
        """Return array of image URLs from EventImage objects"""
        images = obj.images.all()
        request = self.context.get('request')
        image_urls = []
        for img in images:
            if img.image:
                if request:
                    image_urls.append(request.build_absolute_uri(img.image.url))
                else:
                    image_urls.append(img.image.url)
        return image_urls if image_urls else None

