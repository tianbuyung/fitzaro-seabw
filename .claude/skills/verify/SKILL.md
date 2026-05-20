---
name: verify
description: Validate the codebase with a full build, lint, and test pass. Use before committing or opening a PR.
---

Run all three checks in sequence using pnpm:

1. `pnpm build` — catches TypeScript errors and Next.js build failures.
2. `pnpm lint` — catches ESLint violations.
3. `pnpm test:run` — runs Vitest tests (single pass, non-interactive).

Report any errors clearly with the failing check and what needs to be fixed.
If all three pass, confirm the codebase is clean and ready to commit.
