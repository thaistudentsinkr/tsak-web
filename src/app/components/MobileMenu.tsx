"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { X, ChevronDown } from "lucide-react";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

const locales = ["th", "en"];

const languageNames: Record<string, string> = {
  en: "EN",
  th: "TH",
};

const menuStructure: Record<
  string,
  {
    label: string;
    items: { label: string; href: string }[];
  }[]
> = {
  en: [
    {
      label: "About TSAK",
      items: [
        { label: "About TSAK", href: "/about" },
        { label: "Executive Members", href: "/members" },
        { label: "Sponsorships", href: "/sponsors" },
        { label: "Regulations", href: "/about/regulations" },
        { label: "Contact Us", href: "/contact" },
      ],
    },
    {
      label: "Information",
      items: [
        { label: "About Visa", href: "/info/visa" },
        { label: "Basic Laws", href: "/info/koreanlaws" },
        { label: "TOPIK Exam", href: "/info/topik" },
        { label: "Scholarships", href: "/info/scholarships" },
      ],
    },
    {
      label: "Community",
      items: [
        { label: "Announcement", href: "/community/announcement" },
        { label: "Experiences", href: "/community/experience" },
        { label: "Events", href: "/events" },
      ],
    },
  ],
  th: [
    {
      label: "เกี่ยวกับเรา",
      items: [
        { label: "ที่มาของสมาคม", href: "/about" },
        { label: "คณะกรรมการบริหาร", href: "/members" },
        { label: "ผู้สนับสนุนสมาคม", href: "/sponsors" },
        { label: "ข้อบังคับสมาคม", href: "/about/regulations" },
        { label: "ติดต่อเรา", href: "/contact" },
      ],
    },
    {
      label: "ข้อมูลสำคัญ",
      items: [
        { label: "ข้อมูลวีซ่า", href: "/info/visa" },
        { label: "กฎหมายพื้นฐาน", href: "/info" },
        { label: "การสอบ TOPIK", href: "/info" },
        { label: "ทุนการศึกษา", href: "/info/scholarships" },
      ],
    },
    {
      label: "ชุมชน",
      items: [
        { label: "ประกาศ", href: "/community/announcement" },
        { label: "เล่าประสบการณ์", href: "/community/experience" },
        { label: "กิจกรรม", href: "/events" },
      ],
    },
  ],
};

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const router = useRouter();
  const locale = pathname.split("/")[1] || "th";
  const [openSections, setOpenSections] = useState<number[]>([]);

  const menu = menuStructure[locale] || menuStructure.th;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleSection = (index: number) => {
    setOpenSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const switchLanguage = (newLocale: string) => {
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "") || "/";
    router.replace(`/${newLocale}${pathWithoutLocale}`);
  };

  const handleLinkClick = () => {
    onClose();
    setOpenSections([]);
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        isOpen ? "visible" : "invisible"
      }`}
    >
      <div
        className={`absolute inset-0 bg-white flex flex-col transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Red Header Bar */}
        <div className="bg-[#A51D2C] px-4 py-3 flex items-center justify-between shrink-0">
          {/* Language Switcher */}
          <div className="flex items-center gap-1">
            {locales.map((loc, idx) => (
              <span key={loc} className="flex items-center">
                <button
                  onClick={() => switchLanguage(loc)}
                  className={`text-sm font-semibold px-1.5 py-0.5 transition-all ${
                    locale === loc
                      ? "text-[#FFFCDD]"
                      : "text-[#FFFCDD]/50 hover:text-[#FFFCDD]"
                  }`}
                >
                  {languageNames[loc]}
                </button>
                {idx < locales.length - 1 && (
                  <span className="text-[#FFFCDD]/40 mx-0.5">|</span>
                )}
              </span>
            ))}
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="text-[#FFFCDD] p-1.5 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="px-5 py-4 border-b border-gray-100 shrink-0">
          <Link
            href={`/${locale}`}
            onClick={handleLinkClick}
            className="flex items-center gap-3"
          >
            <img
              src="/tsak.png"
              alt="TSAK Logo"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="text-[#A51D2C] font-bold text-xl tracking-wide">
              TSAK
            </span>
          </Link>
        </div>

        {/* Scrollable Menu Content */}
        <div className="flex-1 overflow-y-auto">
          <nav>
            {menu.map((section, idx) => (
              <div key={idx} className="border-b border-gray-100">
                {/* Accordion Header */}
                <button
                  onClick={() => toggleSection(idx)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left active:bg-gray-50 transition-colors"
                >
                  <span className="text-gray-800 font-medium text-base">
                    {section.label}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                      openSections.includes(idx) ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Accordion Content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openSections.includes(idx) ? "max-h-[500px]" : "max-h-0"
                  }`}
                >
                  <div className="pb-3 px-5">
                    {section.items.map((item, itemIdx) => (
                      <Link
                        key={itemIdx}
                        href={`/${locale}${item.href}`}
                        onClick={handleLinkClick}
                        className="block py-2.5 pl-4 text-gray-500 text-sm hover:text-[#A51D2C] active:text-[#A51D2C] transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}