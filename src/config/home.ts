import { CodeXml, GraduationCap, Rocket, type LucideIcon } from "lucide-react";

// Text shown on the home page. Replace the sample sentences with your own words.

export type Highlight = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const homeContent = {
  about: {
    paragraphs: [
      "I am a Computer Engineering undergraduate who enjoys building things for the web.",
      "I like learning how systems work end to end, from the user interface down to the database, and turning that knowledge into useful projects.",
    ],
  },
  highlights: [
    {
      title: "Computer Engineering",
      description: "Studying how hardware, software and networks fit together.",
      icon: GraduationCap,
    },
    {
      title: "Full-stack development",
      description: "Building web apps with Next.js, TypeScript and PostgreSQL.",
      icon: CodeXml,
    },
    {
      title: "Always learning",
      description: "Shipping projects, trying new tools and improving every day.",
      icon: Rocket,
    },
  ] satisfies Highlight[],
  cta: {
    title: "Have an idea or opportunity?",
    description: "I am open to internships, collaborations and interesting projects.",
  },
};
