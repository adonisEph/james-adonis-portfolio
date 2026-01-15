import type { LucideIcon } from "lucide-react";
import {
  Atom,
  Braces,
  Cable,
  Database,
  FileSpreadsheet,
  Layers,
  Palette,
  Server,
  Wrench,
  Zap,
} from "lucide-react";

export type TechMeta = {
  Icon?: LucideIcon;
  iconClassName?: string;
  badgeClassName?: string;
};

function normalizeTechLabel(label: string): string {
  return label
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[./()→–—_-]/g, "")
    .replace(/é/g, "e")
    .replace(/è/g, "e")
    .replace(/ê/g, "e")
    .replace(/à/g, "a")
    .replace(/ç/g, "c");
}

const TECH: Record<string, TechMeta> = {
  javascript: {
    Icon: Braces,
    iconClassName: "text-yellow-500",
    badgeClassName: "border-yellow-500/25 bg-yellow-500/10",
  },
  uiuxdesign: {
    Icon: Palette,
    iconClassName: "text-pink-500",
    badgeClassName: "border-pink-500/25 bg-pink-500/10",
  },
  typescript: {
    Icon: Braces,
    iconClassName: "text-blue-500",
    badgeClassName: "border-blue-500/25 bg-blue-500/10",
  },
  react: {
    Icon: Atom,
    iconClassName: "text-cyan-500",
    badgeClassName: "border-cyan-500/25 bg-cyan-500/10",
  },
  nextjs: {
    Icon: Layers,
    iconClassName: "text-foreground/80",
    badgeClassName: "border-foreground/15 bg-foreground/5",
  },
  nodejs: {
    Icon: Server,
    iconClassName: "text-green-500",
    badgeClassName: "border-green-500/25 bg-green-500/10",
  },
  postgresql: {
    Icon: Database,
    iconClassName: "text-indigo-500",
    badgeClassName: "border-indigo-500/25 bg-indigo-500/10",
  },
  tailwindcss: {
    Icon: Palette,
    iconClassName: "text-sky-500",
    badgeClassName: "border-sky-500/25 bg-sky-500/10",
  },
  vite: {
    Icon: Zap,
    iconClassName: "text-purple-500",
    badgeClassName: "border-purple-500/25 bg-purple-500/10",
  },
  apirest: {
    Icon: Cable,
    iconClassName: "text-violet-500",
    badgeClassName: "border-violet-500/25 bg-violet-500/10",
  },
  restapis: {
    Icon: Cable,
    iconClassName: "text-violet-500",
    badgeClassName: "border-violet-500/25 bg-violet-500/10",
  },
  automatisationexcelweb: {
    Icon: FileSpreadsheet,
    iconClassName: "text-emerald-500",
    badgeClassName: "border-emerald-500/25 bg-emerald-500/10",
  },
  automatisation: {
    Icon: Wrench,
    iconClassName: "text-emerald-500",
    badgeClassName: "border-emerald-500/25 bg-emerald-500/10",
  },
  process: {
    Icon: Wrench,
    iconClassName: "text-emerald-500",
    badgeClassName: "border-emerald-500/25 bg-emerald-500/10",
  },
  outilsmetiers: {
    Icon: Wrench,
    iconClassName: "text-emerald-500",
    badgeClassName: "border-emerald-500/25 bg-emerald-500/10",
  },
  businesstools: {
    Icon: Wrench,
    iconClassName: "text-emerald-500",
    badgeClassName: "border-emerald-500/25 bg-emerald-500/10",
  },
};

export function getTechMeta(label: string): TechMeta {
  const key = normalizeTechLabel(label);
  return TECH[key] ?? {};
}
