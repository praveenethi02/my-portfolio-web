import { SectionHeading } from "@/components/section-heading";
import { homeContent } from "@/config/home";

export function AboutSection() {
  return (
    // scroll-mt-20 keeps the heading visible below the sticky navbar when jumping to #about
    <section id="about" aria-labelledby="about-heading" className="scroll-mt-20">
      <div className="mx-auto grid max-w-5xl gap-8 border-t border-border px-4 py-20 md:grid-cols-[1fr_2fr]">
        <SectionHeading id="about-heading" eyebrow="About" title="A little about me" />
        <div className="flex flex-col gap-4 text-lg text-muted-foreground">
          {homeContent.about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
