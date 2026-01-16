from django.db import models
from django.core.exceptions import ValidationError

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

def validate_choices(value, valid_choices):
    if not isinstance(value, list):
        raise ValidationError("Must be a list")

    valid = {v[0] for v in valid_choices}
    invalid = set(value) - valid

    if invalid:
        raise ValidationError(f"Invalid choice(s): {', '.join(invalid)}")


class Scholarship(models.Model):
    # Basic Information (Thai)
    name = models.CharField(max_length=255, verbose_name="Name (Thai)")
    provider = models.CharField(max_length=255, verbose_name="Provider (Thai)")
    description = models.TextField(verbose_name="Description (Thai)")

    # Basic Information (English)
    name_en = models.CharField(max_length=255, blank=True, verbose_name="Name (English)")
    provider_en = models.CharField(max_length=255, blank=True, verbose_name="Provider (English)")
    description_en = models.TextField(blank=True, verbose_name="Description (English)")

    # Benefits
    benefits = models.JSONField(default=list)
    benefits_en = models.JSONField(default=list)

    # Deadline and Eligibility
    deadline = models.CharField(max_length=255, verbose_name="Deadline (Thai)")
    deadline_en = models.CharField(max_length=255, blank=True, verbose_name="Deadline (English)")

    eligibility = models.TextField(verbose_name="Eligibility (Thai)")
    eligibility_en = models.TextField(blank=True, verbose_name="Eligibility (English)")

    # Monthly Allowance
    monthly_allowance = models.CharField(max_length=100, verbose_name="Monthly Allowance (Thai)")
    monthly_allowance_en = models.CharField(max_length=100, blank=True, verbose_name="Monthly Allowance (English)")

    # External Link
    link = models.URLField(max_length=500)

    # Categories
    type = models.CharField(max_length=20, choices=SCHOLARSHIP_TYPES)

    funding_type = models.JSONField(default=list)
    study_level = models.JSONField(default=list)
    field_of_study = models.JSONField(default=list)

    # Display order
    order = models.IntegerField(default=0)

    # Status
    is_active = models.BooleanField(default=True)

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["order", "-created_at"]
        verbose_name = "Scholarship"
        verbose_name_plural = "Scholarships"

    def __str__(self):
        return f"{self.name} - {self.get_type_display()}"
