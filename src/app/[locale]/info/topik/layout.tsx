import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TOPIK Exam Guide | TSAK",
  description: "Complete guide to TOPIK exam - Test of Proficiency in Korean. Compare IBT vs PBT, exam structure, scoring, and preparation tips.",
};

export default function TopikLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}