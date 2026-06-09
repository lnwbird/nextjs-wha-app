/<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Commands

- `npm run dev` — dev server on localhost:3000
- `npm run build` — production build
- `npm run lint` — eslint (flat config, `eslint-config-next`)
- No test or typecheck scripts defined

## Prisma

Schema: `prisma/schema.prisma`. Client output is non-standard — generated to `../generated/prisma` relative to `prisma/`, so imports use `../../generated/prisma/client`. Uses `@prisma/adapter-mariadb` (not the default Node driver). After schema changes: `npx prisma generate`.

## Auth

Uses `better-auth` with email/password. Server config: `src/lib/auth.ts`. Client config: `src/lib/auth-client.ts`. API route: `src/app/api/auth/[...all]/route.ts`.

## UI

shadcn/ui with `radix-luma` style, `remixicon` icon library, `mist` base color. Components in `src/components/ui/`. Add new ones with `npx shadcn@latest add <component>`. Tailwind CSS v4 via `@tailwindcss/postcss`.

## Route structure

- `src/app/(front)/` — public storefront (has its own layout with `<html lang="th">`, Navbar)
- `src/app/(auth)/` — login/signup (separate layout, Prompt/Roboto/Lora fonts)
- No root `src/app/layout.tsx` exists — each route group owns its own `<html>`

## Patterns

- Path alias: `@/*` maps to `./src/*`
- Data layer: `src/repositories/` (fetch) -> `src/services/` (business logic) -> pages
- Cart state: Zustand with `persist` middleware (localStorage key `skill-cart`)
- `cn()` utility from `@/lib/utils` for conditional class merging
