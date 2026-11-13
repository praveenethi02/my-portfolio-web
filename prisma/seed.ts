// Fills the database with starting data. Run with: npm run db:seed
// Safe to run many times: it uses upsert, so existing rows are updated, not duplicated.

import { config } from "dotenv";
import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "../src/generated/prisma/client";

config({ path: ".env.local", quiet: true });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set. Add it to .env.local (see .env.example).");
}

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

// Skills used to build this portfolio. Levels are a starting guess; edit them later in /admin.
const skills = [
  { name: "TypeScript", category: "Languages", level: 60 },
  { name: "JavaScript", category: "Languages", level: 65 },
  { name: "React", category: "Frontend", level: 60 },
  { name: "Next.js", category: "Frontend", level: 55 },
  { name: "Tailwind CSS", category: "Frontend", level: 60 },
  { name: "PostgreSQL", category: "Backend", level: 45 },
  { name: "Prisma", category: "Backend", level: 45 },
  { name: "Git & GitHub", category: "Tools", level: 60 },
];

async function main() {
  // Settings: one row with id = 1, holding the social links shown on the site
  await prisma.settings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      githubUsername: "praveenethi02",
      githubUrl: "https://github.com/praveenethi02",
      linkedinUrl: "https://www.linkedin.com/in/praveen-ethipola-390b37345",
      jiraUrl: null,
      showJiraActivity: true,
    },
  });

  for (const [index, skill] of skills.entries()) {
    await prisma.skill.upsert({
      where: { name: skill.name },
      update: {},
      create: { ...skill, sortOrder: index },
    });
  }

  const [settingsCount, skillCount] = await Promise.all([
    prisma.settings.count(),
    prisma.skill.count(),
  ]);
  console.log(`Seed finished: ${settingsCount} settings row, ${skillCount} skills.`);
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
