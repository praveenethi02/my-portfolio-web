// Colors GitHub uses for common languages, shown as a small dot on project cards
const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572a5",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  Vue: "#41b883",
  PHP: "#4f5d95",
  "C#": "#178600",
  Dart: "#00b4ab",
  Kotlin: "#a97bff",
  Shell: "#89e051",
  Dockerfile: "#384d54",
};

export function getLanguageColor(language: string): string {
  // Fallback gray for languages that are not in the list
  return languageColors[language] ?? "#8b8b8b";
}
