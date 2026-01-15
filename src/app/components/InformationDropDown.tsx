"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

const infoTexts: Record<string, 
  { label: string; href: string}[]
> = {
  en: [
    { label: "About Visa", href: "/info/visa"},
    { label: "Basic Laws", href: "/info"},
    { label: "TOPIK exam", href: "/info"},
    { label: "Scholarships", href: "info"},
  ],
  th: [
    { label: "ข้อมูลวีซ่า", href: "/info/visa"},
    { label: "กฎหมายพื้นฐาน", href: "/info"},
    { label: "การสอบ TOPIK", href: "/info"},
    { label: "ทุนการศึกษา", href: "info"},
  ],
};

const infoLabel: Record<string, string> = {
  en: "Information",
  th: "ข้อมูลสำคัญ",
};

export default function InformationDropdown() {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "th";
  const [open, setOpen] = useState(false);

  const items = infoTexts[locale] || infoTexts.th;
  const label = infoLabel[locale] || infoLabel.th;

  return (
    <div 
      className="relative inline-block text-left"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="flex items-center justify-between px-4 py-2 text-[#FFFCDD] space-x-2"
      >
        <span>{label}</span>
        <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute left-1/2 -translate-x-1/2 pt-4 w-48">
          {/* This wrapper includes the gap area so mouse doesn't trigger leave */}
          <div
            className="py-2 rounded-2xl shadow-lg bg-[#FFFCDD] text-[#2C3985] z-50"
          >
            <div className="py-1 px-3 space-y-1">
              {items.map((item, idx) => (
                <Link
                  key={idx}
                  href={`/${locale}${item.href}`}
                  className="px-4 py-2 text-[#2C3985] block w-full text-center text-sm rounded-full border border-transparent hover:bg-[#A51D2C]/10 hover:text-[#A51D2C] hover:border-[#A51D2C]/50"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}