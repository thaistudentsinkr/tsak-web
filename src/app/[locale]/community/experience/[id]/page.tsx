import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  ArrowLeft, 
  GraduationCap, 
  Building2, 
  Globe, 
  Mail, 
  Instagram,
  Linkedin,
  ThumbsUp,
  ThumbsDown,
  MapPin,
  Lightbulb,
  Calendar
} from "lucide-react";

import enMessages from "@/locales/community/experience/en.json";
import thMessages from "@/locales/community/experience/th.json";

type DegreeType = "bachelor" | "master" | "phd" | "exchange";
type LanguageType = "korean" | "english" | "mixed";

type Experience = {
  id: string;
  name: string;
  photo: string;
  university: string;
  major: string;
  degree: DegreeType;
  curriculumLanguage: LanguageType;
  shortBio: string;
  whyKorea: string;
  whyMajor: string;
  majorPros: string[];
  majorCons: string[];
  uniPros: string[];
  uniCons: string[];
  lifeInKorea: string;
  recommendations: string;
  contact: {
    email?: string;
    instagram?: string;
    linkedin?: string;
  };
  datePosted: string;
};

type Messages = {
  title: string;
  subtitle: string;
  introduction: string;
  readMore: string;
  backToList: string;
  filters: {
    all: string;
    university: string;
    major: string;
    degree: string;
    language: string;
  };
  degrees: Record<DegreeType, string>;
  languages: Record<LanguageType, string>;
  fields: {
    whyKorea: string;
    whyMajor: string;
    major: string;
    university: string;
    degree: string;
    curriculumLanguage: string;
    majorPros: string;
    majorCons: string;
    uniPros: string;
    uniCons: string;
    lifeInKorea: string;
    recommendations: string;
    contactInfo: string;
  };
  noResults: string;
  clearFilters: string;
  shareExperience: string;
  contactUs: string;
  experiences: Experience[];
};

const messages: Record<string, Messages> = {
  en: enMessages as unknown as Messages,
  th: thMessages as unknown as Messages,
};

const degreeColors: Record<DegreeType, { bg: string; text: string }> = {
  bachelor: { bg: "bg-blue-100", text: "text-blue-800" },
  master: { bg: "bg-purple-100", text: "text-purple-800" },
  phd: { bg: "bg-amber-100", text: "text-amber-800" },
  exchange: { bg: "bg-green-100", text: "text-green-800" },
};

type PageProps = {
  params: Promise<{ locale: string; id: string }>;
};

export default async function ExperienceDetailPage({ params }: PageProps) {
  const { locale, id } = await params;
  const t = messages[locale] || messages.th;
  
  const experience = t.experiences.find(exp => exp.id === id);
  
  if (!experience) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'th' ? 'th-TH' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Photo */}
      <div className="relative w-full bg-[#2C3985]">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 py-15 sm:py-25">
          {/* Back Button */}
          <Link
            href={`/${locale}/community/experience`}
            className="inline-flex items-center gap-2 text-[#FFFCDD] hover:text-white mb-2 transition-colors"
          >
            <ArrowLeft className="w-5 h-40" />
            {t.backToList}
          </Link>

          {/* Profile Section */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Photo */}
            <div className="w-40 h-40 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-[#FFFCDD] flex-shrink-0 bg-gray-300 flex items-center justify-center">
              {experience.photo ? (
                <Image
                  src={experience.photo}
                  alt={experience.name}
                  width={160}
                  height={160}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              ) : (
                <span className="text-5xl text-white font-semibold">
                  {experience.name.charAt(0)}
                </span>
              )}
            </div>

            {/* Info */}
            <div className="text-center sm:text-left">
              <h1 className="text-[#FFFCDD] text-2xl sm:text-3xl lg:text-4xl font-semibold mb-2">
                {experience.name}
              </h1>
              <p className="text-[#FFFCDD]/80 text-sm sm:text-base mb-3">
                {experience.shortBio}
              </p>
              
              {/* Tags */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                <span className="bg-[#FFFCDD]/20 text-[#FFFCDD] text-sm px-3 py-1 rounded-full flex items-center gap-1">
                  <Building2 className="w-4 h-4" />
                  {experience.university}
                </span>
                <span className="bg-[#FFFCDD]/20 text-[#FFFCDD] text-sm px-3 py-1 rounded-full flex items-center gap-1">
                  <GraduationCap className="w-4 h-4" />
                  {experience.major}
                </span>
                <span className={`${degreeColors[experience.degree].bg} ${degreeColors[experience.degree].text} text-sm px-3 py-1 rounded-full`}>
                  {t.degrees[experience.degree]}
                </span>
                <span className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  {t.languages[experience.curriculumLanguage]}
                </span>
              </div>

              {/* Date Posted */}
              <div className="flex items-center justify-center sm:justify-start gap-1 text-[#FFFCDD]/60 text-sm mt-3">
                <Calendar className="w-4 h-4" />
                {formatDate(experience.datePosted)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
        
        {/* Why Korea */}
        <section className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
          <h2 className="text-[#A51D2C] text-xl sm:text-2xl font-semibold mb-4 flex items-center gap-2">
            <MapPin className="w-6 h-6" />
            {t.fields.whyKorea}
          </h2>
          <p className="text-[#2C3985] leading-relaxed whitespace-pre-line">
            {experience.whyKorea}
          </p>
        </section>

        {/* Why This Major */}
        <section className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
          <h2 className="text-[#A51D2C] text-xl sm:text-2xl font-semibold mb-4 flex items-center gap-2">
            <GraduationCap className="w-6 h-6" />
            {t.fields.whyMajor}
          </h2>
          <p className="text-[#2C3985] leading-relaxed whitespace-pre-line">
            {experience.whyMajor}
          </p>
        </section>

        {/* Major Pros and Cons */}
        <section className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
          <h2 className="text-[#2C3985] text-xl sm:text-2xl font-semibold mb-4">
            {experience.major}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pros */}
            <div>
              <h3 className="text-green-700 font-medium mb-3 flex items-center gap-2">
                <ThumbsUp className="w-5 h-5" />
                {t.fields.majorPros}
              </h3>
              <ul className="space-y-2">
                {experience.majorPros.map((pro, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons */}
            <div>
              <h3 className="text-red-700 font-medium mb-3 flex items-center gap-2">
                <ThumbsDown className="w-5 h-5" />
                {t.fields.majorCons}
              </h3>
              <ul className="space-y-2">
                {experience.majorCons.map((con, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* University Pros and Cons */}
        <section className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
          <h2 className="text-[#2C3985] text-xl sm:text-2xl font-semibold mb-4 flex items-center gap-2">
            <Building2 className="w-6 h-6" />
            {experience.university}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pros */}
            <div>
              <h3 className="text-green-700 font-medium mb-3 flex items-center gap-2">
                <ThumbsUp className="w-5 h-5" />
                {t.fields.uniPros}
              </h3>
              <ul className="space-y-2">
                {experience.uniPros.map((pro, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons */}
            <div>
              <h3 className="text-red-700 font-medium mb-3 flex items-center gap-2">
                <ThumbsDown className="w-5 h-5" />
                {t.fields.uniCons}
              </h3>
              <ul className="space-y-2">
                {experience.uniCons.map((con, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Life in Korea */}
        <section className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
          <h2 className="text-[#A51D2C] text-xl sm:text-2xl font-semibold mb-4 flex items-center gap-2">
            <MapPin className="w-6 h-6" />
            {t.fields.lifeInKorea}
          </h2>
          <p className="text-[#2C3985] leading-relaxed whitespace-pre-line">
            {experience.lifeInKorea}
          </p>
        </section>

        {/* Recommendations */}
        <section className="bg-[#FFFCDD] rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
          <h2 className="text-[#A51D2C] text-xl sm:text-2xl font-semibold mb-4 flex items-center gap-2">
            <Lightbulb className="w-6 h-6" />
            {t.fields.recommendations}
          </h2>
          <p className="text-[#2C3985] leading-relaxed whitespace-pre-line">
            {experience.recommendations}
          </p>
        </section>

        {/* Contact Info */}
        <section className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
          <h2 className="text-[#2C3985] text-xl sm:text-2xl font-semibold mb-4">
            {t.fields.contactInfo}
          </h2>
          <div className="flex flex-wrap gap-4">
            {experience.contact.email && (
              <a
                href={`mailto:${experience.contact.email}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
              >
                <Mail className="w-5 h-5" />
                {experience.contact.email}
              </a>
            )}
            {experience.contact.instagram && (
              <a
                href={`https://instagram.com/${experience.contact.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:opacity-90 transition-opacity"
              >
                <Instagram className="w-5 h-5" />
                {experience.contact.instagram}
              </a>
            )}
            {experience.contact.linkedin && (
              <a
                href={`https://linkedin.com/in/${experience.contact.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#0077B5] text-white rounded-full hover:opacity-90 transition-opacity"
              >
                <Linkedin className="w-5 h-5" />
                LinkedIn
              </a>
            )}
          </div>
        </section>

        {/* Back Button */}
        <div className="text-center">
          <Link
            href={`/${locale}/community/experience`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#2C3985] text-[#FFFCDD] rounded-full font-medium hover:bg-[#1F2A6B] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            {t.backToList}
          </Link>
        </div>

      </div>
    </div>
  );
}