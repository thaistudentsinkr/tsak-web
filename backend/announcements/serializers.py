from rest_framework import serializers
from .models import Announcement, RelatedLink, Semester


class RelatedLinkSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    
    class Meta:
        model = RelatedLink
        fields = ['id', 'name', 'url', 'order']
    
    def get_name(self, obj):
        locale = self.context.get('locale', 'th')
        if locale == 'en' and obj.name_en:
            return obj.name_en
        return obj.name_th

class SemesterSerializer(serializers.ModelSerializer):
    display_name = serializers.SerializerMethodField()

    class Meta:
        model = Semester
        fields = ['code', 'display_name']

    def get_display_name(self, obj):
        locale = self.context.get('locale', 'th')
        if locale == 'en':
            return obj.name_en
        return obj.name_th

class AnnouncementListSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    semester = serializers.SerializerMethodField()

    def get_semester(self, obj):
        locale = self.context.get('locale', 'th')
        semester = obj.semester
        return {
            "code": semester.code,
            "name": semester.name_en if locale == 'en' else semester.name_th
        }

    class Meta:
        model = Announcement
        fields = [
            'id',
            'date',
            'semester',
            'department',
            'title',
            'views'
        ]

    def get_title(self, obj):
        locale = self.context.get('locale', 'th')
        return obj.title_en if locale == 'en' and obj.title_en else obj.title_th

    def get_semester(self, obj):
        locale = self.context.get('locale', 'th')
        semester = obj.semester
        return {
            "code": semester.code,
            "display_name": semester.name_en if locale == 'en' else semester.name_th
        }

class AnnouncementDetailSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    content = serializers.SerializerMethodField()
    semester = SemesterSerializer(read_only=True)
    related_links = RelatedLinkSerializer(many=True, read_only=True)

    class Meta:
        model = Announcement
        fields = [
            'id',
            'date',
            'semester',
            'department',
            'title',
            'content',
            'views',
            'related_links',
            'created_at',
            'updated_at'
        ]

    def get_title(self, obj):
        locale = self.context.get('locale', 'th')
        return obj.title_en if locale == 'en' and obj.title_en else obj.title_th

    def get_content(self, obj):
        locale = self.context.get('locale', 'th')
        return obj.content_en if locale == 'en' and obj.content_en else obj.content_th
