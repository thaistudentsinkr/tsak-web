"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import { GraduationCap, ExternalLink, Calendar, DollarSign, Clock, Filter, X, Wallet } from "lucide-react";

import enMessages from "@/locales/info/scholarships/en.json";
import thMessages from "@/locales/info/scholarships/th.json";

type ScholarshipType = "government" | "university" | "private" | "organization";
type FundingType = "full-tuition" | "partial-tuition" | "merit-based" | "need-based";
type StudyLevel = "undergraduate" | "graduate" | "masters" | "phd" | "all-levels";
type FieldOfStudy = "all-fields" | "science" | "arts" | "business" | "medicine";

type Scholarship = {
  id: number;
  name: string;
  provider: string;
  description: string;
  benefits: string[];
  deadline: string;
  eligibility: string;
  monthlyAllowance: string;
  link: string;
  type: ScholarshipType;
  fundingType: FundingType[];
  studyLevel: StudyLevel[];
  fieldOfStudy: FieldOfStudy[];
};

type Messages = {
  title: string;
  subtitle: string;
  introduction: string;
  benefits: string;
  deadline: string;
  eligibility: string;
  monthlyAllowance: string;
  learnMore: string;
  disclaimer: string;
  disclaimerText: string;
  contactQuestion: string;
  contactUs: string;
  filters: {
    all: string;
    fundingType: string;
    studyLevel: string;
    fieldOfStudy: string;
    provider: string;
  };
  fundingTypes: Record<FundingType, string>;
  studyLevels: Record<StudyLevel, string>;
  fieldTypes: Record<FieldOfStudy, string>;
  types: Record<ScholarshipType, string>;
  noResults: string;
  clearFilters: string;
  scholarships: Scholarship[];
};

const messages: Record<string, Messages> = {
  en: enMessages as unknown as Messages,
  th: thMessages as unknown as Messages,
};

const typeColors: Record<ScholarshipType, { bg: string; text: string }> = {
  government: { bg: "bg-blue-100", text: "text-blue-800" },
  university: { bg: "bg-purple-100", text: "text-purple-800" },
  private: { bg: "bg-green-100", text: "text-green-800" },
  organization: { bg: "bg-orange-100", text: "text-orange-800" },
};

type PageProps = {
  params: { locale: string };
};

export default function ScholarshipsPage({ params }: PageProps) {
  const locale = params.locale;
  const t = messages[locale] || messages.th;

  // Filter states
  const [selectedFunding, setSelectedFunding] = useState<FundingType | "all">("all");
  const [selectedLevel, setSelectedLevel] = useState<StudyLevel | "all">("all");
  const [selectedField, setSelectedField] = useState<FieldOfStudy | "all">("all");
  const [selectedProvider, setSelectedProvider] = useState<ScholarshipType | "all">("all");
  const [showFilters, setShowFilters] = useState(false);

  // Filter scholarships
  const filteredScholarships = useMemo(() => {
    return t.scholarships.filter((scholarship) => {
      const matchesFunding = selectedFunding === "all" || scholarship.fundingType.includes(selectedFunding);
      const matchesLevel = selectedLevel === "all" || scholarship.studyLevel.includes(selectedLevel);
      const matchesField = selectedField === "all" || scholarship.fieldOfStudy.includes(selectedField) || scholarship.fieldOfStudy.includes("all-fields");
      const matchesProvider = selectedProvider === "all" || scholarship.type === selectedProvider;
      
      return matchesFunding && matchesLevel && matchesField && matchesProvider;
    });
  }, [t.scholarships, selectedFunding, selectedLevel, selectedField, selectedProvider]);

  const clearFilters = () => {
    setSelectedFunding("all");
    setSelectedLevel("all");
    setSelectedField("all");
    setSelectedProvider("all");
  };

  const hasActiveFilters = selectedFunding !== "all" || selectedLevel !== "all" || selectedField !== "all" || selectedProvider !== "all";

  return (
    <div className="min-h-screen">

      {/* Title Section */}
      <div 
        className="relative w-full py-6 sm:py-10 lg:py-14 flex flex-col items-center justify-center px-4 sm:px-8"
        style={{
          background: 'linear-gradient(to bottom, #FFFFFF 0%, #FFFCDD 50%, #FFFFFF 100%)'
        }}
      >
        <div className="flex items-center gap-3 mb-2">
          <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-[#A51D2C]" />
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
          

          {/* Filter Toggle Button (Mobile) */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#2C3985] text-[#FFFCDD] rounded-xl font-medium"
            >
              <Filter className="w-5 h-5" />
              {showFilters ? "Hide Filters" : "Show Filters"}
              {hasActiveFilters && (
                <span className="bg-[#A51D2C] text-white text-xs px-2 py-0.5 rounded-full">
                  Active
                </span>
              )}
            </button>
          </div>

          {/* Filters Section */}
          <div className={`mb-8 p-6 bg-white rounded-2xl shadow-lg border border-gray-100 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[#2C3985] font-semibold flex items-center gap-2">
                <Filter className="w-5 h-5" />
                {locale === 'th' ? 'ตัวกรอง' : 'Filter'}
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Funding Type Filter */}
              <div>
                <label className="block text-sm font-medium text-[#2C3985] mb-2">
                  {t.filters.fundingType}
                </label>
                <select
                  value={selectedFunding}
                  onChange={(e) => setSelectedFunding(e.target.value as FundingType | "all")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#2C3985] focus:border-transparent"
                >
                  <option value="all">{t.filters.all}</option>
                  {Object.entries(t.fundingTypes).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                  ))}
                </select>
              </div>

              {/* Study Level Filter */}
              <div>
                <label className="block text-sm font-medium text-[#2C3985] mb-2">
                  {t.filters.studyLevel}
                </label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value as StudyLevel | "all")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#2C3985] focus:border-transparent"
                >
                  <option value="all">{t.filters.all}</option>
                  {Object.entries(t.studyLevels).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                  ))}
                </select>
              </div>

              {/* Field of Study Filter */}
              <div>
                <label className="block text-sm font-medium text-[#2C3985] mb-2">
                  {t.filters.fieldOfStudy}
                </label>
                <select
                  value={selectedField}
                  onChange={(e) => setSelectedField(e.target.value as FieldOfStudy | "all")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#2C3985] focus:border-transparent"
                >
                  <option value="all">{t.filters.all}</option>
                  {Object.entries(t.fieldTypes).filter(([key]) => key !== 'all-fields').map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                  ))}
                </select>
              </div>

              {/* Provider Type Filter */}
              <div>
                <label className="block text-sm font-medium text-[#2C3985] mb-2">
                  {t.filters.provider}
                </label>
                <select
                  value={selectedProvider}
                  onChange={(e) => setSelectedProvider(e.target.value as ScholarshipType | "all")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#2C3985] focus:border-transparent"
                >
                  <option value="all">{t.filters.all}</option>
                  {Object.entries(t.types).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results count */}
            <div className="mt-4 text-sm text-gray-600">
              {locale === 'th' 
                ? `พบ ${filteredScholarships.length} ทุนการศึกษา`
                : `Found ${filteredScholarships.length} scholarship${filteredScholarships.length !== 1 ? 's' : ''}`}
            </div>
          </div>

          {/* Scholarship Cards */}
          {filteredScholarships.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredScholarships.map((scholarship) => (
                <div 
                  key={scholarship.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow"
                >
                  {/* Card Header */}
                  <div className="bg-[#2C3985] text-[#FFFCDD] px-4 sm:px-6 py-4">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-base sm:text-lg leading-tight">
                        {scholarship.name}
                      </h3>
                      <span className={`${typeColors[scholarship.type].bg} ${typeColors[scholarship.type].text} text-xs px-2 py-1 rounded-full whitespace-nowrap`}>
                        {t.types[scholarship.type]}
                      </span>
                    </div>
                    <p className="text-[#FFFCDD]/80 text-sm mt-1">
                      {scholarship.provider}
                    </p>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 sm:p-6">
                    {/* Description */}
                    <p className="text-[#2C3985] text-sm mb-4">
                      {scholarship.description}
                    </p>

                    {/* Filter Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {scholarship.fundingType.map((type) => (
                        <span key={type} className="bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded-full">
                          {t.fundingTypes[type]}
                        </span>
                      ))}
                      {scholarship.studyLevel.filter(l => l !== 'graduate').slice(0, 2).map((level) => (
                        <span key={level} className="bg-purple-50 text-purple-600 text-xs px-2 py-0.5 rounded-full">
                          {t.studyLevels[level]}
                        </span>
                      ))}
                      {scholarship.fieldOfStudy.filter(f => f !== 'all-fields').map((field) => (
                        <span key={field} className="bg-amber-50 text-amber-600 text-xs px-2 py-0.5 rounded-full">
                          {t.fieldTypes[field]}
                        </span>
                      ))}
                    </div>

                    {/* Benefits */}
                    <div className="mb-4">
                      <h4 className="text-[#A51D2C] font-medium text-sm mb-2 flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {t.benefits}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {scholarship.benefits.map((benefit, idx) => (
                          <span key={idx} className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full">
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Deadline, Eligibility & Monthly Allowance */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-start gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-[#A51D2C] mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium text-[#2C3985]">
                            {t.deadline}:{" "}
                          </span>
                          <span className="text-gray-600">
                            {scholarship.deadline}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <Clock className="w-4 h-4 text-[#A51D2C] mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium text-[#2C3985]">
                            {t.eligibility}:{" "}
                          </span>
                          <span className="text-gray-600">
                            {scholarship.eligibility}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <Wallet className="w-4 h-4 text-[#A51D2C] mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium text-[#2C3985]">
                            {t.monthlyAllowance}:{" "}
                          </span>
                          <span className="text-green-600 font-medium">
                            {scholarship.monthlyAllowance}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Link Button */}
                    <a
                      href={scholarship.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#A51D2C] text-[#FFFCDD] rounded-full text-sm font-medium hover:bg-[#8B1824] transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {t.learnMore}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-2xl">
              <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
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

          {/* Disclaimer */}
          <div className="mt-10 p-6 bg-gray-50 rounded-2xl border border-gray-200">
            <h2 className="text-[#2C3985] text-lg sm:text-xl font-semibold mb-3">
              {t.disclaimer}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              {t.disclaimerText}
            </p>
          </div>

          {/* Contact CTA */}
          <div className="mt-8 text-center">
            <p className="text-[#2C3985] mb-4">
              {t.contactQuestion}
            </p>
            <a
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#2C3985] text-[#FFFCDD] rounded-full font-medium hover:bg-[#1F2A6B] transition-colors"
            >
              {t.contactUs}
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}