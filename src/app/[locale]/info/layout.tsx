import { ReactNode } from "react";
import "@/app/globals.css"

export default function InfoLayout({ children }: { children: ReactNode }) {
  return (
    <section className="min-h-screen bg-background">
      {children}
    </section>
  );
}
