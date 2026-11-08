import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { SocialLinks } from "@/components/social-links";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Soft blue glow behind the hero text; purely decorative */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -z-10 size-96 -translate-x-1/2 -translate-y-1/3 rounded-full bg-primary/25 blur-3xl"
      />

      <div className="mx-auto flex max-w-5xl flex-col items-start gap-6 px-4 py-24 sm:py-32">
        <p className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
          {siteConfig.title}
        </p>

        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Hi, I&apos;m <span className="text-primary">{siteConfig.name}</span>
        </h1>

        <p className="max-w-2xl text-lg text-muted-foreground">{siteConfig.description}</p>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/projects"
            className={buttonVariants({
              size: "lg",
              className: "px-4 shadow-lg shadow-primary/25",
            })}
          >
            View projects
            <ArrowRight />
          </Link>
          <Link
            href="/contact"
            className={buttonVariants({ variant: "outline", size: "lg", className: "px-4" })}
          >
            Contact me
          </Link>
        </div>

        <SocialLinks className="-ml-2" />
      </div>
    </section>
  );
}
