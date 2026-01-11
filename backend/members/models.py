from django.db import models

class Member(models.Model):
    POSITION_CHOICES = [
        ('president', 'President'),
        ('vice_president', 'Vice President'),
        ('secretary', 'Secretary'),
        ('head', 'Head'),
        ('member', 'Member'),
        ('advisor', 'Advisor'),
    ]
    
    DEPARTMENT_CHOICES = [
        ('honorary', 'Honorary'),
        ('executive', 'Executive'),
        ('liaison', 'Liaison'),
        ('pr', 'Public Relations'),
        ('events', 'Events'),
        ('accounting', 'Accounting'),
        ('documents', 'Documents'),
        ('it', 'IT Support'),
    ]
    
    # Basic Information
    firstname = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    picture = models.ImageField(upload_to='members/', blank=True, null=True)
    
    # Academic Information
    university = models.CharField(max_length=200)
    major = models.CharField(max_length=200)
    
    # Organization Information
    position = models.CharField(max_length=20, choices=POSITION_CHOICES)
    department = models.CharField(max_length=20, choices=DEPARTMENT_CHOICES)
    working = models.BooleanField(default=True, help_text="Is currently active member")
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['position', 'lastname', 'firstname']
        verbose_name = 'Member'
        verbose_name_plural = 'Members'
    
    def __str__(self):
        return f"{self.firstname} {self.lastname} - {self.get_position_display()}"
    
    @property
    def picture_url(self):
        """Return the picture URL or None if no picture exists"""
        if self.picture:
            return self.picture.url
        return None