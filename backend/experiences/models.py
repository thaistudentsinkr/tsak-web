from django.db import models
from django.utils import timezone


class Experience(models.Model):
    DEGREE_CHOICES = [
        ("bachelor", "Bachelor"),
        ("master", "Master"),
        ("phd", "PhD"),
        ("exchange", "Exchange"),
    ]

    LANGUAGE_CHOICES = [
        ("korean", "Korean"),
        ("english", "English"),
        ("mixed", "Mixed"),
    ]

    FIELD_CHOICES = [
        ("science", "Science"),
        ("arts", "Arts"),
        ("business", "Business"),
        ("medicine", "Medicine"),
        ("social-science", "Social Science"),
    ]

    photo = models.ImageField(upload_to="experience/photos/", blank=True, null=True)

    degree = models.CharField(max_length=20, choices=DEGREE_CHOICES)
    curriculum_language = models.CharField(max_length=20, choices=LANGUAGE_CHOICES)
    field_of_study = models.CharField(max_length=50, choices=FIELD_CHOICES)

    # Text fields (already split)
    name_en = models.CharField(max_length=255)
    name_th = models.CharField(max_length=255)

    university_en = models.CharField(max_length=255)
    university_th = models.CharField(max_length=255)

    major_en = models.CharField(max_length=255)
    major_th = models.CharField(max_length=255)

    short_bio_en = models.TextField()
    short_bio_th = models.TextField()

    why_korea_en = models.TextField()
    why_korea_th = models.TextField()

    why_major_en = models.TextField()
    why_major_th = models.TextField()

    life_in_korea_en = models.TextField()
    life_in_korea_th = models.TextField()

    recommendations_en = models.TextField()
    recommendations_th = models.TextField()

    major_pros = models.JSONField(default=dict)
    major_cons = models.JSONField(default=dict)
    uni_pros = models.JSONField(default=dict)
    uni_cons = models.JSONField(default=dict)

    recommended_courses = models.JSONField(default=dict)
    achievements = models.JSONField(default=dict)
    preparation = models.JSONField(default=dict)

    email = models.EmailField(blank=True, null=True)
    instagram = models.CharField(max_length=100, blank=True, null=True)
    linkedin = models.CharField(max_length=255, blank=True, null=True)

    date_posted = models.DateField(default=timezone.now)

    def __str__(self):
        return self.name_en
