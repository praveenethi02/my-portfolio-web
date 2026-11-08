import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

// Temporary home page to check the theme setup; the real hero comes in the next commit
export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 p-6 text-center">
      <ThemeToggle />
      <h1 className="text-3xl font-semibold">Praveen Ethipola</h1>
      <p className="text-muted-foreground">Computer Engineering Undergraduate</p>
      <div className="flex gap-3">
        <Button>Primary button</Button>
        <Button variant="outline">Outline button</Button>
      </div>
    </main>
  );
}
