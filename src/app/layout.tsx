import ScrollToTop from "@/components/ScollToTop";
import type { Metadata } from "next";
import { Bai_Jamjuree } from "next/font/google";
import "./globals.css";

const baiJamjuree = Bai_Jamjuree({
  subsets: ["thai", "latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-bai-jamjuree",
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
        className={`${baiJamjuree.variable} ${baiJamjuree.className} antialiased`}
      >
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}