import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience Detail | TSAK",
  description: "Thai Students Association in the Republic of Korea - Student Experience",
};

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string; id: string }>;
};

export default async function ExperienceDetailLayout({
  children,
  params,
}: LayoutProps) {
  return (
    <>
      {children}
    </>
  );
}