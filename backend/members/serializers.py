from rest_framework import serializers
from .models import Member

class MemberSerializer(serializers.ModelSerializer):
    picture = serializers.SerializerMethodField()
    
    class Meta:
        model = Member
        fields = [
            'id',
            'firstname',
            'lastname',
            'picture',
            'university',
            'major',
            'position',
            'department',
            'working',
        ]
    
    def get_picture(self, obj):
        """
        Return the full URL to the picture or None.
        
        This allows the frontend to directly use the URL from Django's media server.
        Example: "http://localhost:8000/media/members/tsak.png"
        """
        if obj.picture:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.picture.url)
            # Fallback if no request context
            return obj.picture.url
        return None