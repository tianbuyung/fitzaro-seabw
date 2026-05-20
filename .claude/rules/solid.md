---
description: SOLID principles translated into practical Next.js / React / TypeScript patterns for Fitzaro. Apply these to every component, hook, API route, and utility you write.
---

# SOLID Principles

## S — Single Responsibility

Every file/module/component has exactly one reason to change.

- **Components**: render one UI concern. A card that displays an asset should not also handle minting logic.
- **Hooks**: encapsulate one piece of logic (`useAssetFilters`, `useCopilot`, `useWalletAuth` — not one hook that does all three).
- **API routes**: one route, one responsibility. `/api/structure-asset` structures; it does not save or send emails.
- **Utilities**: `formatCurrency`, `getRiskLabel`, `getAssetById` — each does one thing.

If you find yourself writing "and" to describe what something does, split it.

## O — Open/Closed

Open for extension, closed for modification.

- Extend components via **props, children, and composition** — not by editing them.
- Add new asset types or login methods by adding code; existing components should not need to change.
- Use TypeScript discriminated unions so new variants are handled at the type level, not with `if/else` chains inside existing functions.

```ts
// Good — extend by adding a new union member, not by editing the switch
type AssetType = 'Agricultural' | 'Property' | 'Invoice' | 'Infrastructure'
```

## L — Liskov Substitution

Any component or function that accepts an abstraction must work correctly with all valid implementations.

- If a component accepts `Asset`, every valid `Asset` object must render correctly — no silent failures for edge-case fields.
- Don't cast types to satisfy TypeScript (`as Asset`) to force an incompatible shape through — fix the type instead.
- Subtypes (e.g., a specialised `AgriculturalAsset` that extends `Asset`) must be usable wherever `Asset` is expected without breaking anything.

## I — Interface Segregation

Don't force a component to accept props it doesn't use.

- Split large prop interfaces into focused ones.

```ts
// Bad — AssetCard only renders; it doesn't need action handlers
interface AssetCardProps {
  asset: Asset
  onMint: () => void
  onBuy: () => void
  onShare: () => void
}

// Good — separate display from actions
interface AssetCardProps { asset: Asset }
interface AssetActionsProps { asset: Asset; onMint: () => void; onBuy: () => void }
```

- Avoid "god" prop objects passed wholesale through component trees. Pass only what each layer needs.

## D — Dependency Inversion

High-level components depend on abstractions (interfaces, props), not on concrete implementations.

- **Pass callbacks as props** instead of importing side effects directly inside a component.
- **React Context** is the DI container for cross-cutting concerns (Privy auth state, asset data).
- API routes depend on the Anthropic client interface — initialise it once at the top of the route, don't instantiate inside handler logic.
- When a component needs data, it should receive it via props or context — not `import` it directly from a data file (except in Server Components or `page.tsx` which are the composition root).

```ts
// Bad — component is tightly coupled to the mock data source
import { MOCK_ASSETS } from '@/data/mock-assets'
export function Dashboard() { return <AssetGrid assets={MOCK_ASSETS} /> }

// Good — data flows in; Dashboard doesn't care where it came from
export function Dashboard({ assets }: { assets: Asset[] }) { ... }
```
