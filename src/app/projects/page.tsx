import type { Metadata } from "next";

import { FadeIn } from "@/components/motion/fade-in";
import { PageHeader } from "@/components/page-header";
import { ProjectCard } from "@/components/projects/project-card";
import { getVisibleProjects } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Projects | Praveen Ethipola",
  description: "Projects built by Praveen Ethipola.",
};

// Build this page once, then rebuild it in the background at most once an hour
// so new GitHub syncs show up without redeploying.
export const revalidate = 3600;

export default async function ProjectsPage() {
  // Already sorted (featured first) and filtered (no hidden projects) by the query helper
  const projects = await getVisibleProjects();

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-12 px-4 py-16 sm:py-24">
      <PageHeader
        eyebrow="Projects"
        title="Things I have built"
        description="My public GitHub repositories, kept up to date automatically."
      />

      {projects.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">
          No projects to show yet. Run a GitHub sync to load them.
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {projects.map((project, index) => (
            <li key={project.id}>
              {/* Each card starts a little later than the one before it */}
              <FadeIn delay={Math.min(index, 6) * 0.08} className="h-full">
                <ProjectCard project={project} />
              </FadeIn>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
