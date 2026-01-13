import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About TSAK",
  description: "About Thai Students Association in the Republic of Korea",
};

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function AboutLayout({
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
