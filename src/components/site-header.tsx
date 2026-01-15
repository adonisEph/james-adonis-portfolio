"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { LanguageToggle, type Locale } from "@/components/language-toggle";
import { ThemeToggle } from "@/components/theme-toggle";

const navByLocale: Record<Locale, { label: string; href: string }[]> = {
  fr: [
    { label: "À propos", href: "#about" },
    { label: "Compétences", href: "#skills" },
    { label: "Projets", href: "#projects" },
    { label: "Expérience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ],
  en: [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ],
};

export function SiteHeader({
  name,
  role,
  locale,
  onLocaleChange,
}: {
  name: string;
  role: string;
  locale: Locale;
  onLocaleChange: (next: Locale) => void;
}) {
  const nav = navByLocale[locale];

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-3">
          <Link href="#top" className="font-semibold tracking-tight">
            {name}
          </Link>
          <span className="hidden text-sm text-muted-foreground sm:inline">
            {role}
          </span>
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Button key={item.href} variant="ghost" asChild>
              <a href={item.href}>{item.label}</a>
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle locale={locale} onChange={onLocaleChange} />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
