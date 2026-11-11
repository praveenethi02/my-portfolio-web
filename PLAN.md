# 10-Day Portfolio Build Plan

## Day 1 – Setup & foundation

- [x] chore: initialize Next.js + TypeScript + Tailwind + ESLint/Prettier
- [x] feat: add shadcn/ui, next-themes, dark mode default + theme toggle
- [x] feat: base layout, navbar, footer with GitHub/LinkedIn/Jira link icons, home hero

## Day 2 – Core UI pages

- [x] feat: home page sections (about, highlights, CTA)
- [x] feat: projects page UI with static sample data
- [x] feat: contact page UI (with social links) + animations

## Day 3 – Database

- [ ] chore: set up Prisma + Neon connection and env handling
- [ ] feat: database schema (Project, Skill, Experience, Education, ContactMessage, SyncLog, Settings incl. social link URLs)
- [ ] feat: seed script + db helper queries

## Day 4 – GitHub integration

- [ ] feat: GitHub API client with types and error handling
- [ ] feat: sync GitHub repos into DB
- [ ] feat: projects page reads real data from DB (pin/hide support)

## Day 5 – Skills

- [ ] feat: compute language stats from repos
- [ ] feat: skills page UI (categories, level bars, charts)
- [ ] feat: combine manual skills + GitHub-derived skills

## Day 6 – Auth & admin shell

- [ ] feat: Auth.js setup with admin-only access
- [ ] feat: middleware protecting /admin routes
- [ ] feat: admin layout + dashboard

## Day 7 – Admin CRUD

- [ ] feat: admin skills management
- [ ] feat: admin experience, education and social links management
- [ ] feat: admin project overrides + manual sync button

## Day 8 – Jira

- [ ] feat: Jira API client
- [ ] feat: sync Jira issues into DB (public-safe fields only)
- [ ] feat: activity page with Jira profile link + admin show/hide toggle

## Day 9 – LinkedIn, automation, contact

- [ ] feat: LinkedIn JSON/CSV import in admin + LinkedIn profile link on Experience page
- [ ] ci: GitHub Actions scheduled workflow + protected /api/sync
- [ ] feat: working contact form saving to DB

## Day 10 – Polish & deploy

- [ ] feat: SEO, metadata, OG images, sitemap, robots
- [ ] style: accessibility, Lighthouse fixes, responsive polish, 404 page
- [ ] docs: README + Vercel deployment
