// Turns per-repo language bytes into overall stats, e.g.
// [{ language: "TypeScript", bytes: 52310, percent: 45.2, repoCount: 3 }, ...]

export type LanguageStat = {
  language: string;
  bytes: number;
  percent: number; // share of all code, 0-100, one decimal place
  repoCount: number; // how many repos use this language
};

// Shape of the JSON stored in Project.languages
type LanguageBytes = Record<string, number>;

function isLanguageBytes(value: unknown): value is LanguageBytes {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    Object.values(value).every((bytes) => typeof bytes === "number")
  );
}

export function computeLanguageStats(repoLanguages: unknown[]): LanguageStat[] {
  const totals = new Map<string, { bytes: number; repoCount: number }>();

  for (const languages of repoLanguages) {
    // Skip rows that have no data yet or unexpected JSON
    if (!isLanguageBytes(languages)) continue;

    for (const [language, bytes] of Object.entries(languages)) {
      const total = totals.get(language) ?? { bytes: 0, repoCount: 0 };
      total.bytes += bytes;
      total.repoCount += 1;
      totals.set(language, total);
    }
  }

  const allBytes = [...totals.values()].reduce((sum, total) => sum + total.bytes, 0);
  if (allBytes === 0) return [];

  return [...totals.entries()]
    .map(([language, { bytes, repoCount }]) => ({
      language,
      bytes,
      percent: Math.round((bytes / allBytes) * 1000) / 10,
      repoCount,
    }))
    .sort((a, b) => b.bytes - a.bytes);
}
