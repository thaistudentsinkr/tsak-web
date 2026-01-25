from rest_framework import serializers
from .models import Experience


class ExperienceSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    university = serializers.SerializerMethodField()
    major = serializers.SerializerMethodField()
    shortBio = serializers.SerializerMethodField()
    whyKorea = serializers.SerializerMethodField()
    whyMajor = serializers.SerializerMethodField()
    lifeInKorea = serializers.SerializerMethodField()
    recommendations = serializers.SerializerMethodField()

    curriculumLanguage = serializers.CharField(source="curriculum_language")
    fieldOfStudy = serializers.CharField(source="field_of_study")
    datePosted = serializers.DateField(source="date_posted")

    contact = serializers.SerializerMethodField()

    class Meta:
        model = Experience
        fields = [
            "id",
            "name",
            "photo",
            "university",
            "major",
            "degree",
            "curriculumLanguage",
            "fieldOfStudy",
            "shortBio",
            "whyKorea",
            "whyMajor",
            "major_pros",
            "major_cons",
            "uni_pros",
            "uni_cons",
            "recommended_courses",
            "achievements",
            "preparation",
            "lifeInKorea",
            "recommendations",
            "contact",
            "datePosted",
        ]

    def _lang(self):
        request = self.context.get("request")
        return request.query_params.get("lang", "en") if request else "en"

    def _pick(self, obj, en, th):
        return getattr(obj, en) if self._lang() == "en" else getattr(obj, th)

    def get_name(self, obj):
        return self._pick(obj, "name_en", "name_th")

    def get_university(self, obj):
        return self._pick(obj, "university_en", "university_th")

    def get_major(self, obj):
        return self._pick(obj, "major_en", "major_th")

    def get_shortBio(self, obj):
        return self._pick(obj, "short_bio_en", "short_bio_th")

    def get_whyKorea(self, obj):
        return self._pick(obj, "why_korea_en", "why_korea_th")

    def get_whyMajor(self, obj):
        return self._pick(obj, "why_major_en", "why_major_th")

    def get_lifeInKorea(self, obj):
        return self._pick(obj, "life_in_korea_en", "life_in_korea_th")

    def get_recommendations(self, obj):
        return self._pick(obj, "recommendations_en", "recommendations_th")

    def get_contact(self, obj):
        return {
            "email": obj.email,
            "instagram": obj.instagram,
            "linkedin": obj.linkedin,
        }
