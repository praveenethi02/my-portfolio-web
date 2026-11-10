import { ExternalLink, Star } from "lucide-react";

import { GitHubIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getLanguageColor } from "@/lib/language-colors";
import type { Project } from "@/types/project";

// Turns "2026-11-09" into "Nov 2026". timeZone "UTC" stops the date shifting to the previous day.
const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="h-full transition-shadow hover:ring-primary/50">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg">{project.name}</CardTitle>
          {project.featured && <Badge>Featured</Badge>}
        </div>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col justify-end gap-4">
        {project.topics.length > 0 && (
          <ul className="flex flex-wrap gap-1.5" aria-label="Topics">
            {project.topics.map((topic) => (
              <li key={topic}>
                <Badge variant="secondary">{topic}</Badge>
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          {project.language && (
            <span className="flex items-center gap-1.5">
              <span
                aria-hidden="true"
                className="size-2.5 rounded-full"
                style={{ backgroundColor: getLanguageColor(project.language) }}
              />
              {project.language}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Star aria-hidden="true" className="size-3.5" />
            <span>
              {project.stars}
              <span className="sr-only"> stars</span>
            </span>
          </span>
          <time dateTime={project.updatedAt}>
            Updated {dateFormatter.format(new Date(project.updatedAt))}
          </time>
        </div>
      </CardContent>

      <CardFooter className="gap-2">
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ variant: "outline", size: "sm" })}
        >
          <GitHubIcon />
          Code
          <span className="sr-only"> for {project.name} (opens in a new tab)</span>
        </a>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ size: "sm" })}
          >
            <ExternalLink aria-hidden="true" />
            Live demo
            <span className="sr-only"> of {project.name} (opens in a new tab)</span>
          </a>
        )}
      </CardFooter>
    </Card>
  );
}
