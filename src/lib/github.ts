import "server-only";

// Small client for the GitHub REST API (https://docs.github.com/en/rest).
// Only the fields this site uses are typed; GitHub sends many more.

const GITHUB_API_URL = "https://api.github.com";
const PAGE_SIZE = 100; // GitHub's maximum per page

export type GitHubRepo = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  fork: boolean;
  archived: boolean;
  private: boolean;
  pushed_at: string | null;
};

// Bytes of code per language, e.g. { "TypeScript": 52310, "CSS": 1200 }
export type GitHubLanguages = Record<string, number>;

export class GitHubApiError extends Error {
  constructor(
    message: string,
    public readonly status: number
  ) {
    super(message);
    this.name = "GitHubApiError";
  }
}

async function githubFetch<T>(path: string): Promise<T> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "my-portfolio-web",
  };

  // A token is optional for public data, but raises the limit from 60 to 5,000 requests per hour
  const token = process.env.GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response: Response;
  try {
    response = await fetch(`${GITHUB_API_URL}${path}`, { headers, cache: "no-store" });
  } catch (error) {
    throw new GitHubApiError(`Could not reach GitHub: ${(error as Error).message}`, 0);
  }

  if (response.ok) {
    return (await response.json()) as T;
  }

  // Turn GitHub's error responses into clear messages
  if (response.status === 401) {
    throw new GitHubApiError("GitHub rejected the token. Check GITHUB_TOKEN in .env.local.", 401);
  }
  if (
    (response.status === 403 || response.status === 429) &&
    response.headers.get("x-ratelimit-remaining") === "0"
  ) {
    const reset = Number(response.headers.get("x-ratelimit-reset")) * 1000;
    const resetTime = reset ? new Date(reset).toLocaleTimeString() : "later";
    throw new GitHubApiError(`GitHub rate limit reached. Try again after ${resetTime}.`, 429);
  }
  if (response.status === 404) {
    throw new GitHubApiError(`GitHub could not find ${path}.`, 404);
  }
  throw new GitHubApiError(
    `GitHub request failed (${response.status}) for ${path}.`,
    response.status
  );
}

// All public repositories owned by the user, newest push first
export async function getUserRepos(username: string): Promise<GitHubRepo[]> {
  const repos: GitHubRepo[] = [];
  const user = encodeURIComponent(username);

  // GitHub returns at most 100 repos per page, so keep asking until a page is not full
  for (let page = 1; ; page++) {
    const batch = await githubFetch<GitHubRepo[]>(
      `/users/${user}/repos?type=owner&sort=pushed&per_page=${PAGE_SIZE}&page=${page}`
    );
    repos.push(...batch);
    if (batch.length < PAGE_SIZE) break;
  }

  return repos.filter((repo) => !repo.private);
}

export function getRepoLanguages(owner: string, repo: string): Promise<GitHubLanguages> {
  return githubFetch<GitHubLanguages>(
    `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/languages`
  );
}
