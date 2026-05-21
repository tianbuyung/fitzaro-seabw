# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

---

## Project overview

**Fitzaro** is a Web3 RWA (Real World Asset) tokenization platform for Southeast Asian real-world assets — the "Dinari for SEA." Dinari tokenized US stocks; Fitzaro tokenizes SEA assets: rice farmland, SME invoices, palm oil plantations, shophouse properties.

Key insight: SEA asset owners (farmers, SME owners) are NOT crypto-native — they use Google and email, not MetaMask. So we use Privy for social login: no seed phrases, no wallet setup for asset owners.

Built for the SEABW 2026 Vibe Coding Hackathon (Bangkok, May 20–21, 2026).

---

## Package manager

Use **pnpm** exclusively. Never use npm or yarn.

```bash
pnpm dev        # dev server at http://localhost:3000
pnpm build      # production build + type-check
pnpm lint       # ESLint via flat config (eslint.config.mjs)
pnpm test       # Vitest in watch mode
pnpm test:run   # Vitest single pass
```

---

## Environment variables

Copy `.env.example` to `.env.local` before running locally. Required:

| Variable | Purpose |
|---|---|
| `ANTHROPIC_API_KEY` | Claude API — server-side only |
| `NEXT_PUBLIC_PRIVY_APP_ID` | Privy auth — public, safe to expose |
| `PRIVY_APP_SECRET` | Privy secret — server-side only |
| `COINGECKO_API_KEY` | Token price data |
| `NEXT_PUBLIC_APP_URL` | App base URL (e.g. `http://localhost:3000`) |

---

## Tech stack

| Layer | Tool |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript) |
| Styling | Tailwind CSS 4.x |
| Auth | Privy (`@privy-io/react-auth`) — Google, email magic link, Apple, MetaMask, WalletConnect |
| AI | Anthropic Claude API (`claude-sonnet-4-20250514`, `max_tokens: 1000`) |
| Chain | Simulated ERC-20 on Base testnet (no real deployment needed) |
| Deploy | Vercel |

- App Router only (`src/app/`). Never use the Pages Router.
- React 19 with TypeScript strict mode. No `any` types.
- Path alias: `@/*` → `./src/*`. Always use `@/` imports, never `../` across directories.
- Auth (`@privy-io/react-auth`) is client-side only — use `usePrivy()` hook in Client Components.
- `ANTHROPIC_API_KEY` and `PRIVY_APP_SECRET` are server-only. Never expose to the client.

---

## Tailwind 4 — no config file

Tailwind 4 uses CSS-first config. Customizations and theme tokens live in `src/styles/globals.css` inside `@theme inline { ... }`. Do **not** create or look for a `tailwind.config.ts` — it doesn't exist.

---

## User types

**1. Asset owner** (SEA SME / farmer / property owner)
- Logs in with **Google or email magic link only** — no MetaMask
- Zero crypto knowledge assumed
- Goal: tokenize their asset to raise capital
- Language: plain English, no crypto jargon

**2. Investor** (DeFi-native or curious)
- Can use social login **or** MetaMask / WalletConnect
- Goal: browse tokenized SEA assets, invest
- Language: can handle "APY", "ERC-20", "on-chain"

---

## Design system

| Token | Value |
|---|---|
| Primary | `#E8820C` (warm amber-orange) |
| Secondary | `#7F77DD` (purple) |
| Accent | `#FFC44D` (light amber) |

- Font: Geist (already loaded in root layout)
- Style: warm, approachable, SME-friendly fintech. Not corporate-cold. No crypto neon. No dark mode for hackathon.
- Risk score badges: 1–3 → green, 4–6 → amber, 7–10 → red (see `getRiskLabel()` in `src/data/mock-assets.ts`)

---

## Page routes

| Route | Purpose |
|---|---|
| `/login` | Two-column auth: left = asset owner (Google + email only), right = investor (all options) |
| `/tokenize` | Protected. Textarea → POST `/api/structure-asset` → token spec card → "Mint" → localStorage → `/dashboard` |
| `/dashboard` | Marketplace. Shows `MOCK_ASSETS` + localStorage assets. Metrics, filter bar, asset grid cards. |
| `/assets/[id]` | 60% asset detail + investment calculator, 40% AI Copilot chat (calls `/api/copilot`) |

All protected routes redirect to `/login` if not authenticated.

---

## API routes

### `POST /api/structure-asset`
- Body: `{ description: string }` (min 10 chars)
- Calls Claude with asset structuring prompt, returns JSON token spec
- Response fields: `tokenName`, `ticker`, `assetType`, `country`, `yieldAPY`, `riskScore`, `riskRationale`, `recommendedChain`, `tokenSupply`, `tokenPrice`, `investorBrief`
- Errors: 400 (missing/short description), 429 (rate limit), 500 (Claude failure)
- See exact system prompt in `src/app/api/structure-asset/route.ts`

### `POST /api/copilot`
- Body: `{ assetData: Asset, question: string }`
- Returns: `{ answer: string }`
- See exact system prompt in `src/app/api/copilot/route.ts`

Claude model for all API routes: `claude-sonnet-4-6`, `max_tokens: 1000`.

---

## Data

- `Asset` interface and `MOCK_ASSETS` array: `src/data/mock-assets.ts`
- Helper exports: `getAssetById()`, `getRiskLabel()`, `formatCurrency()`
- User-submitted (tokenized) assets are persisted in `localStorage` and merged with `MOCK_ASSETS` on the dashboard

---

## Server vs Client Components

**Pages (`page.tsx`, `layout.tsx`) are always Server Components — never add `'use client'` at the top level.**

`'use client'` belongs only at the component level (leaves of the tree). The pattern:

```
app/dashboard/page.tsx        ← Server Component (no 'use client')
  └─ components/dashboard/DashboardView.tsx  ← 'use client' (has hooks/state)
```

Providers in `src/components/providers/` are Client Components (they use React context), but `layout.tsx` itself stays a Server Component and just imports them.

---

## Feature structure (TanStack Query)

All data fetching lives in `src/features/[feature]/`:

```
src/features/
  assets/
    api/          ← raw fetch functions (no hooks)
    queries/      ← useQuery hooks (use-assets.ts, use-asset.ts)
    mutations/    ← useMutation hooks (use-save-asset.ts)
  tokenize/
    api/          ← structureAsset() fetch fn
    mutations/    ← useStructureAsset() mutation hook
    types.ts      ← StructuredAsset type (Pick from Asset)
  copilot/
    api/          ← askCopilot() fetch fn
    mutations/    ← useCopilot() mutation hook
```

Query keys are centralised in `src/lib/query-keys.ts` — never use magic strings.

**Rule:** Components import from `queries/` or `mutations/`. They never call `fetch()` directly or import from `api/` directly.

---

## SOLID principles

Apply SOLID to every component, hook, API route, and utility — see `.claude/rules/solid.md` (auto-loaded). Key rules in brief:

- **S**: one component/hook/route = one responsibility. If you write "and" to describe it, split it.
- **O**: extend via props/composition/union types — don't edit existing components to add variants.
- **L**: every valid `Asset` must work wherever `Asset` is accepted — no silent edge-case failures.
- **I**: split large prop interfaces; don't pass props a component doesn't use.
- **D**: pass data and callbacks via props/context — components don't import from data files directly.

## Build rules

1. Write complete, copy-paste-ready code. No placeholders like `// add your logic here` or `// implement this`.
2. Every component must be TypeScript with proper types. No `any`.
3. Use Tailwind for all styling. No separate CSS files unless absolutely necessary.
4. After each feature, explain exactly how to test it: what to click, what to expect.
5. Build one feature at a time. Confirm it works before moving to the next.
6. If unsure about behavior or design, ask before writing.

---

## Commit convention

Use **scoped** Conventional Commits with an Opus co-author trailer. Format:

```
type(scope): description

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
```

| Type | When |
|---|---|
| `feat` | new feature |
| `fix` | bug fix |
| `chore` | tooling, deps, config |
| `docs` | documentation only |
| `refactor` | no behaviour change |
| `style` | formatting, UI-only |
| `test` | tests only |

| Scope | What |
|---|---|
| `auth` | Privy, login, session |
| `assets` | asset data, cards, grid |
| `tokenize` | tokenize page and form |
| `dashboard` | dashboard/marketplace |
| `copilot` | AI copilot chat |
| `ui` | shared components |
| `api` | API route handlers |
| `config` | setup, env, tooling |

Example: `feat(auth): add two-column login page with Privy flows`

---

## Validation

```bash
pnpm build && pnpm lint && pnpm test:run
```
