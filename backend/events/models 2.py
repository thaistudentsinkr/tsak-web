from django.db import models
from django.core.exceptions import ValidationError
from datetime import datetime
from sponsors.models import Sponsor


class Event(models.Model):
    STATUS_CHOICES = [
        ('ended', 'Ended'),
        ('closed', 'Registration Closed'),
        ('open', 'Registration Open'),
    ]
    
    # Basic Information
    title = models.CharField(max_length=255)
    title_en = models.CharField(max_length=255, blank=True, null=True, help_text="English title")
    subtitle = models.CharField(max_length=255, blank=True, null=True)
    subtitle_en = models.CharField(max_length=255, blank=True, null=True, help_text="English subtitle")
    
    # Image
    image = models.ImageField(upload_to='events/', blank=True, null=True)
    
    # Date Information
    date = models.CharField(max_length=100, help_text="Date string format, e.g., '20.07.2025 - 23.07.2025' or '20.07.2025'")
    date_range = models.CharField(max_length=100, blank=True, null=True)
    
    # Ordering
    ORDERING_CHOICES = [
        ('manual', 'Manual Order'),
        ('date', 'Sort by Date'),
    ]
    ordering_type = models.CharField(
        max_length=10,
        choices=ORDERING_CHOICES,
        default='date',
        help_text="Choose 'Manual Order' to use custom order field, or 'Sort by Date' to automatically sort by date"
    )
    order = models.IntegerField(
        default=0,
        help_text="Manual order number (lower numbers appear first). Only used when ordering_type is 'Manual Order'"
    )
    
    # Status
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='open')
    status_text = models.CharField(max_length=100, blank=True, help_text="Status text (can be translated on frontend)")
    
    # Details
    description = models.TextField(blank=True, null=True)
    description_en = models.TextField(blank=True, null=True, help_text="English description")
    location = models.CharField(max_length=255, blank=True, null=True)
    registration_url = models.URLField(blank=True, null=True, help_text="Registration/Event URL (for the register button)")
    organizer = models.CharField(max_length=255, blank=True, null=True)
    organizer_logo = models.ImageField(upload_to='events/organizers/', blank=True, null=True, help_text="Organizer logo. If not provided, will use default TSAK logo.")
    
    # Relationships
    sponsors = models.ManyToManyField(Sponsor, blank=True, related_name='events')
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['order', '-created_at']
        verbose_name = 'Event'
        verbose_name_plural = 'Events'
    
    def clean(self):
        """Validate date field"""
        super().clean()
        if self.date:
            # Try to parse the date string
            # Format can be: "20.07.2025" or "20.07.2025 - 23.07.2025"
            date_str = self.date.strip()
            if ' - ' in date_str:
                # Date range format
                parts = date_str.split(' - ')
                if len(parts) != 2:
                    raise ValidationError({'date': "Date range must be in format 'DD.MM.YYYY - DD.MM.YYYY'"})
                for part in parts:
                    self._validate_date_format(part.strip())
            else:
                # Single date format
                self._validate_date_format(date_str)
    
    def _validate_date_format(self, date_str):
        """Validate a single date string in DD.MM.YYYY format"""
        try:
            datetime.strptime(date_str, '%d.%m.%Y')
        except ValueError:
            raise ValidationError({'date': f"Invalid date format: '{date_str}'. Expected format: DD.MM.YYYY (e.g., 20.07.2025)"})
    
    def save(self, *args, **kwargs):
        """Override save to run validation"""
        self.full_clean()
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.title} ({self.get_status_display()})"


class EventImage(models.Model):
    """Additional images for an event (for imageDir)"""
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='events/gallery/')
    order = models.IntegerField(default=0, help_text="Display order (lower numbers first)")
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['order', 'created_at']
        verbose_name = 'Event Image'
        verbose_name_plural = 'Event Images'
    
    def __str__(self):
        return f"Image for {self.event.title}"
