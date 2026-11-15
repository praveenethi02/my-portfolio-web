// Turns a repo name like "intercity-rideshare-marketplace" into "Intercity Rideshare Marketplace"
export function formatRepoName(name: string): string {
  return name
    .split(/[-_]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
