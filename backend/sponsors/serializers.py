from rest_framework import serializers
from .models import Sponsor


class SponsorSerializer(serializers.ModelSerializer):
    logo = serializers.SerializerMethodField()
    
    class Meta:
        model = Sponsor
        fields = [
            'id', 
            'name',           # Thai name
            'name_en',        # English name
            'description',    # Thai description
            'description_en', # English description
            'logo', 
            'type', 
            'created_at', 
            'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']
    
    def get_logo(self, obj):
        """
        Return the full URL to the logo or None.
        
        This allows the frontend to directly use the URL from Django's media server.
        Example: "http://localhost:8000/media/sponsors/logos/user.jpg"
        """
        if obj.logo:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.logo.url)
            # Fallback if no request context
            return obj.logo.url
        return None