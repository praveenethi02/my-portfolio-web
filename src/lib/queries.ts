import "server-only";

import type { SyncSource } from "@/generated/prisma/client";
import { db } from "@/lib/db";

// Read-only helpers used by pages. Keeping queries here means pages never
// talk to Prisma directly, and the "what is visible" rules live in one place.

export const SETTINGS_ID = 1;

export function getVisibleProjects() {
  return db.project.findMany({
    where: { hidden: false },
    orderBy: [{ featured: "desc" }, { sortOrder: "asc" }, { githubUpdatedAt: "desc" }],
  });
}

export function getVisibleSkills() {
  return db.skill.findMany({
    where: { visible: true },
    orderBy: [{ category: "asc" }, { sortOrder: "asc" }, { level: "desc" }],
  });
}

export function getVisibleExperience() {
  return db.experience.findMany({
    where: { visible: true },
    // Newest job first
    orderBy: [{ sortOrder: "asc" }, { startDate: "desc" }],
  });
}

export function getVisibleEducation() {
  return db.education.findMany({
    where: { visible: true },
    orderBy: [{ sortOrder: "asc" }, { startDate: "desc" }],
  });
}

export function getSettings() {
  // There is only one settings row; it may be missing until the seed has run
  return db.settings.findUnique({ where: { id: SETTINGS_ID } });
}

export function getLatestSync(source: SyncSource) {
  return db.syncLog.findFirst({
    where: { source },
    orderBy: { startedAt: "desc" },
  });
}
