"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo, use } from "react";
import { Users, Filter, X, GraduationCap, Building2, Globe, ChevronRight } from "lucide-react";
import { useEffect } from "react";

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
  fieldOfStudy: string;
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
    fieldOfStudy: string;
  };
  degrees: Record<DegreeType, string>;
  languages: Record<LanguageType, string>;
  fieldTypes: Record<string, string>;
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

// API Configuration
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

type FieldOfStudy = "all" | "science" | "arts" | "business" | "medicine" | "social-science";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default function ExperiencePage({ params }: PageProps) {
  const { locale } = use(params);
  const t = messages[locale] || messages.th;
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/experiences?lang=${locale}`);
        if (!res.ok) throw new Error("Failed to fetch experiences");
        const data = await res.json();
        setExperiences(data.results);
      } catch (err) {
        console.error(err);
      }
    };

    fetchExperiences();
  }, [locale]);
  // Filter states
  const [selectedField, setSelectedField] = useState<FieldOfStudy>("all");
  const [selectedDegree, setSelectedDegree] = useState<DegreeType | "all">("all");
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageType | "all">("all");
  const [showFilters, setShowFilters] = useState(false);

  // Filter experiences
  const filteredExperiences = useMemo(() => {
    if (!Array.isArray(experiences)) return [];
    return experiences.filter((exp) => {
      const matchesField = selectedField === "all" || exp.fieldOfStudy === selectedField;
      const matchesDegree = selectedDegree === "all" || exp.degree === selectedDegree;
      const matchesLang = selectedLanguage === "all" || exp.curriculumLanguage === selectedLanguage;
      
      return matchesField && matchesDegree && matchesLang;
    });
  }, [experiences, selectedField, selectedDegree, selectedLanguage]);



  const clearFilters = () => {
    setSelectedField("all");
    setSelectedDegree("all");
    setSelectedLanguage("all");
  };

  const hasActiveFilters = selectedField !== "all" || selectedDegree !== "all" || selectedLanguage !== "all";

  return (
    <div className="min-h-screen">

      {/* Title Section */}
      <div 
        className="relative w-full py-30 sm:py-10 lg:py-30 flex flex-col items-center justify-center px-4 sm:px-8"
        style={{
          background: 'linear-gradient(to bottom, #FFFFFF 0%, #FFFCDD 50%, #FFFFFF 100%)'
        }}
      >
        <div className="flex items-center gap-3 mb-2">
          <Users className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-[#A51D2C]" />
          <h1 className="text-[#A51D2C] text-3xl sm:text-4xl lg:text-6xl font-semibold text-center">
            {t.title}
          </h1>
        </div>
        <p className="text-[#2C3985] text-sm sm:text-base lg:text-lg mt-2 text-center">
          {t.subtitle}
        </p>
      </div>

      {/* Content Section */}
      <div className="w-full py-8 sm:py-12 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Introduction */}
          <div className="mb-8 p-6 rounded-2xl">
            <p className="text-[#2C3985] text-sm sm:text-base leading-relaxed">
              {t.introduction}
            </p>
          </div>

          {/* Filter Toggle Button (Mobile) */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#2C3985] text-[#FFFCDD] rounded-full font-medium"
            >
              <Filter className="w-5 h-5" />
              {showFilters ? (locale === 'th' ? "ซ่อนตัวกรอง" : "Hide Filters") : (locale === 'th' ? "แสดงตัวกรอง" : "Show Filters")}
              {hasActiveFilters && (
                <span className="bg-[#A51D2C] text-white text-xs px-2 py-0.5 rounded-full">
                  {locale === 'th' ? "ใช้งานอยู่" : "Active"}
                </span>
              )}
            </button>
          </div>

          {/* Filters Section */}
          <div className={`mb-8 p-6 bg-white rounded-2xl shadow-lg border border-gray-100 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[#2C3985] font-semibold flex items-center gap-2">
                <Filter className="w-5 h-5" />
                {locale === 'th' ? 'ตัวกรอง' : 'Filter Experiences'}
              </h2>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-[#A51D2C] text-sm flex items-center gap-1 hover:underline"
                >
                  <X className="w-4 h-4" />
                  {t.clearFilters}
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Field of Study Filter */}
              <div>
                <label className="block text-sm font-medium text-[#2C3985] mb-2">
                  {t.filters.fieldOfStudy}
                </label>
                <select
                  value={selectedField}
                  onChange={(e) => setSelectedField(e.target.value as FieldOfStudy)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-full text-sm focus:ring-2 focus:ring-[#2C3985] focus:border-transparent"
                >
                  <option value="all">{t.filters.all}</option>
                  {Object.entries(t.fieldTypes).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                  ))}
                </select>
              </div>

              {/* Degree Filter */}
              <div>
                <label className="block text-sm font-medium text-[#2C3985] mb-2">
                  {t.filters.degree}
                </label>
                <select
                  value={selectedDegree}
                  onChange={(e) => setSelectedDegree(e.target.value as DegreeType | "all")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-full text-sm focus:ring-2 focus:ring-[#2C3985] focus:border-transparent"
                >
                  <option value="all">{t.filters.all}</option>
                  {Object.entries(t.degrees).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                  ))}
                </select>
              </div>

              {/* Language Filter */}
              <div>
                <label className="block text-sm font-medium text-[#2C3985] mb-2">
                  {t.filters.language}
                </label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value as LanguageType | "all")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-full text-sm focus:ring-2 focus:ring-[#2C3985] focus:border-transparent"
                >
                  <option value="all">{t.filters.all}</option>
                  {Object.entries(t.languages).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results count */}
            <div className="mt-4 text-sm text-gray-600">
              {locale === 'th' 
                ? `พบ ${filteredExperiences.length} ประสบการณ์`
                : `Found ${filteredExperiences.length} experience${filteredExperiences.length !== 1 ? 's' : ''}`}
            </div>
          </div>

          {/* Experience Cards */}
          {filteredExperiences.length > 0 ? (
            <div className="flex flex-col gap-4">
              {filteredExperiences.map((exp) => (
                <Link
                  key={exp.id}
                  href={`/${locale}/community/experience/${exp.id}`}
                  className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#2C3985]/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Left - Photo */}
                    <div className="flex-shrink-0 flex sm:block justify-center">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-100 bg-gray-200 flex items-center justify-center">
                        {exp.photo ? (
                          <img
                            src={exp.photo}
                            alt={exp.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-3xl text-gray-400">
                            {exp.name.charAt(0)}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Right - Content */}
                    <div className="flex-1 min-w-0">
                      {/* Name and Tags Row */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                        <div>
                          <h3 className="font-semibold text-[#2C3985] text-xl group-hover:text-[#A51D2C] transition-colors">
                            {exp.name}
                          </h3>
                          <p className="text-gray-500 text-sm">
                            {exp.university} · {exp.major}
                          </p>
                        </div>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          <span className={`${degreeColors[exp.degree].bg} ${degreeColors[exp.degree].text} text-xs px-3 py-1 rounded-full`}>
                            {t.degrees[exp.degree]}
                          </span>
                          <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                            <Globe className="w-3 h-3" />
                            {t.languages[exp.curriculumLanguage]}
                          </span>
                        </div>
                      </div>

                      {/* Short Bio */}
                      <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                        {exp.shortBio}
                      </p>

                      {/* Bottom Row - Pros and Read More */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                        {/* Read More */}
                        <div className="flex items-center text-[#A51D2C] text-sm font-medium">
                          <span>{t.readMore}</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-2xl">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">{t.noResults}</p>
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#2C3985] text-[#FFFCDD] rounded-full text-sm font-medium hover:bg-[#1F2A6B] transition-colors"
              >
                <X className="w-4 h-4" />
                {t.clearFilters}
              </button>
            </div>
          )}

          {/* Share Experience CTA */}
          <div className="mt-10 p-6 bg-[#2C3985] rounded-2xl text-center">
            <h2 className="text-[#FFFCDD] text-lg sm:text-xl font-semibold mb-3">
              {t.shareExperience}
            </h2>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFFCDD] text-[#2C3985] rounded-full font-medium hover:bg-[#FFF9CC] transition-colors"
            >
              {t.contactUs}
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}