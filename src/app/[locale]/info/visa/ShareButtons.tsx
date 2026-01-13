"use client";

import { Facebook, Instagram, Link as LinkIcon } from "lucide-react";
import { FaXTwitter, FaLine } from "react-icons/fa6";

export default function ShareButtons({ locale }: { locale: "en" | "th" }) {
    return (
        <div className="flex justify-end items-center gap-4 text-sm text-blue-100">
            <span>
                {locale === "th" ? "แชร์บทความนี้" : "Share"}
            </span>
            <div className="flex gap-3">
                <button
                    onClick={() => {
                        const url = window.location.href;
                        window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`, '_blank');
                    }}
                    className="hover:text-white transition-colors"
                    aria-label="Share on LINE"
                >
                    <FaLine size={20} />
                </button>
                <button
                    onClick={() => {
                        const url = window.location.href;
                        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
                    }}
                    className="hover:text-white transition-colors"
                    aria-label="Share on Facebook"
                >
                    <Facebook size={20} />
                </button>
                <button
                    onClick={() => {
                        const url = window.location.href;
                        window.open(`https://www.instagram.com/`, '_blank');
                    }}
                    className="hover:text-white transition-colors"
                    aria-label="Share on Instagram"
                >
                    <Instagram size={20} />
                </button>
                <button
                    onClick={() => {
                        const url = window.location.href;
                        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`, '_blank');
                    }}
                    className="hover:text-white transition-colors"
                    aria-label="Share on X"
                >
                    <FaXTwitter size={20} />
                </button>
                <button
                    onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        alert(locale === "th" ? "คัดลอกลิงก์แล้ว!" : "Link copied!");
                    }}
                    className="hover:text-white transition-colors"
                    aria-label="Copy link"
                >
                    <LinkIcon size={20} />
                </button>
            </div>
        </div>
    );
}