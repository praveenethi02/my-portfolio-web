import { ArrowUpRight } from "lucide-react";

import { socialLinks } from "@/components/social-links";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function ContactLinks() {
  const visibleLinks = socialLinks.filter((link) => link.href !== "");

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Find me online</CardTitle>
        <CardDescription>The quickest way to reach me right now.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-2">
          {visibleLinks.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:border-primary/50 hover:bg-muted/50"
              >
                <span className="flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="size-4" />
                </span>
                <span className="flex-1 text-sm font-medium">
                  {label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
