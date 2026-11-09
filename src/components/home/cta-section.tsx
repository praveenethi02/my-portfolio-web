import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { homeContent } from "@/config/home";

export function CtaSection() {
  return (
    <section aria-labelledby="cta-heading" className="mx-auto max-w-5xl px-4 pb-24">
      <div className="relative isolate overflow-hidden rounded-2xl border border-border bg-card px-6 py-14 text-center">
        {/* Decorative glow at the bottom of the box */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-40 w-2/3 -translate-x-1/2 translate-y-1/2 rounded-full bg-primary/30 blur-3xl"
        />

        <h2 id="cta-heading" className="text-2xl font-bold tracking-tight sm:text-3xl">
          {homeContent.cta.title}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">{homeContent.cta.description}</p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/contact"
            className={buttonVariants({
              size: "lg",
              className: "px-4 shadow-lg shadow-primary/25",
            })}
          >
            Get in touch
            <ArrowRight />
          </Link>
          <Link
            href="/projects"
            className={buttonVariants({ variant: "outline", size: "lg", className: "px-4" })}
          >
            See my work
          </Link>
        </div>
      </div>
    </section>
  );
}
