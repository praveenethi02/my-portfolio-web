import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { levelLabel, type SkillGroup } from "@/lib/skills";

export function SkillCategoryCard({ group }: { group: SkillGroup }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{group.category}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-4">
          {group.skills.map((skill) => {
            const label = levelLabel(skill.level);
            return (
              <li key={skill.id} className="flex flex-col gap-1.5">
                <div className="flex items-baseline justify-between gap-2 text-sm">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {label} · {skill.level}%
                  </span>
                </div>
                {/* role="meter": screen readers announce the level, e.g. "Intermediate, 60%" */}
                <div
                  role="meter"
                  aria-label={`${skill.name} level`}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={skill.level}
                  aria-valuetext={`${label}, ${skill.level}%`}
                  className="h-1.5 overflow-hidden rounded-full bg-muted"
                >
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
