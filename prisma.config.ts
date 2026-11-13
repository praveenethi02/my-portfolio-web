import { config } from "dotenv";
import { defineConfig, env } from "prisma/config";

// Next.js reads .env.local by itself, but the Prisma CLI does not, so load it here
config({ path: ".env.local", quiet: true });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    // Command run by `prisma db seed` (npm run db:seed)
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    // Migrations need a direct (non-pooled) connection
    url: env("DIRECT_URL"),
  },
});
