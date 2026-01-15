"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";

type MobileMenuWrapperProps = {
  locale: string;
};

export default function MobileMenuWrapper({ locale }: MobileMenuWrapperProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Header Bar - Only visible below 1024px, hidden when menu is open */}
      <nav className={`flex lg:hidden bg-[#A51D2C] fixed rounded-[50px] py-2 px-4 top-4 left-1/2 -translate-x-1/2 shadow-[0_4px_6px_rgba(0,0,0,0.4)] h-[60px] w-[87%] max-w-[1240px] z-[100] items-center justify-between transition-opacity duration-300 ${mobileMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center">
          <img 
            src="/tsak.png" 
            alt="TSAK Logo" 
            className="w-[42px] h-auto rounded-full object-cover" 
          />
          <img 
            src="/TSAK_word.png" 
            alt="TSAK" 
            className="w-[100px] h-auto ml-2" 
          />
        </Link>

        {/* Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 text-[#FFFCDD] hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}