"use client";

import { useEffect, useState, useRef } from "react";
import { Globe, Landmark, Users, AlertTriangle, Facebook, Twitter, Link2 } from "lucide-react";
import visaTh from "@/locales/info/visa/th.json";
import visaEn from "@/locales/info/visa/en.json";

const LineIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.349 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
  </svg>
);

type Locale = "en" | "th";

type SectionKey =
  | "studentVisa"
  | "relatedVisa"
  | "arc"
  | "partTimeWork"
  | "warnings"
  | "contact";

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

const visaData = {
  th: visaTh,
  en: visaEn,
};

export default function VisaPage({ params }: PageProps) {
  const [locale, setLocale] = useState<Locale>("th");
  const [activeSection, setActiveSection] = useState<SectionKey>("studentVisa");
  const [copied, setCopied] = useState(false);
  const sectionRefs = useRef<Record<SectionKey, HTMLElement | null>>({
    studentVisa: null,
    relatedVisa: null,
    arc: null,
    partTimeWork: null,
    warnings: null,
    contact: null,
  });

  useEffect(() => {
    params.then(({ locale }) => setLocale(locale));
  }, [params]);

  const content = visaData[locale] || visaData.th;

  // Share functions
  const getShareUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.href;
    }
    return "";
  };

  const getShareTitle = () => content.meta.title;

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getShareUrl())}`;
    window.open(url, "_blank", "width=600,height=400");
  };

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(getShareUrl())}&text=${encodeURIComponent(getShareTitle())}`;
    window.open(url, "_blank", "width=600,height=400");
  };

  const shareToLine = () => {
    const url = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(getShareUrl())}`;
    window.open(url, "_blank", "width=600,height=400");
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(getShareUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const sections: { key: SectionKey; label: string }[] = [
    { key: "studentVisa", label: content.navigation.studentVisa },
    { key: "relatedVisa", label: content.navigation.relatedVisa },
    { key: "arc", label: content.navigation.arc },
    { key: "partTimeWork", label: content.navigation.partTimeWork },
    { key: "warnings", label: content.navigation.warnings },
    { key: "contact", label: content.navigation.contact },
  ];

  const scrollToSection = (key: SectionKey) => {
    const element = sectionRefs.current[key];
    if (element) {
      const navHeight = 140; // Main navbar (76px) + red nav (~56px) + padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(key);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180; // Account for both navbars

      for (const section of sections) {
        const element = sectionRefs.current[section.key];
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section.key);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  return (
    <div className="min-h-screen bg-white">
      {/* Blue Header */}
      <header className="bg-[#2C3985] text-white pt-32 pb-16 shadow-md">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {content.meta.title}
          </h1>
          <p className="text-blue-200 text-sm mb-4">{content.meta.subtitle}</p>

          {/* Social Share Icons */}
          <div className="flex items-center gap-3 mt-4">
            <span className="text-sm text-blue-200">
              {content.ui.shareArticle}
            </span>
            <div className="flex gap-2">
              <button
                onClick={shareToFacebook}
                className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                aria-label="Share on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </button>
              <button
                onClick={shareToTwitter}
                className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                aria-label="Share on Twitter"
              >
                <Twitter className="w-4 h-4" />
              </button>
              <button
                onClick={shareToLine}
                className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                aria-label="Share on Line"
              >
                <LineIcon className="w-4 h-4" />
              </button>
              <button
                onClick={copyLink}
                className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors relative"
                aria-label="Copy link"
              >
                <Link2 className="w-4 h-4" />
                {copied && (
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs bg-black/80 text-white px-2 py-1 rounded whitespace-nowrap">
                    {locale === "th" ? "คัดลอกแล้ว!" : "Copied!"}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Red Navigation Tabs - Sticky below main navbar */}
      <nav className="bg-[#A51D2C] sticky top-[76px] z-40 shadow-md">
        <div className="max-w-5xl mx-auto">
          <div className="flex overflow-x-auto scrollbar-hide">
            {sections.map((section) => (
              <button
                key={section.key}
                onClick={() => scrollToSection(section.key)}
                className={`
                  flex-shrink-0 px-4 py-4 text-sm font-medium transition-all duration-200
                  whitespace-nowrap
                  ${
                    activeSection === section.key
                      ? "text-white border-b-2 border-white bg-white/10"
                      : "text-white/70 border-b-2 border-transparent hover:text-white hover:bg-white/5"
                  }
                `}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-8 px-6">
        {/* Description */}
        <div className="rounded-xl p-6 mb-8">
          <p className="text-gray-700 leading-relaxed">
            {content.meta.description}
          </p>
        </div>

        {/* Section 1: Student Visas */}
        <section
          ref={(el) => {
            sectionRefs.current.studentVisa = el;
          }}
          className="mb-12 scroll-mt-36"
        >
          <h2 className="text-2xl font-bold text-[#2C3985] mb-6">
            {content.sections.studentVisa.title}
          </h2>

          {/* D-2 Visa */}
          <div className="bg-white rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#2C3985] rounded-full"></span>
              {content.sections.studentVisa.d2.title}
            </h3>

            <div className="space-y-5">
              {/* Suitable For */}
              <div>
                <h4 className="font-medium text-gray-700 mb-2">
                  {content.sections.studentVisa.d2.suitableFor.label}
                </h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  {content.sections.studentVisa.d2.suitableFor.items.map(
                    (item, idx) => (
                      <li key={idx}>{item}</li>
                    )
                  )}
                </ul>
              </div>

              {/* Subcategories */}
              <div>
                <h4 className="font-medium text-gray-700 mb-2">
                  {content.sections.studentVisa.d2.subcategories.label}
                </h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  {content.sections.studentVisa.d2.subcategories.items.map(
                    (item, idx) => (
                      <li key={idx}>{item}</li>
                    )
                  )}
                </ul>
              </div>

              {/* Documents */}
              <div>
                <h4 className="font-medium text-gray-700 mb-2">
                  {content.sections.studentVisa.d2.documents.label}
                </h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  {content.sections.studentVisa.d2.documents.items.map(
                    (item, idx) => (
                      <li key={idx}>{item}</li>
                    )
                  )}
                </ul>
              </div>

              {/* Costs */}
              <div>
                <h4 className="font-medium text-gray-700 mb-2">
                  {content.sections.studentVisa.d2.costs.label}
                </h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  {content.sections.studentVisa.d2.costs.items.map(
                    (item, idx) => (
                      <li key={idx}>{item}</li>
                    )
                  )}
                </ul>
              </div>

              {/* Benefits */}
              <div>
                <h4 className="font-medium text-gray-700 mb-2">
                  {content.sections.studentVisa.d2.benefits.label}
                </h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  {content.sections.studentVisa.d2.benefits.items.map(
                    (item, idx) => (
                      <li key={idx}>{item}</li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* D-4 Visa */}
          <div className="bg-white rounded-xl p-6 ">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#2C3985] rounded-full"></span>
              {content.sections.studentVisa.d4.title}
            </h3>

            <div className="space-y-5">
              {/* Suitable For */}
              <div>
                <h4 className="font-medium text-gray-700 mb-2">
                  {content.sections.studentVisa.d4.suitableFor.label}
                </h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  {content.sections.studentVisa.d4.suitableFor.items.map(
                    (item, idx) => (
                      <li key={idx}>{item}</li>
                    )
                  )}
                </ul>
              </div>

              {/* Subcategories */}
              <div>
                <h4 className="font-medium text-gray-700 mb-2">
                  {content.sections.studentVisa.d4.subcategories.label}
                </h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  {content.sections.studentVisa.d4.subcategories.items.map(
                    (item, idx) => (
                      <li key={idx}>{item}</li>
                    )
                  )}
                </ul>
              </div>

              {/* Documents */}
              <div>
                <h4 className="font-medium text-gray-700 mb-2">
                  {content.sections.studentVisa.d4.documents.label}
                </h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  {content.sections.studentVisa.d4.documents.items.map(
                    (item, idx) => (
                      <li key={idx}>{item}</li>
                    )
                  )}
                </ul>
              </div>

              {/* Costs */}
              <div>
                <h4 className="font-medium text-gray-700 mb-2">
                  {content.sections.studentVisa.d4.costs.label}
                </h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  {content.sections.studentVisa.d4.costs.items.map(
                    (item, idx) => (
                      <li key={idx}>{item}</li>
                    )
                  )}
                </ul>
              </div>

              {/* Notes */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 mb-2">
                  {content.sections.studentVisa.d4.notes.label}
                </h4>
                <ul className="list-disc list-inside text-yellow-700 space-y-1 ml-4">
                  {content.sections.studentVisa.d4.notes.items.map(
                    (item, idx) => (
                      <li key={idx}>{item}</li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Related Visas */}
        <section
          ref={(el) => {
            sectionRefs.current.relatedVisa = el;
          }}
          className="mb-12 scroll-mt-36"
        >
          <h2 className="text-2xl font-bold text-[#2C3985] mb-6">
            {content.sections.relatedVisa.title}
          </h2>

          {/* D-10 Visa */}
          <div className="bg-white rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#A51D2C] rounded-full"></span>
              {content.sections.relatedVisa.d10.title}
            </h3>

            <p className="text-gray-600 mb-4">
              {content.sections.relatedVisa.d10.suitableFor}
            </p>

            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
              {content.sections.relatedVisa.d10.details.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          {/* E-7 Visa */}
          <div className="bg-white rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#A51D2C] rounded-full"></span>
              {content.sections.relatedVisa.e7.title}
            </h3>

            <p className="text-gray-600 mb-4">
              {content.sections.relatedVisa.e7.suitableFor}
            </p>

            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
              {content.sections.relatedVisa.e7.details.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Section 3: ARC */}
        <section
          ref={(el) => {
            sectionRefs.current.arc = el;
          }}
          className="mb-12 scroll-mt-36"
        >
          <h2 className="text-2xl font-bold text-[#2C3985] mb-6">
            {content.sections.arc.title}
          </h2>

          <div className="bg-white rounded-xl p-6 ">
            <p className="text-gray-600 mb-4">
              {content.sections.arc.description}
            </p>

            <div>
              <h4 className="font-medium text-gray-700 mb-2">
                {content.sections.arc.documents.label}
              </h4>
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                {content.sections.arc.documents.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: Part-time Work */}
        <section
          ref={(el) => {
            sectionRefs.current.partTimeWork = el;
          }}
          className="mb-12 scroll-mt-36"
        >
          <h2 className="text-2xl font-bold text-[#2C3985] mb-6">
            {content.sections.partTimeWork.title}
          </h2>

          <div className="bg-white rounded-xl p-6 ">
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              {content.sections.partTimeWork.requirements.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Section 5: Warnings */}
        <section
          ref={(el) => {
            sectionRefs.current.warnings = el;
          }}
          className="mb-12 scroll-mt-36"
        >
          <h2 className="text-2xl font-bold text-[#2C3985] mb-6">
            {content.sections.warnings.title}
          </h2>

          <div className="rounded-xl p-6">
            <ul className="space-y-3">
              {content.sections.warnings.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Section 6: Contact */}
        <section
          ref={(el) => {
            sectionRefs.current.contact = el;
          }}
          className="mb-12 scroll-mt-36"
        >
          <h2 className="text-2xl font-bold text-[#2C3985] mb-6">
            {content.sections.contact.title}
          </h2>

          <div className="bg-white rounded-xl p-6 ">
            <ul className="space-y-3 text-gray-600">
              {content.sections.contact.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="mt-0.5 flex-shrink-0">
                    {idx === 0 && <Globe className="w-5 h-5 text-[#2C3985]" />}
                    {idx === 1 && <Landmark className="w-5 h-5 text-[#2C3985]" />}
                    {idx === 2 && <Users className="w-5 h-5 text-[#2C3985]" />}
                  </span>
                  <span>
                    {item.name}
                    {item.link && (
                      <>
                        :{" "}
                        <a
                          href={`https://${item.link}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#2C3985] hover:underline"
                        >
                          {item.link}
                        </a>
                      </>
                    )}
                    {item.extra && <span> {item.extra}</span>}
                  </span>
                </li>
              ))}
            </ul>

            {/* Disclaimer */}
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <span className="font-medium">
                  {content.sections.contact.disclaimer.label}:
                </span>{" "}
                {content.sections.contact.disclaimer.text}
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}