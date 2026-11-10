import type { Project } from "@/types/project";

// Temporary sample data so we can build the page UI.
// Day 4 replaces this file with real repositories synced from GitHub.
export const sampleProjects: Project[] = [
  {
    id: "portfolio-website",
    name: "Portfolio Website",
    description:
      "This site: a dark-mode portfolio built with Next.js, Tailwind CSS and shadcn/ui, connected to GitHub, LinkedIn and Jira.",
    language: "TypeScript",
    topics: ["nextjs", "tailwindcss", "portfolio"],
    stars: 0,
    repoUrl: "https://github.com/praveenethi02/my-portfolio-web",
    liveUrl: null,
    featured: true,
    updatedAt: "2026-11-09",
  },
  {
    id: "sample-task-manager",
    name: "Sample Task Manager",
    description: "Placeholder project: a simple to-do app with categories and due dates.",
    language: "JavaScript",
    topics: ["react", "sample"],
    stars: 3,
    repoUrl: "https://github.com/praveenethi02",
    liveUrl: "https://example.com",
    featured: false,
    updatedAt: "2026-09-15",
  },
  {
    id: "sample-weather-cli",
    name: "Sample Weather CLI",
    description: "Placeholder project: a command-line tool that prints the weather forecast.",
    language: "Python",
    topics: ["cli", "api", "sample"],
    stars: 1,
    repoUrl: "https://github.com/praveenethi02",
    liveUrl: null,
    featured: false,
    updatedAt: "2026-07-02",
  },
  {
    id: "sample-library-system",
    name: "Sample Library System",
    description: "Placeholder project: a desktop app for managing books and members.",
    language: "Java",
    topics: ["oop", "sample"],
    stars: 0,
    repoUrl: "https://github.com/praveenethi02",
    liveUrl: null,
    featured: false,
    updatedAt: "2026-04-20",
  },
];
