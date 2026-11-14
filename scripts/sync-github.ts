// Runs the GitHub sync from the terminal: npm run sync:github
// On Day 7 the same sync gets a button in /admin, and on Day 9 a scheduled GitHub Action.

import { syncGitHubProjects } from "@/lib/github-sync";

async function main() {
  const { synced, removed } = await syncGitHubProjects();
  console.log(`GitHub sync finished: ${synced} project(s) synced, ${removed} removed.`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("GitHub sync failed:", (error as Error).message);
    process.exit(1);
  });
