import { FadeIn } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { homeContent } from "@/config/home";

export function HighlightsSection() {
  return (
    <section aria-labelledby="highlights-heading">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 border-t border-border px-4 py-20">
        <SectionHeading
          id="highlights-heading"
          eyebrow="Highlights"
          title="What I focus on"
          description="A quick look at what I study, build and care about."
        />

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {homeContent.highlights.map(({ title, description, icon: Icon }, index) => (
            <li key={title}>
              <FadeIn delay={index * 0.1} className="h-full">
                <Card className="h-full transition-shadow hover:ring-primary/50">
                  <CardHeader className="gap-3">
                    <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <CardTitle>{title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{description}</CardDescription>
                  </CardContent>
                </Card>
              </FadeIn>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
