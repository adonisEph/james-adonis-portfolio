"use client";

import { Button } from "@/components/ui/button";

export type Locale = "fr" | "en";

export function LanguageToggle({
  locale,
  onChange,
}: {
  locale: Locale;
  onChange: (next: Locale) => void;
}) {
  return (
    <div className="flex items-center gap-1 rounded-md border p-1">
      <Button
        type="button"
        variant={locale === "fr" ? "default" : "ghost"}
        size="sm"
        onClick={() => onChange("fr")}
      >
        FR
      </Button>
      <Button
        type="button"
        variant={locale === "en" ? "default" : "ghost"}
        size="sm"
        onClick={() => onChange("en")}
      >
        EN
      </Button>
    </div>
  );
}
