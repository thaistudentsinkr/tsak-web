"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { FaGlobe } from "react-icons/fa";

type LanguageSwitcherProps = {
  locales: string[];
};

const languageNames: Record<string, string> = {
  en: "English",
  th: "ไทย"
};

export default function LanguageSwitcher({ locales }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // Track if component is mounted
  const [currentLocale, setCurrentLocale] = useState("en"); // default
  const router = useRouter();
  const pathname = usePathname();

  // Only run on client after mount
  useEffect(() => {
    setMounted(true);
    const localeFromPath = pathname.split("/")[1] || "en";
    setCurrentLocale(localeFromPath);
  }, [pathname]);

  if (!mounted) return null; // prevent rendering on server

  const currentLanguage = languageNames[currentLocale] || "English";


  const switchLanguage = (locale: string) => {
    // Remove current locale from pathname if it exists
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/';
    // Navigate to new url path, i.e. /en or /th
    router.replace(`/${locale}${pathWithoutLocale}`);
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="langCh_button flex items-center space-x-1"
      >
        <FaGlobe className="w-5 h-5 text-[#FFFCDD] bg-[#A51D2C] rounded-full p-[1px]"/>
        <span className="font-inter font-medium text-base ml-1">{currentLanguage}</span>
        <ChevronDown className="w-4 h-4"/>
      </button>

      {open && (
        <div className="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            {locales.map((locale) => (
              <button
                key={locale}
                onClick={() => switchLanguage(locale)}
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                  locale === currentLocale ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                }`}
              >
                {languageNames[locale]}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
