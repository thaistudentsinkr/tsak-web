from django.contrib import admin
from .models import Experience


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ("name_en", "university_en", "degree", "date_posted")
    list_filter = ("degree", "curriculum_language", "field_of_study")
    search_fields = ("name_en", "name_th", "university_en", "university_th")

    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)

        # Guidance for multilingual list fields
        form.base_fields["major_pros"].help_text = (
            'Multilingual list. Example:\n'
            '{\n'
            '  "en": ["Cutting-edge research opportunities", "Strong industry connections"],\n'
            '  "th": ["งานวิจัยล้ำสมัย", "ความร่วมมือกับอุตสาหกรรม"]\n'
            '}'
        )

        form.base_fields["major_cons"].help_text = (
            'Multilingual list. Example:\n'
            '{\n'
            '  "en": ["Heavy workload", "Competitive environment"],\n'
            '  "th": ["งานหนัก", "การแข่งขันสูง"]\n'
            '}'
        )

        form.base_fields["uni_pros"].help_text = (
            'Multilingual list. Example:\n'
            '{\n'
            '  "en": ["Beautiful campus", "Strong alumni network"],\n'
            '  "th": ["วิทยาเขตสวยงาม", "เครือข่ายศิษย์เก่าที่แข็งแกร่ง"]\n'
            '}'
        )

        form.base_fields["uni_cons"].help_text = (
            'Multilingual list. Example:\n'
            '{\n'
            '  "en": ["Large campus", "Slow administration"],\n'
            '  "th": ["วิทยาเขตกว้างใหญ่", "การบริหารงานช้า"]\n'
            '}'
        )

        # Guidance for structured JSON fields
        form.base_fields["recommended_courses"].help_text = (
            'Multilingual list of objects. Example:\n'
            '{\n'
            '  "en": [\n'
            '    {"name": "Machine Learning Fundamentals", "professor": "Prof. Kim Jihoon", "reason": "Hands-on projects"},\n'
            '    {"name": "Database Systems", "reason": "Practical for real-world applications"}\n'
            '  ],\n'
            '  "th": [\n'
            '    {"name": "พื้นฐาน Machine Learning", "professor": "ศ. คิม จีฮุน", "reason": "ได้ลงมือทำจริง"},\n'
            '    {"name": "ระบบฐานข้อมูล", "reason": "ใช้งานจริงในชีวิตประจำวัน"}\n'
            '  ]\n'
            '}'
        )

        form.base_fields["achievements"].help_text = (
            'Multilingual list of objects. Example:\n'
            '{\n'
            '  "en": [\n'
            '    {"title": "K-Startup Hackathon Finalist", "description": "Top 10 out of 150 teams", "type": "achievement"},\n'
            '    {"title": "AI Chatbot Project", "description": "Used by 500+ students", "type": "project"}\n'
            '  ],\n'
            '  "th": [\n'
            '    {"title": "เข้ารอบสุดท้าย K-Startup Hackathon", "description": "ติด 10 ทีมจากทั้งหมด 150 ทีม", "type": "achievement"},\n'
            '    {"title": "โปรเจกต์แชทบอท AI", "description": "ใช้งานโดยนักศึกษา 500+ คน", "type": "project"}\n'
            '  ]\n'
            '}'
        )

        form.base_fields["preparation"].help_text = (
            'Multilingual list of strings. Example:\n'
            '{\n'
            '  "en": ["Start learning Korean 6 months before arrival", "Prepare a strong coding portfolio"],\n'
            '  "th": ["เริ่มเรียนภาษาเกาหลี 6 เดือนก่อนมา", "เตรียม portfolio การเขียนโปรแกรม"]\n'
            '}'
        )

        return form

    fieldsets = (
        ("General", {
            "fields": (
                "photo",
                "degree",
                "curriculum_language",
                "field_of_study",
            )
        }),
        ("English Content", {
            "fields": (
                "name_en",
                "university_en",
                "major_en",
                "short_bio_en",
                "why_korea_en",
                "why_major_en",
                "life_in_korea_en",
                "recommendations_en",
            )
        }),
        ("Thai Content", {
            "fields": (
                "name_th",
                "university_th",
                "major_th",
                "short_bio_th",
                "why_korea_th",
                "why_major_th",
                "life_in_korea_th",
                "recommendations_th",
            )
        }),
        ("Structured Lists (JSON)", {
            "description": (
                "⚠️ These fields expect valid JSON.\n"
                "Use curly braces {} with 'en' and 'th' keys for multilingual lists.\n"
                "Example provided in help text above each field."
            ),
            "fields": (
                "major_pros",
                "major_cons",
                "uni_pros",
                "uni_cons",
                "recommended_courses",
                "achievements",
                "preparation",
            )
        }),
        ("Contact", {
            "fields": ("email", "instagram", "linkedin")
        }),
    )
