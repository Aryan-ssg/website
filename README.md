# Business Website Starter

A production-ready starting point for business websites and web apps.

Built with **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS v4**, **shadcn/ui**, **React Hook Form**, **Zod** and **Supabase**.

---

## Quick start

```powershell
# 1. Install dependencies (already done if you cloned after setup)
npm install

# 2. Create your local environment file and fill in the values
Copy-Item .env.example .env.local

# 3. Start the dev server
npm run dev
```

Open <http://localhost:3000>. The contact form lives at <http://localhost:3000/contact>.

> **Windows PowerShell note:** PowerShell 5.1 does not support `&&`. Use `;` or separate lines.

---

## What is installed and why

### Framework

| Package | Why it is here |
|---|---|
| `next` | Routing, server rendering, API route handlers. |
| `react` / `react-dom` | The UI library Next.js renders. |
| `typescript` | Type checking. Catches mistakes before the browser does. |

### Styling and UI

| Package | Why it is here |
|---|---|
| `tailwindcss` | Utility classes instead of hand-written CSS files. |
| `@tailwindcss/turbopack` | Compiles Tailwind inside Next 16's default bundler. |
| `shadcn` | Copies accessible UI components into `components/ui/` so you own the code. |
| `@base-ui/react` | The unstyled primitives shadcn components are built on. |
| `cn` | Merges Tailwind class names without conflicts (`cn("px-2", "px-4")` → `px-4`). |
| `lucide-react` | Icon set. |
| `sonner` | Toast notifications. |
| `tw-animate-css` | Animation utilities for Tailwind v4. |

### Forms and validation

| Package | Why it is here |
|---|---|
| `react-hook-form` | Form state without re-rendering on every keystroke. |
| `@hookform/resolvers` | Connects a Zod schema to React Hook Form. |
| `zod` | One schema validates the form **and** the server. |

### Backend

| Package | Why it is here |
|---|---|
| `@supabase/supabase-js` | Database, authentication and file storage client. |
| `@supabase/ssr` | Keeps the Supabase session in cookies so server components can read it. |

Not installed yet, and deliberately so: Resend (email), Razorpay (payments), n8n (automation), Docker, test frameworks, and any database ORM. Add each one when a real feature needs it.

---

## Project structure

```
app/                         Routes. A folder name is a URL segment.
  layout.tsx                 Root shell: fonts, <Toaster>, shared UI.
  page.tsx                   Homepage.
  globals.css                Tailwind v4 entry point + design tokens.
  (marketing)/contact/       Public contact page. Route groups do not affect URLs.
components/
  ui/                        shadcn components. Treat these as vendored code.
  sections/                  Your own sections: contact form, hero, pricing.
lib/
  supabase/                  Browser and server Supabase clients.
  validations/               Zod schemas, one file per form.
proxy.ts                     Next 16 proxy: refreshes the Supabase session.
```

Rules of thumb:

- `app/` is for routing only. Business logic belongs in `lib/`.
- `components/ui/` is generated. `components/sections/` is yours.
- Add a `hooks/` or `types/` folder only when a second file needs it.

---

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the development server on port 3000. |
| `npm run build` | Production build. Must pass before deploying. |
| `npm run start` | Serve the production build locally. |
| `npm run lint` | Run ESLint. |
| `npm run typecheck` | Run the TypeScript compiler with no output. |

---

## Environment variables

Copy `.env.example` to `.env.local` and fill in the blanks. `.env.local` is git-ignored.

| Variable | Public? | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical site URL for links and redirects. |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Your Supabase project URL. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Public key; database access is limited by RLS. |
| `SUPABASE_SERVICE_ROLE_KEY` | **No** | Server-only. Bypasses RLS. Never prefix it with `NEXT_PUBLIC_`. |

Anything starting with `NEXT_PUBLIC_` is embedded in the JavaScript sent to the browser. Treat it as public forever.

The phase-2 variables (Resend, Razorpay, n8n) are commented out in `.env.example`. Uncomment them when you build those features.

---

## Accounts you need to create

Nothing here costs money at this stage. No card details required.

| Account | When | What it gives you |
|---|---|---|
| [GitHub](https://github.com) | Now | Repository hosting and deployment triggers. |
| [Supabase](https://supabase.com) | When a feature needs data | Free Postgres database, auth and storage. |
| [Vercel](https://vercel.com) | When you deploy | Free hosting connected to your GitHub repo. |
| [Resend](https://resend.com) | When you send email | Transactional email API. |
| [Razorpay](https://razorpay.com) | When you take payments | Test mode is free; live mode needs business KYC. |
| [n8n](https://n8n.io) | When you automate workflows | Workflow automation, cloud or self-hosted. |

This repository contains **no real credentials**. Do not commit any.

---

## Supabase setup (when you are ready)

1. Create a project at [supabase.com](https://supabase.com).
2. Copy the project URL and anon key into `.env.local`.
3. Enable **Row Level Security** on every table before inserting data.
4. Restart `npm run dev` after changing `.env.local` — env changes are not hot-reloaded.

---

## Common problems

| Symptom | Cause and fix |
|---|---|
| `npm : running scripts is disabled` | PowerShell execution policy. Run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once. |
| Import works locally, fails on Vercel | Windows ignores filename case. Match the file's case exactly. |
| Env var change does nothing | Restart the dev server. |
| `EPERM` during install | A dev server or VS Code is holding `node_modules`. Stop them first. |
| `cookies()` returns a Promise | Next 16 requires `await cookies()`. |
| Supabase free project sleeps | Free projects pause after about a week of inactivity. Open the dashboard to wake it. |

---

## Conventions

- TypeScript `strict` is on. Avoid `any`.
- Validate every form and API payload with a Zod schema.
- Keep server secrets in server-only files. Never import them into a Client Component.
- Prefer Server Components. Add `"use client"` only when you need state, effects or browser APIs.
- One schema per form in `lib/validations/`.
