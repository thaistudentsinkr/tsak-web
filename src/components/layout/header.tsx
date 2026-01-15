"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

// Desktop dropdown components (hidden on mobile)
import AboutDropdown from "@/app/components/AboutDropDown";
import InformationDropdown from "@/app/components/InformationDropDown";
import CommunityDropdown from "@/app/components/CommunityDropDown";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";

const locales = ["th", "en"];

type HeaderProps = {
  onMenuOpen: () => void;
};

export default function Header({ onMenuOpen }: HeaderProps) {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "th";

  return (
    <header className="bg-[#A51D2C] sticky top-0 z-40">
      <div className="max-w-[1240px] mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo - Always visible */}
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <img
              src="/tsak.png"
              alt="TSAK Logo"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="text-[#FFFCDD] font-bold text-xl tracking-wide">
              TSAK
            </span>
          </Link>

          {/* ===== DESKTOP ONLY (≥1024px) ===== */}
          <nav className="hidden lg:flex items-center gap-1">
            <AboutDropdown />
            <InformationDropdown />
            <CommunityDropdown />
          </nav>

          <div className="hidden lg:block">
            <LanguageSwitcher locales={locales} />
          </div>

          {/* ===== MOBILE ONLY (<1024px) ===== */}
          <button
            onClick={onMenuOpen}
            className="lg:hidden p-2 text-[#FFFCDD] hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>

        </div>
      </div>
    </header>
  );
}