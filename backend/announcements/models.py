from django.db import models
from django.utils.translation import gettext_lazy as _

class Semester(models.Model):
    code = models.CharField(
        max_length=30,
        unique=True,
        help_text="e.g. spring_2025"
    )
    name_th = models.CharField(
        max_length=100,
        help_text="เช่น ภาคเรียนฤดูใบไม้ผลิ 2025",
        default=""
    )
    name_en = models.CharField(
        max_length=100,
        help_text="e.g. Spring 2025",
        default=""
    )
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['-code']

    def __str__(self):
        return self.name_en

class Announcement(models.Model):
    
    DEPARTMENT_CHOICES = [
        ('tsak', 'TSAK'),
        ('executive', 'ฝ่ายบริหาร / Executive Board'),
        ('documentation', 'ฝ่ายเอกสาร / Documentation'),
        ('accounting', 'ฝ่ายบัญชีและการเงิน / Accounting'),
        ('liaison', 'ฝ่ายประสานงาน / Liaison'),
        ('pr', 'ฝ่ายประชาสัมพันธ์ / Public Relations'),
        ('it', 'ฝ่ายเทคโนโลยีสารสนเทศ / IT'),
        ('events', 'ฝ่ายกิจกรรม / Events'),
    ]
    
    # Basic fields
    title_th = models.CharField(max_length=500, verbose_name="Title (Thai)")
    title_en = models.CharField(max_length=500, verbose_name="Title (English)", blank=True)
    content_th = models.TextField(verbose_name="Content (Thai)")
    content_en = models.TextField(verbose_name="Content (English)", blank=True)
    
    # Metadata
    date = models.DateField(verbose_name="Announcement Date", default='2025-01-01')
    semester = models.ForeignKey(
        Semester,
        on_delete=models.PROTECT,
        related_name='announcements'
    )

    department = models.CharField(max_length=50, choices=DEPARTMENT_CHOICES, verbose_name="Department", default='tsak')
    
    # Stats
    views = models.PositiveIntegerField(default=0, verbose_name="View Count")
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Status
    is_published = models.BooleanField(default=True, verbose_name="Published")
    
    class Meta:
        ordering = ['-date', '-created_at']
        verbose_name = "Announcement"
        verbose_name_plural = "Announcements"
        indexes = [
            models.Index(fields=['-date']),
            models.Index(fields=['semester']),
            models.Index(fields=['department']),
        ]
    
    def __str__(self):
        return f"{self.title_th} ({self.date})"
    
    def increment_views(self):
        """Increment view count atomically"""
        self.views = models.F('views') + 1
        self.save(update_fields=['views'])
        self.refresh_from_db()


class RelatedLink(models.Model):
    announcement = models.ForeignKey(
        Announcement, 
        on_delete=models.CASCADE, 
        related_name='related_links'
    )
    name_th = models.CharField(max_length=200, verbose_name="Link Name (Thai)")
    name_en = models.CharField(max_length=200, verbose_name="Link Name (English)", blank=True)
    url = models.URLField(verbose_name="URL")
    order = models.PositiveIntegerField(default=0, verbose_name="Display Order")
    
    class Meta:
        ordering = ['order', 'id']
        verbose_name = "Related Link"
        verbose_name_plural = "Related Links"
    
    def __str__(self):
        return f"{self.name_th} - {self.announcement.title_th}"