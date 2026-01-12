import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events - TSAK",
  description: "Thai Student Association in the Republic of Korea Events",
};

type EventsLayoutProps = {
  children: React.ReactNode;
};

export default function EventsLayout({
  children,
}: EventsLayoutProps) {
  return (
    <>
      {children}
    </>
  );
}
