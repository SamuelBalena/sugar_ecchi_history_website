import type { ReactNode } from "react";
import { AgeGate } from "./AgeGate";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { FaqAccordion } from "./FaqAccordion";

interface SiteLayoutProps {
  children: ReactNode;
  faq?: "full" | "compact" | "none";
  showAgeGate?: boolean;
}

export function SiteLayout({ children, faq = "none", showAgeGate = true }: SiteLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {showAgeGate ? <AgeGate /> : null}
      <Navbar />
      <main className="flex-1">{children}</main>
      {faq !== "none" ? <FaqAccordion compact={faq === "compact"} /> : null}
      <Footer />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-8 pt-14">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h1 className="mt-2 text-4xl font-bold sm:text-5xl">{title}</h1>
      {subtitle ? <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{subtitle}</p> : null}
      <div className="gold-rule mt-6 w-full max-w-40" />
    </div>
  );
}
