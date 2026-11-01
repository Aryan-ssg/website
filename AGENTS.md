<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project rules for AI agents

## Stack

Next.js 16.4 (App Router), React 19, TypeScript strict, Tailwind CSS v4, shadcn/ui
(`base-nova` style), React Hook Form 7, Zod 4, Supabase (`@supabase/ssr` 0.12).

## Non-negotiables

1. **Next.js 16 conventions only.** Read `node_modules/next/dist/docs/` before writing code.
   - Session/request interception goes in `proxy.ts` (exported as `export function proxy`).
     `middleware.ts` is deprecated.
   - `cookies()`, `headers()`, `params` and `searchParams` are async. Always `await` them.
   - `next lint` no longer exists. Run `npm run lint` (ESLint CLI).
   - Turbopack is the default bundler; do not add webpack config.
2. **Tailwind v4.** There is no `tailwind.config.ts`. Design tokens live in
   `app/globals.css` using `@theme`. Never create a Tailwind v3 config file.
3. **Validate with Zod.** Every form and every API payload gets a schema in
   `lib/validations/`. Reuse the same schema on the server.
4. **Never expose secrets.** `SUPABASE_SERVICE_ROLE_KEY` stays in server-only files.
   Anything prefixed `NEXT_PUBLIC_` is public forever.
5. **Keep it simple.** No monorepo, no Prisma, no tRPC, no Redux, no barrel
   `index.ts` files, no `services/` + `repositories/` layering, no `src/` wrapper.
6. **Do not install packages** without a concrete feature that needs them.
   The deferred list is in `README.md`.
7. **Verify before claiming success.** `npm run typecheck` and `npm run build`
   must both pass. Do not claim a command succeeded unless it was run.

## Layout

- `app/` — routes only.
- `components/ui/` — shadcn-generated; treat as vendored.
- `components/sections/` — hand-written page sections.
- `lib/supabase/` — Supabase clients.
- `lib/validations/` — Zod schemas.
- `proxy.ts` — Supabase session refresh only.

## Environment

- `.env.example` lists variable names only and is committed.
- `.env.local` holds real values and is git-ignored.
- A fresh clone with no `.env.local` must still build and run.
