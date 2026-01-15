"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  if (theme === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
}

export function ThemeToggle() {
  const [theme, setTheme] = React.useState<Theme>("light");

  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem("theme");
      if (stored === "dark" || stored === "light") {
        setTheme(stored);
        applyTheme(stored);
        return;
      }

      const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")
        .matches;
      const initial: Theme = prefersDark ? "dark" : "light";
      setTheme(initial);
      applyTheme(initial);
    } catch {
      applyTheme("light");
    }
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);

    try {
      window.localStorage.setItem("theme", next);
    } catch {}
  }

  const Icon = theme === "dark" ? Sun : Moon;
  const label = theme === "dark" ? "Passer en thème clair" : "Passer en thème sombre";

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      aria-label={label}
      onClick={toggle}
    >
      <Icon className="size-4" />
    </Button>
  );
}
