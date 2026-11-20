import type { Metadata } from "next";

import { FadeIn } from "@/components/motion/fade-in";
import { PageHeader } from "@/components/page-header";
import { SectionHeading } from "@/components/section-heading";
import { LanguageChart } from "@/components/skills/language-chart";
import { SkillCategoryCard } from "@/components/skills/skill-category-card";
import { Card, CardContent } from "@/components/ui/card";
import { getLanguageStats, getVisibleSkills } from "@/lib/queries";
import { groupSkillsByCategory } from "@/lib/skills";

export const metadata: Metadata = {
  title: "Skills | Praveen Ethipola",
  description: "Skills and programming languages used by Praveen Ethipola.",
};

// Rebuild in the background at most once an hour, like the Projects page
export const revalidate = 3600;

export default async function SkillsPage() {
  // Run both database queries at the same time
  const [skills, languageStats] = await Promise.all([getVisibleSkills(), getLanguageStats()]);
  const groups = groupSkillsByCategory(skills);

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-16 px-4 py-16 sm:py-24">
      <PageHeader
        eyebrow="Skills"
        title="What I work with"
        description="The tools I use and the languages I write, taken from my GitHub repositories."
      />

      <section aria-labelledby="skills-heading" className="flex flex-col gap-8">
        <SectionHeading
          id="skills-heading"
          eyebrow="Toolbox"
          title="Skills by category"
          description="How comfortable I am with each tool today."
        />
        {groups.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">
            No skills added yet.
          </p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2">
            {groups.map((group, index) => (
              <li key={group.category}>
                <FadeIn delay={index * 0.08} className="h-full">
                  <SkillCategoryCard group={group} />
                </FadeIn>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="languages-heading" className="flex flex-col gap-8">
        <SectionHeading
          id="languages-heading"
          eyebrow="From GitHub"
          title="Languages in my repositories"
          description="Share of code across my public GitHub repositories, updated with every sync."
        />
        {languageStats.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">
            No language data yet. Run a GitHub sync to load it.
          </p>
        ) : (
          <FadeIn>
            <Card>
              <CardContent>
                <LanguageChart stats={languageStats} />
              </CardContent>
            </Card>
          </FadeIn>
        )}
      </section>
    </div>
  );
}