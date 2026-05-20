---
name: nextjs-agent
description: Next.js development skill for Fitzaro. Handles pages, layouts, components, and API routes. Invoke when building or modifying any frontend or backend file.
---

Before writing any Next.js code, read the relevant doc in `node_modules/next/dist/docs/` — the bundled docs match the installed version and are the source of truth over training data.

For Privy auth work → fetch https://docs.privy.io/llms.txt or invoke `@agent-privy`.

## SOLID

Follow SOLID for every file — full rules in `.claude/rules/solid.md`. Key reminders: one component = one concern, split large prop interfaces, data flows in via props (not direct imports from data files except in `page.tsx` as composition root).

## Project constraints

- App Router only (`src/app/`). No Pages Router.
- `pnpm` only. Path alias `@/` → `./src/`. TypeScript strict — no `any`.
- Complete code only — no `// implement this` or `// add logic here` placeholders.
- Tailwind CSS 4: no `tailwind.config.ts`. All customizations in `src/styles/globals.css` inside `@theme inline { ... }`.

## After every change

`pnpm build && pnpm lint`, then tell the user exactly what to click and what to expect.
