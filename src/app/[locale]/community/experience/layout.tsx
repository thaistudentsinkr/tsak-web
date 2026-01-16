import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experiences | TSAK",
  description: "Thai Students Association in the Republic of Korea - Student Experiences",
};

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function ExperienceLayout({
  children,
  params,
}: LayoutProps) {
  const { locale } = await params;
  
  return (
    <>
      {children}
    </>
  );
}