import type { ComponentType, SVGProps } from "react";

import { GitHubIcon, JiraIcon, LinkedInIcon } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export type SocialLink = {
  label: string;
  href: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

// Exported so other components (like the contact page) use the same list
export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: siteConfig.socialLinks.github, Icon: GitHubIcon },
  { label: "LinkedIn", href: siteConfig.socialLinks.linkedin, Icon: LinkedInIcon },
  { label: "Jira", href: siteConfig.socialLinks.jira, Icon: JiraIcon },
];

export function SocialLinks({ className }: { className?: string }) {
  // Skip any link that has no URL yet (for example Jira)
  const visibleLinks = socialLinks.filter((link) => link.href !== "");

  return (
    <ul className={cn("flex items-center gap-1", className)}>
      {visibleLinks.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label} profile (opens in a new tab)`}
            className={buttonVariants({ variant: "ghost", size: "icon" })}
          >
            <Icon />
          </a>
        </li>
      ))}
    </ul>
  );
}
