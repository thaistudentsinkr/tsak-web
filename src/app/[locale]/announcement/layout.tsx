import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Announcements | TSAK",
  description: "Announcements from Thai Students Association in Korea",
};

export default function AnnouncementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}