"use client";

import * as React from "react";
import { ExternalLink, Github, Linkedin, Mail } from "lucide-react";

import { getPortfolio, type Locale } from "@/content/portfolio";
import { SiteHeader } from "@/components/site-header";
import { Section } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Copy = {
  about: { title: string; description: string; note: string };
  skills: { title: string; description: string };
  projects: { title: string; description: string; demo: string; code: string };
  experience: { title: string; description: string };
  contact: {
    title: string;
    description: string;
    formTitle: string;
    formDesc: string;
    name: string;
    email: string;
    message: string;
    sendByEmail: string;
    linksTitle: string;
    linksDesc: string;
    locationLabel: string;
  };
  top: string;
};

const copy: Record<Locale, Copy> = {
  fr: {
    about: {
      title: "À propos",
      description: "Une courte présentation orientée impact.",
      note: "Si tu veux, on peut reformuler cette section pour qu’elle soit encore plus orientée recrutement (résultats, domaines, stack, types de projets).",
    },
    skills: {
      title: "Compétences",
      description: "Les technos et sujets sur lesquels tu es à l’aise.",
    },
    projects: {
      title: "Projets",
      description: "Une sélection de réalisations avec stack et liens.",
      demo: "Démo",
      code: "Code",
    },
    experience: {
      title: "Expérience",
      description: "Expériences pertinentes (focus impact).",
    },
    contact: {
      title: "Contact",
      description: "Un message rapide — ou un simple lien mail.",
      formTitle: "Envoyer un message",
      formDesc:
        "Ce formulaire est visuel (pas d’envoi côté serveur pour l’instant).",
      name: "Ton nom",
      email: "Ton email",
      message: "Ton message",
      sendByEmail: "Envoyer par email",
      linksTitle: "Liens",
      linksDesc: "Retrouve-moi ici.",
      locationLabel: "Localisation",
    },
    top: "Retour en haut",
  },
  en: {
    about: {
      title: "About",
      description: "A short, impact-driven introduction.",
      note: "If you want, we can rewrite this section to be even more recruiter-friendly (results, domains, stack, project types).",
    },
    skills: {
      title: "Skills",
      description: "Technologies and topics you work with.",
    },
    projects: {
      title: "Projects",
      description: "A selection of work with stack and links.",
      demo: "Demo",
      code: "Code",
    },
    experience: {
      title: "Experience",
      description: "Relevant experience (impact first).",
    },
    contact: {
      title: "Contact",
      description: "A quick message — or a simple mail link.",
      formTitle: "Send a message",
      formDesc: "This form is visual only (no backend submission yet).",
      name: "Your name",
      email: "Your email",
      message: "Your message",
      sendByEmail: "Send by email",
      linksTitle: "Links",
      linksDesc: "Find me here.",
      locationLabel: "Location",
    },
    top: "Back to top",
  },
};

function detectInitialLocale(): Locale {
  try {
    const stored = window.localStorage.getItem("locale");
    if (stored === "fr" || stored === "en") return stored;

    const nav = window.navigator.language?.toLowerCase() ?? "fr";
    if (nav.startsWith("en")) return "en";
    return "fr";
  } catch {
    return "fr";
  }
}

export function PortfolioPage() {
  const [locale, setLocale] = React.useState<Locale>("fr");

  React.useEffect(() => {
    const initial = detectInitialLocale();
    setLocale(initial);
  }, []);

  React.useEffect(() => {
    try {
      window.localStorage.setItem("locale", locale);
    } catch {}
  }, [locale]);

  const t = copy[locale];
  const portfolio = getPortfolio(locale);

  const emailHref =
    portfolio.links.primary.find((l) => l.href.startsWith("mailto:"))?.href ??
    "mailto:";

  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <SiteHeader
        name={portfolio.name}
        role={portfolio.role}
        locale={locale}
        onLocaleChange={(next) => setLocale(next)}
      />

      <main className="mx-auto w-full max-w-5xl px-6 py-10">
        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground">
              {t.contact.locationLabel}: {portfolio.location}
            </p>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {portfolio.name}
            </h1>
            <p className="text-lg text-muted-foreground">{portfolio.role}</p>
          </div>

          <p className="max-w-3xl text-base leading-7 text-foreground/90">
            {portfolio.pitch}
          </p>

          <div className="flex flex-wrap gap-3">
            {portfolio.links.primary.map((l) => {
              const lower = l.label.toLowerCase();
              const icon = lower.includes("email") ? (
                <Mail className="size-4" />
              ) : lower.includes("github") ? (
                <Github className="size-4" />
              ) : lower.includes("linkedin") ? (
                <Linkedin className="size-4" />
              ) : (
                <ExternalLink className="size-4" />
              );

              return (
                <Button key={l.href} asChild>
                  <a href={l.href} target="_blank" rel="noopener noreferrer">
                    {icon}
                    {l.label}
                  </a>
                </Button>
              );
            })}

            {portfolio.links.secondary.map((l) => (
              <Button key={l.href} variant="outline" asChild>
                <a href={l.href} target="_blank" rel="noopener noreferrer">
                  {l.label}
                </a>
              </Button>
            ))}
          </div>
        </section>

        <div className="mt-12 flex flex-col gap-12">
          <Section id="about" title={t.about.title} description={t.about.description}>
            <div className="flex flex-col gap-3 text-sm leading-6 text-foreground/90">
              <p>{portfolio.summary}</p>
              <p>{t.about.note}</p>
            </div>
          </Section>

          <Section
            id="skills"
            title={t.skills.title}
            description={t.skills.description}
          >
            <div className="flex flex-wrap gap-2">
              {portfolio.skills.map((s) => (
                <Badge key={s} variant="secondary">
                  {s}
                </Badge>
              ))}
            </div>
          </Section>

          <Section
            id="projects"
            title={t.projects.title}
            description={t.projects.description}
          >
            <div className="grid gap-4 md:grid-cols-2">
              {portfolio.projects.map((p) => (
                <Card key={p.title}>
                  <CardHeader>
                    <CardTitle>{p.title}</CardTitle>
                    <CardDescription>{p.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </CardContent>
                  <CardFooter className="gap-2">
                    {p.links?.demo ? (
                      <Button asChild>
                        <a
                          href={p.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="size-4" />
                          {t.projects.demo}
                        </a>
                      </Button>
                    ) : null}
                    {p.links?.repo ? (
                      <Button variant="outline" asChild>
                        <a
                          href={p.links.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="size-4" />
                          {t.projects.code}
                        </a>
                      </Button>
                    ) : null}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </Section>

          <Section
            id="experience"
            title={t.experience.title}
            description={t.experience.description}
          >
            <div className="grid gap-4">
              {portfolio.experience.map((e) => (
                <Card key={`${e.company}-${e.period}`}>
                  <CardHeader>
                    <CardTitle>
                      {e.role} · {e.company}
                    </CardTitle>
                    <CardDescription>
                      {e.period}
                      {e.location ? ` · ${e.location}` : ""}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 text-sm text-foreground/90">
                      {e.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Section>

          <Section
            id="contact"
            title={t.contact.title}
            description={t.contact.description}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>{t.contact.formTitle}</CardTitle>
                  <CardDescription>{t.contact.formDesc}</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3">
                  <Input placeholder={t.contact.name} />
                  <Input type="email" placeholder={t.contact.email} />
                  <Textarea placeholder={t.contact.message} />
                </CardContent>
                <CardFooter>
                  <Button asChild>
                    <a href={emailHref}>
                      <Mail className="size-4" />
                      {t.contact.sendByEmail}
                    </a>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t.contact.linksTitle}</CardTitle>
                  <CardDescription>{t.contact.linksDesc}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {portfolio.links.primary.map((l) => (
                    <Button key={l.href} variant="outline" asChild>
                      <a href={l.href} target="_blank" rel="noopener noreferrer">
                        {l.label}
                      </a>
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </div>
          </Section>
        </div>

        <footer className="mt-16 border-t pt-8 text-sm text-muted-foreground">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {portfolio.name}
            </p>
            <a className="underline underline-offset-4" href="#top">
              {t.top}
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
