import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
};

// Reusable heading block: small blue label, big title and optional description
export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex max-w-2xl flex-col gap-3", className)}>
      {eyebrow && <p className="text-sm font-medium text-primary">{eyebrow}</p>}
      <h2 id={id} className="text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {description && <p className="text-muted-foreground">{description}</p>}
    </div>
  );
}
