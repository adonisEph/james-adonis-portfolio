"use client";

import * as React from "react";
import Image from "next/image";
import { ExternalLink, Github, Linkedin, Mail } from "lucide-react";

import { getPortfolio, type Locale } from "@/content/portfolio";
import { SiteHeader } from "@/components/site-header";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { ProjectModal } from "@/components/project-modal";
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
      description:
        "Une vision claire, orientée automatisation, fiabilité et impact opérationnel.",
      note:
        "Je conçois des solutions sur mesure qui remplacent les fichiers dispersés et les saisies manuelles par des workflows structurés, traçables et faciles à maintenir.",
    },
    skills: {
      title: "Compétences",
      description:
        "Stack technique, bases de données et domaines d’expertise (automatisation et outils métiers).",
    },
    projects: {
      title: "Projets",
      description:
        "Sélection de réalisations avec contexte, stack et liens (code / démo).",
      demo: "Démo",
      code: "Code",
    },
    experience: {
      title: "Expérience",
      description:
        "Expérience professionnelle axée sur l’organisation, le suivi et l’automatisation des opérations.",
    },
    contact: {
      title: "Contact",
      description:
        "Pour une opportunité, un projet ou une collaboration, contacte-moi via email ou LinkedIn.",
      formTitle: "Envoyer un message",
      formDesc:
        "Tu peux utiliser le bouton email ci-dessous (formulaire visuel).",
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
      description:
        "A clear approach focused on automation, reliability, and operational impact.",
      note:
        "I build tailored solutions that replace scattered spreadsheets and repetitive manual work with structured, traceable, and maintainable workflows.",
    },
    skills: {
      title: "Skills",
      description:
        "Tech stack, databases, and expertise areas (automation and business tools).",
    },
    projects: {
      title: "Projects",
      description:
        "Selected projects with context, stack, and links (code / demo).",
      demo: "Demo",
      code: "Code",
    },
    experience: {
      title: "Experience",
      description:
        "Professional experience focused on organization, tracking, and process automation.",
    },
    contact: {
      title: "Contact",
      description:
        "For an opportunity, a project, or a collaboration, reach out via email or LinkedIn.",
      formTitle: "Send a message",
      formDesc: "You can use the email button below (visual form only).",
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
  const [activeProjectTitle, setActiveProjectTitle] = React.useState<string | null>(null);

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

  const activeProject =
    activeProjectTitle
      ? portfolio.projects.find((p) => p.title === activeProjectTitle) ?? null
      : null;

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
        <Reveal>
          <section className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div className="flex flex-col gap-4">
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
            </div>

            <div className="mx-auto w-full max-w-[240px] md:mx-0">
              <div className="rounded-2xl border bg-card p-3 shadow-sm">
                <div className="relative aspect-square overflow-hidden rounded-full bg-muted ring-1 ring-border">
                  <Image
                    src={portfolio.heroImage.src}
                    alt={portfolio.heroImage.alt}
                    fill
                    priority
                    sizes="(max-width: 768px) 240px, 240px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        <div className="mt-12 flex flex-col gap-12">
          <Reveal delayMs={50}>
            <Section id="about" title={t.about.title} description={t.about.description}>
              <div className="flex flex-col gap-3 text-sm leading-6 text-foreground/90">
                <p>{portfolio.summary}</p>
                <p>{t.about.note}</p>
              </div>
            </Section>
          </Reveal>

          <Reveal delayMs={100}>
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
          </Reveal>

          <Reveal delayMs={150}>
            <Section
              id="projects"
              title={t.projects.title}
              description={t.projects.description}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                {portfolio.projects.map((p) => (
                  <Card
                    key={p.title}
                    role="button"
                    tabIndex={0}
                    className="overflow-hidden transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    onClick={() => setActiveProjectTitle(p.title)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveProjectTitle(p.title);
                      }
                    }}
                    aria-label={`${p.title} — ${t.projects.code}`}
                  >
                      {p.screenshots?.[0] ? (
                        <div className="relative aspect-video w-full overflow-hidden bg-muted">
                          <Image
                            src={p.screenshots[0].src}
                            alt={p.screenshots[0].alt}
                            fill
                            sizes="(max-width: 640px) 100vw, 50vw"
                            className="object-cover"
                          />
                        </div>
                      ) : null}
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
                    <CardFooter className="flex flex-wrap gap-2">
                      {p.links?.demo ? (
                        <Button asChild>
                          <a
                            href={p.links.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
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
                            onClick={(e) => e.stopPropagation()}
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
          </Reveal>

          <Reveal delayMs={200}>
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
          </Reveal>

          <Reveal delayMs={250}>
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
          </Reveal>
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

      <ProjectModal
        open={Boolean(activeProject)}
        project={activeProject}
        onClose={() => setActiveProjectTitle(null)}
        labels={{
          close: locale === "fr" ? "Fermer" : "Close",
          demo: t.projects.demo,
          code: t.projects.code,
          gallery: locale === "fr" ? "Captures" : "Screenshots",
          details: locale === "fr" ? "Détails du projet" : "Project details",
        }}
      />
    </div>
  );
}
