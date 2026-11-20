import { getLanguageColor } from "@/lib/language-colors";
import type { LanguageStat } from "@/lib/language-stats";

// Languages under this share are folded into "Other" so the chart stays readable
const MIN_PERCENT = 1;
const OTHER_COLOR = "#8b8b8b";

type ChartRow = {
  language: string;
  percent: number;
  detail: string; // e.g. "10 repos" or "4 languages"
  color: string;
};

function toChartRows(stats: LanguageStat[]): ChartRow[] {
  const rows: ChartRow[] = stats
    .filter((stat) => stat.percent >= MIN_PERCENT)
    .map((stat) => ({
      language: stat.language,
      percent: stat.percent,
      detail: `${stat.repoCount} ${stat.repoCount === 1 ? "repo" : "repos"}`,
      color: getLanguageColor(stat.language),
    }));

  const small = stats.filter((stat) => stat.percent < MIN_PERCENT);
  if (small.length > 0) {
    const percent = Math.round(small.reduce((sum, stat) => sum + stat.percent, 0) * 10) / 10;
    rows.push({
      language: "Other",
      percent,
      detail: `${small.length} ${small.length === 1 ? "language" : "languages"}`,
      color: OTHER_COLOR,
    });
  }

  return rows;
}

export function LanguageChart({ stats }: { stats: LanguageStat[] }) {
  const rows = toChartRows(stats);

  return (
    <div className="flex flex-col gap-6">
      {/* Stacked bar. Hidden from screen readers because the list below has the same numbers. */}
      <div aria-hidden="true" className="flex h-3 w-full gap-0.5 overflow-hidden rounded-full">
        {rows.map((row) => (
          <div
            key={row.language}
            title={`${row.language}: ${row.percent}%`}
            className="h-full min-w-0.5"
            style={{ flex: `${row.percent} 1 0%`, backgroundColor: row.color }}
          />
        ))}
      </div>

      {/* Legend: every color has its name and value written next to it */}
      <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
        {rows.map((row) => (
          <li key={row.language} className="flex items-center gap-2 text-sm">
            <span
              aria-hidden="true"
              className="size-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: row.color }}
            />
            <span className="font-medium">{row.language}</span>
            <span className="ml-auto tabular-nums">{row.percent}%</span>
            <span className="w-20 text-right text-xs text-muted-foreground">{row.detail}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
