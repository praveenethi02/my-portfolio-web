type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

// Top block for inner pages (Projects, Contact, ...); uses the page's only <h1>
export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <div className="relative isolate">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-0 -z-10 size-72 rounded-full bg-primary/15 blur-3xl"
      />
      <p className="text-sm font-medium text-primary">{eyebrow}</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{description}</p>
    </div>
  );
}
