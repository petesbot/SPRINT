# CLAUDE.md

This file provides guidance for AI assistants (Claude Code and similar tools) working in this repository.

## Repository Overview

**Repository:** `petesbot/SPRINT`
**Product:** Sprint — an AI-powered fitness coaching app
**Live URL:** `sprint.petesimon.com` (Cloudflare Pages)
**Stack:** Next.js 16 · TypeScript · Tailwind CSS 4 · Cloudflare Pages/Workers/D1 · Clerk Auth · Claude API

---

## Project Structure

```
/
├── src/
│   ├── app/                    # Next.js App Router — one folder = one URL
│   │   ├── (auth)/             # Auth routes (grouped, no URL segment)
│   │   │   ├── login/
│   │   │   └── signup/
│   │   ├── dashboard/          # Main app shell after login
│   │   ├── workouts/           # Workout session pages
│   │   ├── calendar/           # Schedule calendar view
│   │   ├── onboarding/         # New user onboarding flow
│   │   ├── profile/            # User profile/settings
│   │   ├── layout.tsx          # Root layout (wraps every page)
│   │   └── page.tsx            # Landing page (sprint.petesimon.com)
│   ├── components/
│   │   ├── ui/                 # Reusable primitives (Button, Card, Input…)
│   │   ├── workout/            # Workout-specific components
│   │   ├── calendar/           # Calendar/scheduling components
│   │   └── layout/             # Nav, sidebar, header components
│   ├── lib/
│   │   ├── db/                 # Drizzle ORM schema and query helpers
│   │   └── ai/                 # Claude API integration for coaching logic
│   ├── hooks/                  # Custom React hooks
│   └── types/                  # Shared TypeScript types
├── .github/workflows/
│   └── deploy.yml              # CI/CD — auto-deploys on push to main/dev
├── wrangler.toml               # Cloudflare project config (D1, KV bindings)
├── .env.example                # Required environment variables (safe template)
└── next.config.ts              # Next.js + Cloudflare Pages adapter config
```

---

## Tech Stack

| Concern | Tool | Notes |
|---|---|---|
| Framework | Next.js 16 (App Router) | `src/app/` directory |
| Language | TypeScript (strict) | All files `.ts` or `.tsx` |
| Styling | Tailwind CSS v4 | Utility-first, mobile-first |
| Hosting | Cloudflare Pages | Edge-deployed globally |
| API layer | Cloudflare Workers (via Next.js edge routes) | `export const runtime = "edge"` on every route |
| Database | Cloudflare D1 + Drizzle ORM | SQLite-compatible, edge-native |
| Auth | Clerk | Login, signup, session management |
| AI coaching | Anthropic Claude API | Adaptive workout suggestions |
| Storage | Cloudflare R2 | Exercise video assets |

---

## Development Branch Convention

```
main    ← production (sprint.petesimon.com) — protected
dev     ← staging/integration — preview URL
feat/*  ← feature branches — merge into dev via PR
fix/*   ← bug fix branches
```

Always branch from `dev`, not `main`:

```bash
git checkout dev && git pull origin dev
git checkout -b feat/your-feature-name
```

---

## Commit Message Convention

Conventional Commits format:

```
<type>(<scope>): <short summary>
```

Types: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `ci`
- Subject ≤ 72 chars, lowercase after the type prefix
- No trailing period

---

## Local Development

### Prerequisites
- Node.js 22+
- A Cloudflare account (free tier works)
- A Clerk account (free tier works)
- An Anthropic API key

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Copy env template and fill in your keys
cp .env.example .env.local

# 3. Run the dev server
npm run dev
# → http://localhost:3000

# 4. To test with real Cloudflare bindings locally
npm run preview:cf
```

### Useful Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Next.js dev server (fast, hot reload) |
| `npm run build` | Standard Next.js production build |
| `npm run build:cf` | Build for Cloudflare Pages specifically |
| `npm run preview:cf` | Build + run locally with Wrangler (simulates Cloudflare) |
| `npm run typecheck` | TypeScript type check without building |
| `npm run lint` | ESLint check |

---

## Cloudflare Setup (one-time)

```bash
# Log in to Cloudflare
npx wrangler login

# Create the D1 database
npx wrangler d1 create sprint-db
# → paste the database_id into wrangler.toml

# Create KV namespace for sessions
npx wrangler kv namespace create SESSIONS
# → paste the id into wrangler.toml

# Create Pages project
npx wrangler pages project create sprint
```

---

## GitHub Secrets Required

Set these in GitHub → Settings → Secrets and variables → Actions:

| Secret | Where to get it |
|---|---|
| `CLOUDFLARE_API_TOKEN` | Cloudflare dashboard → My Profile → API Tokens |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare dashboard → right sidebar |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk dashboard → API Keys |
| `CLERK_SECRET_KEY` | Clerk dashboard → API Keys |
| `ANTHROPIC_API_KEY` | console.anthropic.com |

---

## Deployment

Deployment is automatic via GitHub Actions (`.github/workflows/deploy.yml`):

- Push to `dev` → preview deployment
- Push to `main` → production (`sprint.petesimon.com`)

Manual deploy: `npm run build:cf && npx wrangler pages deploy .vercel/output/static`

---

## Cloudflare DNS Setup

In your Cloudflare dashboard for `petesimon.com`:
1. Add CNAME record: `sprint` → `sprint.pages.dev`
2. Cloudflare Pages → Custom Domains → Add `sprint.petesimon.com`

---

## Every Route Must Export the Edge Runtime

Because we're on Cloudflare Workers (not Node.js), every page and API route needs:

```ts
export const runtime = "edge";
```

Without this, the build will fail on deployment.

---

## General Coding Conventions

- **No speculative code.** Don't add abstractions that the current task doesn't require.
- **No comments that restate the code.** Comment only when the *why* is non-obvious.
- **Validate only at system boundaries** (user input, external APIs).
- **Prefer editing existing files** to creating new ones.
- **No backwards-compat shims** unless explicitly required.

---

## Security Practices

- Never commit `.env.local` or any file with real secrets.
- All user input validated at the API boundary before touching the database.
- Authentication enforced via Clerk middleware on all `/dashboard`, `/workouts`, `/calendar`, `/profile` routes.

---

## AI Assistant Instructions

- Read this file at the start of every session.
- All development on `feat/*` branches — never commit directly to `main` or `dev`.
- Every new page/route file must include `export const runtime = "edge"`.
- Update this file whenever the stack, structure, or conventions change.
- Do not open a PR unless the user explicitly requests it.
- Confirm before any destructive operation.

---

## Roadmap

| Phase | Focus | Status |
|---|---|---|
| 0 | Foundation — Next.js scaffold, Cloudflare config, CI/CD | ✅ Done |
| 1 | Auth — Clerk login/signup, onboarding flow, athlete profile | 🔜 Next |
| 2 | Workout engine — templates, session logging, Claude AI suggestions | Planned |
| 3 | Calendar — drag-and-drop scheduling, recovery-aware reshuffling | Planned |
| 4 | Progress & polish — charts, wearable integrations, notifications | Planned |
