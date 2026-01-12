from django.db import models
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
    
    # Image
    image = models.ImageField(upload_to='events/', blank=True, null=True)
    
    # Date Information
    date = models.CharField(max_length=100, help_text="Date string format, e.g., '20.07.2025 - 23.07.2025'")
    date_range = models.CharField(max_length=100, blank=True, null=True)
    
    # Status
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='open')
    status_text = models.CharField(max_length=100, blank=True, help_text="Status text (can be translated on frontend)")
    
    # Details
    description = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    organizer = models.CharField(max_length=255, blank=True, null=True)
    
    # Relationships
    sponsors = models.ManyToManyField(Sponsor, blank=True, related_name='events')
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Event'
        verbose_name_plural = 'Events'
    
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
