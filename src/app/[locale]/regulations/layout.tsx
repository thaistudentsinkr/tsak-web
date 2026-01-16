import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regulations | TSAK",
  description: "Thai Students Association in the Republic of Korea - Regulations",
};

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RegulationsLayout({
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