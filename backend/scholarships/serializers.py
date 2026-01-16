from rest_framework import serializers
from .models import Scholarship

SCHOLARSHIP_TYPES = [
    ("government", "Government"),
    ("university", "University"),
    ("private", "Private"),
    ("organization", "Organization"),
]

FUNDING_TYPES = [
    ("full-tuition", "Full Tuition"),
    ("partial-tuition", "Partial Tuition"),
    ("merit-based", "Merit Based"),
    ("need-based", "Need Based"),
]

STUDY_LEVELS = [
    ("undergraduate", "Undergraduate"),
    ("graduate", "Graduate"),
    ("masters", "Master's"),
    ("phd", "PhD"),
    ("all-levels", "All Levels"),
]

FIELD_OF_STUDY = [
    ("all-fields", "All Fields"),
    ("science", "Science"),
    ("arts", "Arts"),
    ("business", "Business"),
    ("medicine", "Medicine"),
]

def validate_choice_list(value, valid_choices):
    if not isinstance(value, list):
        raise serializers.ValidationError("Must be a list")

    valid = {v[0] for v in valid_choices}
    invalid = set(value) - valid

    if invalid:
        raise serializers.ValidationError(
            f"Invalid choice(s): {', '.join(invalid)}"
        )

    return value


class ScholarshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scholarship
        fields = [
            "id",
            "name",
            "name_en",
            "provider",
            "provider_en",
            "description",
            "description_en",
            "benefits",
            "benefits_en",
            "deadline",
            "deadline_en",
            "eligibility",
            "eligibility_en",
            "monthly_allowance",
            "monthly_allowance_en",
            "link",
            "type",
            "funding_type",
            "study_level",
            "field_of_study",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["created_at", "updated_at"]

    def validate_funding_type(self, value):
        return validate_choice_list(value, FUNDING_TYPES)

    def validate_study_level(self, value):
        return validate_choice_list(value, STUDY_LEVELS)

    def validate_field_of_study(self, value):
        return validate_choice_list(value, FIELD_OF_STUDY)
    