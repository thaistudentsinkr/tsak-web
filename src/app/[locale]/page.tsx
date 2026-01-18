"use client";

import React from "react";
import { getDictionary } from "@/lib/i18n";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { ArrowRight, Users, MessageCircle, ChevronDown, X, GraduationCap, BookOpen, Repeat, FlaskConical } from "lucide-react";

type PageProps = {
  params: Promise<{ locale: string }>;
};

function EligibilityModal({ 
  isOpen, 
  onClose, 
  locale 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  locale: string;
}) {
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

  if (!isOpen) return null;

  const dict = getDictionary(locale);
  const regEligi = dict.memberRegister.eligibility;
  const eligibilityItems =[
    {
      icon: GraduationCap,
      title: regEligi.degreeProgram.title,
      description: regEligi.degreeProgram.description,
    },
    {
      icon: BookOpen,
      title: regEligi.koreanLanguageProgram.title,
      description: regEligi.koreanLanguageProgram.description,
    },
    {
      icon: Repeat,
      title:regEligi.shortTermExchange.title,
      description: regEligi.shortTermExchange.description,
    },
    {
      icon: FlaskConical,
      title: regEligi.researchAffiliation.title,
      description: regEligi.researchAffiliation.description,
    },
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-white/50 backdrop-blur-sm" />
      
      {/* Modal */}
      <div 
        className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#2C3985] text-white px-6 py-4 rounded-t-2xl flex items-center justify-between">
          <h2 className="text-xl font-bold">
            {locale === "th" ? "ใครสมัครเป็นสมาชิกได้บ้าง?" : "Who is Eligible?"}
          </h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-gray-600 text-sm mb-6">
            {locale === "th" 
              ? "นักศึกษาไทยในประเภทต่อไปนี้สามารถสมัครเป็นสมาชิก TSAK ได้:" 
              : "Thai students in the following categories are eligible to register as TSAK members:"}
          </p>
          
          {eligibilityItems.map((item, index) => (
            <div 
              key={index}
              className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-[#2C3985]/5 transition-colors"
            >
              <div className="w-12 h-12 bg-[#2C3985]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <item.icon className="w-6 h-6 text-[#2C3985]" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 px-6 py-4 rounded-b-2xl border-t">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSeLfm1mNQszliNc_NgpCIP0rrwbZSygyX0gYo3SZWaOcl5fDw/viewform?usp=preview"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center px-6 py-3 bg-[#2C3985] text-white rounded-full font-semibold hover:bg-[#1e2a5e] transition-colors"
          >
            {locale === "th" ? "สมัครเลย" : "Register Now"}
          </a>
        </div>
      </div>
    </div>
  );
}

function TypingAnimation({ text, speed = 50 }: { text: string; speed?: number }) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
    }
  }, [currentIndex, text, speed]);

  return (
    <span>
      {displayedText}
      {!isComplete && <span className="animate-pulse">|</span>}
    </span>
  );
}

function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

function AnimatedSection({ 
  children, 
  className = "",
  delay = 0 
}: { 
  children: React.ReactNode; 
  className?: string;
  delay?: number;
}) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
      }}
    >
      {children}
    </div>
  );
}

export default function Home({ params }: PageProps) {
  const { locale } = React.use(params);
  const dict = getDictionary(locale);
  const [scrollY, setScrollY] = useState(0);
  const [isEligibilityOpen, setIsEligibilityOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="font-sans min-h-screen flex flex-col bg-white">
      {/* Eligibility Modal */}
      <EligibilityModal 
        isOpen={isEligibilityOpen} 
        onClose={() => setIsEligibilityOpen(false)} 
        locale={locale} 
      />
      {/* Hero Section - Full Screen with Image and Intro */}
      <section className="relative h-screen min-h-[700px] flex flex-col">
        {/* Hero Image with Parallax */}
        <div className="relative h-[70%] overflow-hidden">
          <Image
            src="/fall_2025_group_photo.jpg"
            alt="TSAK Group Photo"
            fill
            className="object-cover object-center"
            style={{
              transform: `translateY(${scrollY * 0.2}px)`,
              objectPosition: "center 60%",
            }}
            priority
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
        </div>

        {/* Introduction */}
        <div className="flex-1 flex items-start justify-center px-6 pt-8 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2C3985] mb-8 leading-tight">
              <TypingAnimation
                text={(dict as any)["home.introduction"] || "Welcome to Thai Students Association in Korea"}
                speed={40}
              />
            </h1>

            {/* Register Button */}
            <div className="flex justify-center">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSeLfm1mNQszliNc_NgpCIP0rrwbZSygyX0gYo3SZWaOcl5fDw/viewform?usp=preview"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-[#2C3985] text-[#fffdc0] rounded-full font-semibold text-lg hover:bg-[#1e2a5e] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <Users className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                {locale === "th" ? "สมัครเป็นสมาชิก TSAK" : "Register as TSAK Member"}
              </a>
            </div>

            {/* Eligibility Link */}
            <button
              onClick={() => setIsEligibilityOpen(true)}
              className="mt-4 text-sm text-[#2C3985] hover:text-[#1e2a5e] underline underline-offset-2 transition-colors"
            >
              {locale === "th" ? "ใครสมัครได้บ้าง?" : "Who is eligible for registration?"}
            </button>

            {/* Scroll indicator */}
            <div className="mt-8 animate-bounce">
              <ChevronDown className="w-6 h-6 text-gray-400 mx-auto" />
            </div>
          </div>
        </div>
      </section>

      <section className="relative min-h-[60vh] flex items-center justify-center py-20 bg-transparent">
        {/* Background ellipse - using #FEF08A */}
        <div
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[400px] pointer-events-none"
          style={{
            background: "#FEF08A",
            borderRadius: "50%",
            filter: "blur(150px)",
            opacity: 0.5,
          }}
        />
        <AnimatedSection className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-8 px-6 max-w-6xl w-full mx-auto">
            {/* Left logo */}
            <div className="hidden md:flex w-[190px] h-[60px] rounded-[100%/100%] justify-center items-center text-center border border-[#2C3985] text-[12px] text-[#2C3985] font-[400]">
              Thai Students Association<br />
              in the Republic of Korea
            </div>

            {/* Center text */}
            <div className="text-center space-y-4 max-w-xl">
              <div className="text-base md:text-lg leading-relaxed text-gray-700">
                {dict.hero.maintext.split("\n").map((line, i) => (
                  <p key={i} className="mb-2">{line}</p>
                ))}
              </div>
            </div>

            {/* Right logo */}
            <div className="hidden md:flex w-[190px] h-[60px] rounded-[100%/100%] justify-center items-center text-center border border-[#2C3985] text-[12px] text-[#2C3985] font-[400]">
              Thai Students Association<br />
              in the Republic of Korea
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Divider */}
      <div className="w-full flex justify-center py-8">
        <div className="w-24 h-1 bg-gradient-to-r from-[#2C3985] via-[#A51D2C] to-[#2C3985] rounded-full" />
      </div>

      {/* Navigation Cards Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Know About TSAK Card */}
            <AnimatedSection delay={0}>
              <Link
                href={`/${locale}/about`}
                className="group block bg-white border border-gray-200 rounded-2xl p-8 hover:border-[#2C3985] hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="w-14 h-14 bg-[#2C3985]/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#2C3985] group-hover:scale-110 transition-all duration-300">
                  <Users className="w-7 h-7 text-[#2C3985] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#2C3985] transition-colors">
                  {locale === "th" ? "รู้จัก TSAK" : "Know About TSAK"}
                </h3>
                <p className="text-gray-500 text-sm mb-5 leading-relaxed">
                  {locale === "th"
                    ? "เรียนรู้เพิ่มเติมเกี่ยวกับสมาคมนักเรียนไทยในเกาหลี"
                    : "Learn more about TSAK"}
                </p>
                <div className="flex items-center gap-2 text-[#2C3985] text-sm font-semibold">
                  <span>{locale === "th" ? "อ่านเพิ่มเติม" : "Learn More"}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </Link>
            </AnimatedSection>

            {/* Connect with TSAK Card */}
            <AnimatedSection delay={150}>
              <Link
                href={`/${locale}/contact`}
                className="group block bg-white border border-gray-200 rounded-2xl p-8 hover:border-[#A51D2C] hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="w-14 h-14 bg-[#A51D2C]/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#A51D2C] group-hover:scale-110 transition-all duration-300">
                  <MessageCircle className="w-7 h-7 text-[#A51D2C] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#A51D2C] transition-colors">
                  {locale === "th" ? "ติดต่อ TSAK" : "Connect with TSAK"}
                </h3>
                <p className="text-gray-500 text-sm mb-5 leading-relaxed">
                  {locale === "th"
                    ? "ติดต่อเราผ่านช่องทางต่าง ๆ ของ TSAK"
                    : "Reach out to us or join our activities"}
                </p>
                <div className="flex items-center gap-2 text-[#A51D2C] text-sm font-semibold">
                  <span>{locale === "th" ? "ติดต่อเรา" : "Contact Us"}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Bottom spacing */}
      <div className="h-16" />
    </div>
  );
}