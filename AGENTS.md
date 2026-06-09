<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Commands

- `npm run dev` — dev server at localhost:3000
- `npm run build` — production build
- `npm run lint` — ESLint (eslint-config-next, flat config)
- No test framework is configured

## Prisma

Prisma schema is at `prisma/schema.prisma`. Client output is custom:
```
output = "../generated/prisma"
```
Import the client from `../../generated/prisma/client`, not `@prisma/client`. After schema changes, run `npx prisma generate`. The DB adapter is `@prisma/adapter-mariadb` — not the standard Prisma client connection.

## Authentication

Uses `better-auth` with email/password. Server: `src/lib/auth.ts`. Client: `src/lib/auth-client.ts`. API catch-all route: `src/app/api/auth/[...all]/route.ts`.

## UI

shadcn/ui (`radix-luma` style, `remixicon` icon library). Components live in `src/components/ui/`. Add new components with `npx shadcn@latest add <component>`. Tailwind v4 with `@tailwindcss/postcss` — no `tailwind.config.*` file exists.

## Route structure

- `src/app/(front)/` — public storefront (has its own layout with Navbar)
- `src/app/(auth)/` — login/signup (separate layout, Prompt/Roboto/Lora fonts)
- No root `src/app/layout.tsx` — each route group owns its own `<html>` and fonts

## Key patterns

- Path alias: `@/*` → `./src/*`
- Data layer: `src/repositories/` (raw fetch) → `src/services/` (business logic)
- Client state: Zustand with `persist` middleware (localStorage key: `skill-cart`)
- Utility: `cn()` from `@/lib/utils` for class merging
