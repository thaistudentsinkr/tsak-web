from django.contrib import admin
from django import forms
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

class ScholarshipAdminForm(forms.ModelForm):
    funding_type = forms.MultipleChoiceField(
        choices=FUNDING_TYPES,
        widget=forms.CheckboxSelectMultiple,
        required=False,
    )

    study_level = forms.MultipleChoiceField(
        choices=STUDY_LEVELS,
        widget=forms.CheckboxSelectMultiple,
        required=False,
    )

    field_of_study = forms.MultipleChoiceField(
        choices=FIELD_OF_STUDY,
        widget=forms.CheckboxSelectMultiple,
        required=False,
    )

    class Meta:
        model = Scholarship
        fields = "__all__"


@admin.register(Scholarship)
class ScholarshipAdmin(admin.ModelAdmin):
    form = ScholarshipAdminForm

    list_display = (
        "name",
        "name_en",
        "type",
        "provider",
        "order",
        "is_active",
        "created_at",
    )

    list_filter = (
        "type",
        "is_active",
        "created_at",
    )

    search_fields = (
        "name",
        "name_en",
        "provider",
        "provider_en",
        "description",
        "description_en",
    )

    list_editable = ("order", "is_active")
    readonly_fields = ("created_at", "updated_at")

    fieldsets = (
        ("Basic Information (Thai)", {
            "fields": ("name", "provider", "description")
        }),
        ("Basic Information (English)", {
            "fields": ("name_en", "provider_en", "description_en")
        }),
        ("Benefits (Thai)", {
            "fields": ("benefits",),
            "description": "Enter benefits as a JSON array, e.g., [\"Full tuition\", \"Monthly allowance\"]"
        }),
        ("Benefits (English)", {
            "fields": ("benefits_en",),
            "description": "Enter benefits as a JSON array, e.g., [\"Full tuition\", \"Monthly allowance\"]"
        }),
        ("Deadline & Eligibility (Thai)", {
            "fields": ("deadline", "eligibility", "monthly_allowance")
        }),
        ("Deadline & Eligibility (English)", {
            "fields": ("deadline_en", "eligibility_en", "monthly_allowance_en")
        }),
        ("External Link", {
            "fields": ("link",)
        }),
        ("Categories", {
            "fields": ("type", "funding_type", "study_level", "field_of_study")
        }),
        ("Display Settings", {
            "fields": ("order", "is_active")
        }),
        ("Timestamps", {
            "fields": ("created_at", "updated_at"),
            "classes": ("collapse",)
        }),
    )
