import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { ProjectCard } from "@/components/projects/project-card";
import { sampleProjects } from "@/data/sample-projects";

export const metadata: Metadata = {
  title: "Projects | Praveen Ethipola",
  description: "Projects built by Praveen Ethipola.",
};

export default function ProjectsPage() {
  // Featured projects first, then the most recently updated
  const projects = [...sampleProjects].sort(
    (a, b) => Number(b.featured) - Number(a.featured) || b.updatedAt.localeCompare(a.updatedAt)
  );

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-12 px-4 py-16 sm:py-24">
      <PageHeader
        eyebrow="Projects"
        title="Things I have built"
        description="A selection of my work. Soon this list will update automatically from my GitHub."
      />

      <ul className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <li key={project.id}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </div>
  );
}
