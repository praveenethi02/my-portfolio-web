import type { Skill } from "@/generated/prisma/client";

export type SkillGroup = {
  category: string;
  skills: Skill[];
};

// Categories appear in this order; any new category from /admin goes after them
const CATEGORY_ORDER = ["Languages", "Frontend", "Backend", "Tools"];

export function groupSkillsByCategory(skills: Skill[]): SkillGroup[] {
  const groups = new Map<string, Skill[]>();
  for (const skill of skills) {
    const list = groups.get(skill.category) ?? [];
    list.push(skill);
    groups.set(skill.category, list);
  }

  const rank = (category: string) => {
    const index = CATEGORY_ORDER.indexOf(category);
    return index === -1 ? CATEGORY_ORDER.length : index;
  };

  return [...groups.entries()]
    .map(([category, list]) => ({ category, skills: list }))
    .sort((a, b) => rank(a.category) - rank(b.category) || a.category.localeCompare(b.category));
}

// A word to go with the number, so the bar is not the only way to read the level
export function levelLabel(level: number): string {
  if (level >= 75) return "Advanced";
  if (level >= 50) return "Intermediate";
  return "Beginner";
}
