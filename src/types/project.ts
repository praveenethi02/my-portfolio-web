// Shape of one project card. On Day 4 the same fields will come from GitHub via the database.
export type Project = {
  id: string;
  name: string;
  description: string;
  language: string | null;
  topics: string[];
  stars: number;
  repoUrl: string;
  liveUrl: string | null;
  featured: boolean;
  updatedAt: string; // ISO date string, e.g. "2026-11-09"
};
