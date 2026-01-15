"use client";

import * as React from "react";
import Image from "next/image";
import { ExternalLink, X } from "lucide-react";

import { getTechMeta } from "@/lib/tech";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { PortfolioProject } from "@/content/portfolio";

function PhoneFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-9/16 overflow-hidden rounded-3xl border bg-card shadow-lg">
      <div className="absolute inset-2 rounded-[1.8rem] border bg-black" />
      <div className="absolute left-1/2 top-2 h-5 w-24 -translate-x-1/2 rounded-full bg-card shadow-sm" />
      <div className="absolute inset-3 overflow-hidden rounded-[1.6rem] bg-black">
        <Image src={src} alt={alt} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-contain p-2" />
      </div>
    </div>
  );
}

function DesktopFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-video overflow-hidden rounded-xl border bg-card shadow-lg">
      <div className="absolute inset-x-0 top-0 z-10 flex h-8 items-center gap-1.5 border-b bg-muted/60 px-3">
        <span className="size-2 rounded-full bg-red-500/70" />
        <span className="size-2 rounded-full bg-yellow-500/70" />
        <span className="size-2 rounded-full bg-green-500/70" />
      </div>
      <div className="absolute inset-x-0 bottom-0 top-8 bg-muted">
        <Image src={src} alt={alt} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-contain p-3" />
      </div>
    </div>
  );
}

export function ProjectModal({
  open,
  onClose,
  project,
  labels,
}: {
  open: boolean;
  onClose: () => void;
  project: PortfolioProject | null;
  labels: {
    close: string;
    demo: string;
    code: string;
    gallery: string;
    details: string;
  };
}) {
  React.useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open || !project) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-end justify-center bg-black/60 p-4 md:items-center"
      role="dialog"
      aria-modal="true"
      aria-label={labels.details}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-3xl">
        <Card className="max-h-[85vh] overflow-hidden">
          <CardHeader className="flex flex-row items-start justify-between gap-4">
            <div className="min-w-0">
              <CardTitle className="truncate">{project.title}</CardTitle>
              <CardDescription className="mt-1">{project.description}</CardDescription>
            </div>
            <Button variant="ghost" size="icon" aria-label={labels.close} onClick={onClose}>
              <X className="size-4" />
            </Button>
          </CardHeader>

          <CardContent className="grid gap-4 overflow-auto">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((t) => {
                const meta = getTechMeta(t);
                const Icon = meta.Icon;

                return (
                  <Badge key={t} variant="secondary" className={meta.badgeClassName}>
                    {Icon ? <Icon className={meta.iconClassName} /> : null}
                    {t}
                  </Badge>
                );
              })}
            </div>

            {project.screenshots && project.screenshots.length ? (
              <div className="grid gap-3">
                <p className="text-sm font-medium text-foreground/90">{labels.gallery}</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {project.screenshots.map((img) => {
                    const isMobile = img.alt.toLowerCase().includes("mobile");

                    return (
                      <div key={img.src} className={isMobile ? "mx-auto w-full max-w-[260px]" : "w-full"}>
                        {isMobile ? (
                          <PhoneFrame src={img.src} alt={img.alt} />
                        ) : (
                          <DesktopFrame src={img.src} alt={img.alt} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </CardContent>

          <CardFooter className="flex flex-wrap gap-2 border-t">
            {project.links?.demo ? (
              <Button asChild>
                <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="size-4" />
                  {labels.demo}
                </a>
              </Button>
            ) : null}
            {project.links?.repo ? (
              <Button variant="outline" asChild>
                <a href={project.links.repo} target="_blank" rel="noopener noreferrer">
                  {labels.code}
                </a>
              </Button>
            ) : null}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
