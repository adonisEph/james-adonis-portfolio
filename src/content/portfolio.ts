export type PortfolioLink = {
  label: string;
  href: string;
};

export type Locale = "fr" | "en";

export type PortfolioProject = {
  title: string;
  description: string;
  tags: string[];
  links?: {
    demo?: string;
    repo?: string;
  };
};

export type PortfolioExperience = {
  company: string;
  role: string;
  period: string;
  location?: string;
  highlights: string[];
};

export type Portfolio = {
  name: string;
  role: string;
  location: string;
  pitch: string;
  summary: string;
  links: {
    primary: PortfolioLink[];
    secondary: PortfolioLink[];
  };
  skills: string[];
  projects: PortfolioProject[];
  experience: PortfolioExperience[];
};

const linkedInUrl = "https://www.linkedin.com/in/adonis-djimby-b539a3167";

const portfolioByLocale = {
  fr: {
    name: "James Adonis DJIMBY",
    role: "Développeur Full Stack / Génie Logiciel",
    location: "Brazzaville / République du Congo",
    pitch:
      "Spécialiste en automatisation et développement Full‑Stack. Je transforme vos fichiers Excel et processus manuels en applications intelligentes qui travaillent pour vous 24/7. Expertise : systèmes de gestion automatisée, plateformes de réservation, outils métiers sur mesure. React • Node.js • PostgreSQL.",
    summary:
      "Je conçois des solutions web et des outils métiers sur mesure, avec une approche orientée résultat : automatiser, fiabiliser et accélérer les opérations. J’interviens sur l’architecture, le développement front/back, la base de données et l’intégration des processus (notamment depuis Excel) vers des applications robustes.",
    links: {
      primary: [
        { label: "Email", href: "mailto:jamesdjimby@gmail.com" },
        { label: "LinkedIn", href: linkedInUrl },
        { label: "GitHub", href: "https://github.com/adonisEph" },
      ],
      secondary: [{ label: "Télécharger le CV", href: "/cv.pdf" }],
    },
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "API REST",
      "Automatisation (Excel → Web)",
      "Vite",
      "Tailwind CSS",
    ],
    projects: [
      {
        title: "Gestion Maintenances et Vidanges Générateurs",
        description:
          "Outil de gestion pour planifier et suivre les maintenances/vidanges, centraliser les données et réduire les tâches manuelles.",
        tags: ["React", "Node.js", "Vite", "JavaScript"],
        links: {
          repo: "https://github.com/adonisEph/sthic-maintenances-generateurs",
        },
      },
      {
        title: "Automatisation Vidanges et PM",
        description:
          "Automatisation des processus de maintenance préventive (PM) : standardisation, suivi et meilleure visibilité opérationnelle.",
        tags: ["Automatisation", "Process", "Outils métiers"],
      },
    ],
    experience: [
      {
        company: "STHIC",
        role: "Maintenances Manager",
        period: "6 ans d’expérience",
        location: "Brazzaville",
        highlights: [
          "Automatisation des vidanges et de la maintenance préventive (PM) pour réduire les tâches manuelles.",
          "Mise en place d’un suivi structuré (planning, historique, indicateurs) afin d’améliorer la visibilité et la coordination.",
        ],
      },
    ],
  },
  en: {
    name: "James Adonis DJIMBY",
    role: "Full‑Stack Developer / Software Engineer",
    location: "Brazzaville / Republic of the Congo",
    pitch:
      "Automation and Full‑Stack development specialist. I turn Excel files and manual processes into smart applications that work for you 24/7. Expertise: automated management systems, booking platforms, and custom business tools. React • Node.js • PostgreSQL.",
    summary:
      "I build web applications and custom business tools with a results-driven approach: automate, standardize, and accelerate operations. I work across architecture, frontend/backend development, databases, and process integration (including migrating Excel workflows into robust web apps).",
    links: {
      primary: [
        { label: "Email", href: "mailto:jamesdjimby@gmail.com" },
        { label: "LinkedIn", href: linkedInUrl },
        { label: "GitHub", href: "https://github.com/adonisEph" },
      ],
      secondary: [{ label: "Download CV", href: "/cv.pdf" }],
    },
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "REST APIs",
      "Automation (Excel → Web)",
      "Vite",
      "Tailwind CSS",
    ],
    projects: [
      {
        title: "Generator Maintenance & Oil Change Management",
        description:
          "Management tool to plan and track maintenance/oil changes, centralize data, and reduce manual work.",
        tags: ["React", "Node.js", "Vite", "JavaScript"],
        links: {
          repo: "https://github.com/adonisEph/sthic-maintenances-generateurs",
        },
      },
      {
        title: "Oil Change & Preventive Maintenance Automation",
        description:
          "Automation of preventive maintenance workflows: standardization, tracking, and improved operational visibility.",
        tags: ["Automation", "Process", "Business tools"],
      },
    ],
    experience: [
      {
        company: "STHIC",
        role: "Maintenance Manager",
        period: "6 years",
        location: "Brazzaville",
        highlights: [
          "Automated oil-change and preventive maintenance (PM) workflows to reduce manual work.",
          "Implemented structured tracking (planning, history, indicators) to improve visibility and coordination.",
        ],
      },
    ],
  },
} satisfies Record<Locale, Portfolio>;

export function getPortfolio(locale: Locale): Portfolio {
  return portfolioByLocale[locale];
}
