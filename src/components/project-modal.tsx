"use client";

import * as React from "react";
import Image from "next/image";
import { ExternalLink, X } from "lucide-react";

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
              {project.tags.map((t) => (
                <Badge key={t} variant="secondary">
                  {t}
                </Badge>
              ))}
            </div>

            {project.screenshots && project.screenshots.length ? (
              <div className="grid gap-3">
                <p className="text-sm font-medium text-foreground/90">{labels.gallery}</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {project.screenshots.map((img) => (
                    <div
                      key={img.src}
                      className="relative aspect-video overflow-hidden rounded-lg border bg-muted"
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
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
