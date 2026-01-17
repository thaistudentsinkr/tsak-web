"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Building, Eye } from "lucide-react";
import enContent from "@/locales/announcement/en.json";
import thContent from "@/locales/announcement/th.json";

type Locale = "en" | "th";

const contentMap = {
  en: enContent,
  th: thContent,
};

//to be implementd : API
const announcements: Record<string, {
  id: string;
  date: string;
  semester: string;
  department: string;
  title: string;
  content: string;
  views: number;
}> = {
  "1": {
    id: "1",
    date: "2025-04-02",
    semester: "Spring 2025",
    department: "ฝ่ายบริหาร",
    title: "คำแถลงแสดงความเสียใจต่อเหตุการณ์ไฟป่าในพื้นที่ภาคตะวันออกเฉียงใต้",
    content: `สมาคมนักเรียนไทยในสาธารณรัฐเกาหลี (TSAK) ขอแสดงความเสียใจอย่างสุดซึ้งต่อเหตุการณ์ไฟป่าที่เกิดขึ้นในพื้นที่ภาคตะวันออกเฉียงใต้ของประเทศไทย

เราขอส่งกำลังใจไปยังผู้ประสบภัยทุกท่าน รวมถึงเจ้าหน้าที่และอาสาสมัครที่กำลังปฏิบัติหน้าที่อย่างเต็มกำลัง

สมาคมฯ พร้อมให้การสนับสนุนและช่วยเหลือตามความเหมาะสม หากสมาชิกท่านใดต้องการข้อมูลเพิ่มเติมหรือความช่วยเหลือ สามารถติดต่อได้ที่ช่องทางประชาสัมพันธ์ของสมาคมฯ

ด้วยความเสียใจอย่างสุดซึ้ง
คณะกรรมการบริหาร TSAK`,
    views: 1250,
  },
  "2": {
    id: "2",
    date: "2025-04-02",
    semester: "Spring 2025",
    department: "ฝ่ายบริหาร",
    title: "คำแถลงแสดงความเสียใจต่อเหตุการณ์ไฟป่าในพื้นที่ภาคตะวันออกเฉียงใต้",
    content: `สมาคมนักเรียนไทยในสาธารณรัฐเกาหลี (TSAK) ขอแสดงความเสียใจอย่างสุดซึ้งต่อเหตุการณ์ไฟป่าที่เกิดขึ้นในพื้นที่ภาคตะวันออกเฉียงใต้ของประเทศไทย

เราขอส่งกำลังใจไปยังผู้ประสบภัยทุกท่าน รวมถึงเจ้าหน้าที่และอาสาสมัครที่กำลังปฏิบัติหน้าที่อย่างเต็มกำลัง`,
    views: 890,
  },
  "3": {
    id: "3",
    date: "2025-03-15",
    semester: "Spring 2025",
    department: "ฝ่ายวิชาการ",
    title: "ประกาศรับสมัครทุนการศึกษาประจำปี 2025",
    content: `ฝ่ายวิชาการ TSAK ขอประกาศเปิดรับสมัครทุนการศึกษาประจำปี 2025

คุณสมบัติผู้สมัคร:
- เป็นสมาชิก TSAK
- กำลังศึกษาในระดับปริญญาตรีหรือสูงกว่า
- มีผลการเรียนดี

เอกสารที่ต้องใช้:
1. ใบสมัคร
2. สำเนาบัตรนักศึกษา
3. ใบแสดงผลการเรียน

กำหนดรับสมัคร: 15 มีนาคม - 30 เมษายน 2025

สอบถามข้อมูลเพิ่มเติมได้ที่ฝ่ายวิชาการ TSAK`,
    views: 2340,
  },
};

function ShareButtons({ title, locale }: { title: string; locale: string }) {
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  
  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const handleShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(currentUrl);
    const encodedTitle = encodeURIComponent(title);
    
    const shareUrls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      line: `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], "_blank", "width=600,height=400");
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const t = contentMap[locale as Locale]?.detail;

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-500">
        {t?.share || "Share"}:
      </span>
      
      {/* Facebook */}
      <button
        type="button"
        onClick={() => handleShare("facebook")}
        className="w-9 h-9 flex items-center justify-center rounded-full bg-[#1877F2] text-white hover:opacity-80 transition-opacity"
        aria-label="Share on Facebook"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </button>
      
      {/* Twitter/X */}
      <button
        type="button"
        onClick={() => handleShare("twitter")}
        className="w-9 h-9 flex items-center justify-center rounded-full bg-black text-white hover:opacity-80 transition-opacity"
        aria-label="Share on X"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </button>
      
      {/* LINE */}
      <button
        type="button"
        onClick={() => handleShare("line")}
        className="w-9 h-9 flex items-center justify-center rounded-full bg-[#00B900] text-white hover:opacity-80 transition-opacity"
        aria-label="Share on LINE"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
        </svg>
      </button>
      
      {/* Copy Link */}
      <button
        type="button"
        onClick={copyToClipboard}
        className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors relative"
        aria-label={t?.copyLink || "Copy Link"}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
        {copied && (
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap">
            {t?.copied || "Copied!"}
          </span>
        )}
      </button>
    </div>
  );
}

export default function AnnouncementDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; id: string }>;
}) {
  const [locale, setLocale] = useState<Locale>("th");
  const [id, setId] = useState<string>("");
  
  useEffect(() => {
    params.then((p) => {
      setLocale(p.locale || "th");
      setId(p.id);
    });
  }, [params]);

  const t = contentMap[locale]?.detail;
  const announcement = announcements[id];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === "th" ? "th-TH" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Loading state
  if (!id) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2C3985]"></div>
      </div>
    );
  }

  // Not found state
  if (!announcement) {
    return (
      <div className="min-h-screen bg-white">
        <main className="max-w-4xl mx-auto px-6 py-20">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{t?.notFound}</h1>
            <p className="text-gray-500 mb-8">{t?.notFoundDesc}</p>
            <Link
              href={`/${locale}/announcement`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#2C3985] text-white rounded-full font-medium hover:bg-[#1e2a5e] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t?.backToList}
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative w-full bg-[#2C3985]">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 py-15 sm:py-25">
          {/* Back Button */}
          <Link
            href={`/${locale}/announcement`}
            className="inline-flex items-center gap-2 text-[#FFFCDD] hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            {t?.back}
          </Link>

          {/* Department Badge */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-[#FFFCDD]/20 text-[#FFFCDD] text-sm px-3 py-1 rounded-full flex items-center gap-1">
              <Building className="w-4 h-4" />
              {announcement.department}
            </span>
            <span className="bg-[#FFFCDD]/20 text-[#FFFCDD] text-sm px-3 py-1 rounded-full">
              {announcement.semester}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-[#FFFCDD] text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4">
            {announcement.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-[#FFFCDD]/60 text-sm">
            <span>{formatDate(announcement.date)}</span>
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {announcement.views.toLocaleString()} {locale === "th" ? "ครั้ง" : "views"}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
        {/* Share Buttons */}
        <div className="flex justify-end mb-8">
          <ShareButtons 
            title={announcement.title}
            locale={locale}
          />
        </div>

        {/* Article Content */}
        <article className="bg-white rounded-2xl p-6 sm:p-8 mb-6">
          {announcement.content.split("\n").map((paragraph, idx) => (
            <p key={idx} className="text-[#2C3985] leading-relaxed mb-4 text-base md:text-lg">
              {paragraph}
            </p>
          ))}
        </article>

        {/* Related Announcements */}
        <section className="mt-8">
          <h2 className="text-[#2C3985] text-xl font-semibold mb-6">
            {t?.otherAnnouncements}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.values(announcements)
              .filter((a) => a.id !== id)
              .slice(0, 2)
              .map((item) => (
                <Link
                  key={item.id}
                  href={`/${locale}/announcement/${item.id}`}
                  className="group bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl transition-all"
                >
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <span className="px-2 py-0.5 bg-gray-100 rounded-full">{item.department}</span>
                    <span>{formatDate(item.date)}</span>
                  </div>
                  <h3 className="font-semibold text-[#2C3985] group-hover:text-[#A51D2C] transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                </Link>
              ))}
          </div>
        </section>

        {/* Back Button */}
        <div className="text-center mt-10">
          <Link
            href={`/${locale}/announcement`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#2C3985] text-[#FFFCDD] rounded-full font-medium hover:bg-[#1F2A6B] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            {t?.back}
          </Link>
        </div>
      </div>
    </div>
  );
}