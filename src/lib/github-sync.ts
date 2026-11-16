import "server-only";

import { db } from "@/lib/db";
import { getRepoLanguages, getUserRepos, type GitHubRepo } from "@/lib/github";
import { SETTINGS_ID } from "@/lib/queries";

export type GitHubSyncResult = {
  synced: number;
  removed: number;
  languagesFetched: number;
};

// Only repos you built yourself are shown: forks and archived repos are skipped
function shouldShow(repo: GitHubRepo) {
  return !repo.fork && !repo.archived;
}

// Fields that always come from GitHub. Fields you control in /admin
// (featured, hidden, sortOrder) are never overwritten by a sync.
function toProjectData(repo: GitHubRepo) {
  return {
    name: repo.name,
    description: repo.description,
    language: repo.language,
    topics: repo.topics,
    stars: repo.stargazers_count,
    repoUrl: repo.html_url,
    liveUrl: repo.homepage || null, // GitHub sends "" when no website is set
    githubUpdatedAt: repo.pushed_at ? new Date(repo.pushed_at) : null,
  };
}

export async function syncGitHubProjects(): Promise<GitHubSyncResult> {
  const startedAt = new Date();

  try {
    const settings = await db.settings.findUnique({ where: { id: SETTINGS_ID } });
    const username = settings?.githubUsername;
    if (!username) {
      throw new Error("GitHub username is not set. Run `npm run db:seed` or set it in /admin.");
    }

    const repos = (await getUserRepos(username)).filter(shouldShow);

    // What we already stored, so unchanged repos do not need a new languages request
    const existing = await db.project.findMany({
      where: { githubId: { not: null } },
      select: { githubId: true, githubUpdatedAt: true, languages: true },
    });
    const existingById = new Map(existing.map((project) => [project.githubId, project]));

    let languagesFetched = 0;

    // Insert new repos and update existing ones, matched by GitHub's id
    for (const repo of repos) {
      const data = toProjectData(repo);

      // Languages only change when new code is pushed, so ask GitHub again only then.
      // This keeps each sync well inside GitHub's rate limit.
      const stored = existingById.get(repo.id);
      const unchanged =
        stored?.languages != null &&
        stored.githubUpdatedAt?.getTime() === data.githubUpdatedAt?.getTime();
      const languages = unchanged ? undefined : await getRepoLanguages(username, repo.name);
      if (languages) languagesFetched++;

      await db.project.upsert({
        where: { githubId: repo.id },
        update: { ...data, ...(languages && { languages }) },
        create: { githubId: repo.id, ...data, languages: languages ?? {} },
      });
    }

    // Remove projects whose repo was deleted, made private, archived or is a fork.
    // Projects added by hand (githubId = null) are left alone.
    const { count: removed } = await db.project.deleteMany({
      where: {
        githubId: { not: null, notIn: repos.map((repo) => repo.id) },
      },
    });

    await db.syncLog.create({
      data: {
        source: "GITHUB",
        status: "SUCCESS",
        itemCount: repos.length,
        message: removed > 0 ? `Removed ${removed} project(s) no longer on GitHub.` : null,
        startedAt,
        finishedAt: new Date(),
      },
    });

    return { synced: repos.length, removed, languagesFetched };
  } catch (error) {
    // Record the failure so /admin can show what went wrong, then pass the error on
    await db.syncLog.create({
      data: {
        source: "GITHUB",
        status: "FAILED",
        message: (error as Error).message,
        startedAt,
        finishedAt: new Date(),
      },
    });
    throw error;
  }
}
