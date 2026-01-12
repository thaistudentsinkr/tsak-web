from django.db import models


class Sponsor(models.Model):
    SPONSOR_TYPES = [
        ("embassy", "Embassy"),
        ("partner", "Partner"),
        ("network", "Network"),
    ]

    name = models.CharField(max_length=255)
    logo = models.ImageField(upload_to="sponsors/logos/")
    description = models.TextField(blank=True)
    type = models.CharField(max_length=20, choices=SPONSOR_TYPES)
    order = models.IntegerField(default=0, help_text="Display order (lower numbers first)")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'created_at']
        verbose_name = "Sponsor"
        verbose_name_plural = "Sponsors"

    def __str__(self):
        return f"{self.name} ({self.get_type_display()})"