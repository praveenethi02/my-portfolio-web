import "server-only";

import { db } from "@/lib/db";
import { getUserRepos, type GitHubRepo } from "@/lib/github";
import { SETTINGS_ID } from "@/lib/queries";

export type GitHubSyncResult = {
  synced: number;
  removed: number;
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

    // Insert new repos and update existing ones, matched by GitHub's id
    for (const repo of repos) {
      const data = toProjectData(repo);
      await db.project.upsert({
        where: { githubId: repo.id },
        update: data,
        create: { githubId: repo.id, ...data },
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

    return { synced: repos.length, removed };
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
