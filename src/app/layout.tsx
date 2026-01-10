import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Onest } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";
import "./navbar.css"
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import LanguageSwitcher from "./components/LanguageSwitcher";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const onest = Onest({
  variable: "--font-onest", 
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter", 
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TSAK homepage",
  description: "Thai Student Association in the Republic of Korea",
  icons: { 
    icon: "/tsak.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="navbar">
          <Link href="/th" className="flex items-center">
            <img src="/tsak.png" alt="tsak.png" className="home_icon" />
            <img src="/TSAK_word.png" alt="TSAK_word.png" className="w-[135px] h-[41px]" />
          </Link>
          <ul className="flex text-[#FFFCDD] space-x-7 ml-auto mr-1 items-center">
            <ul className="font-onest text-base font-normal flex space-x-10">
              <li>
                <button className="flex space-x-2"> 
                  <span>Information</span>
                  <ChevronDown className="w-4 h-4 mt-1" />
                </button>
              </li>
              <li>
                <button className="flex space-x-2">
                  <span>About TSAK</span>
                  <ChevronDown className="w-4 h-4 mt-1" />
                </button>
              </li>
              <li>
                <button className="flex space-x-2">
                  <span>Community</span>
                  <ChevronDown className="w-4 h-4 mt-1" />
                </button>
              </li>
            </ul>
            <li>
              <LanguageSwitcher locales={['en', 'th']}/>
            </li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}
