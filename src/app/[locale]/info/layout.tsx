import { ReactNode } from "react";
import "@/app/globals.css"
import type { Metadata } from "next";

export default function InfoLayout({ children }: { children: ReactNode }) {
  return (
    <section className="min-h-screen bg-background">
      {children}
    </section>
  );
}

export const metadata: Metadata = {
  title: "Info | TSAK",
  description: "Thai Student Association in the Republic of Korea Information",
};
