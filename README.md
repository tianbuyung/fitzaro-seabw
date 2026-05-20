# Fitzaro

**Tokenize Southeast Asian real-world assets. No seed phrases. No crypto knowledge required.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-fitzaro.vercel.app-E8820C?style=flat-square)](https://fitzaro.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![Powered by Claude](https://img.shields.io/badge/AI-Claude%20Sonnet-7F77DD?style=flat-square)](https://anthropic.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](./LICENSE)

Built for the [SEABW 2026 Vibe Coding Hackathon](https://seabw.io) · Bangkok, Thailand · May 20–21, 2026

---

## Overview

Over $3 trillion in Southeast Asian real assets — rice farmland, SME invoices, palm oil plantations, shophouse properties — remain inaccessible to global DeFi capital. The barrier cuts both ways:

- **Asset owners** (farmers, SME operators) lack the technical knowledge to tokenize their assets
- **Investors** have no transparent, AI-guided window into these opportunities

Fitzaro bridges this gap. Asset owners log in with Google or email — no wallet, no seed phrase. They describe their asset in plain language and Claude AI structures it into a compliant token spec in seconds. Investors browse the marketplace, calculate projected yields, and get honest answers from an AI copilot.

---

## Features

| Feature | Description |
|---|---|
| Social login | Google + email magic link for asset owners; MetaMask + WalletConnect for investors — powered by Privy |
| AI asset structuring | Plain-text description → Claude generates token name, ticker, yield, risk score, and chain recommendation |
| Marketplace | Browse and filter tokenized SEA assets by type (Agricultural, Property, Invoice, Infrastructure) |
| Investment calculator | Live yield projections (annual + monthly) based on token quantity |
| AI copilot | Ask any question about an asset — Claude answers in plain English, no crypto jargon |
| Mock mint | Full tokenization flow simulated on EVM testnet, persisted to localStorage |

---

## Architecture

```
src/
├── app/                      # Next.js App Router (Server Components)
│   ├── api/
│   │   ├── structure-asset/  # POST — structures asset description with Claude
│   │   └── copilot/          # POST — AI investor Q&A
│   ├── dashboard/            # Marketplace page
│   ├── login/                # Auth page
│   ├── tokenize/             # Tokenization page
│   └── assets/[id]/          # Asset detail page
├── components/               # UI components ('use client' at leaf level only)
│   ├── ui/                   # Shared: Navbar, AssetCard, AssetGrid, RiskBadge, etc.
│   ├── auth/                 # Login panels, OAuth buttons, email OTP form
│   ├── dashboard/            # Marketplace orchestrator
│   ├── tokenize/             # Asset form + token spec card
│   └── assets/               # Asset detail, investment calculator, copilot chat
├── features/                 # TanStack Query data layer
│   ├── assets/               # api/ · queries/ · mutations/
│   ├── tokenize/             # api/ · mutations/ · types.ts
│   └── copilot/              # api/ · mutations/
└── data/                     # mock-assets.ts — Asset type, helpers, seed data
```

**Key patterns:**
- Pages (`page.tsx`) are always Server Components — `'use client'` only at the component leaf level
- Components receive data via props/context — never import from data files directly (SOLID D)
- All data fetching goes through `features/` hooks — components never call `fetch()` directly

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript strict mode) |
| Styling | Tailwind CSS 4 (CSS-first config, no `tailwind.config.ts`) |
| Auth | Privy `@privy-io/react-auth` v3 — social + embedded wallets |
| AI | Anthropic Claude API — `claude-sonnet-4-20250514`, `max_tokens: 1000` |
| Data fetching | TanStack Query v5 — query keys centralised in `src/lib/query-keys.ts` |
| Testing | Vitest + React Testing Library + jest-dom |
| Chain | EVM testnet (ERC-20, simulated — no real deployment) |
| Deploy | Vercel |

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/fitzaro-v0.git
cd fitzaro-v0

# Install dependencies (pnpm only)
pnpm install

# Set up environment variables
cp .env.example .env.local
# Fill in your API keys — see Environment Variables below

# Start the dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to the dashboard.

---

## Environment Variables

| Variable | Description | Where to get it |
|---|---|---|
| `ANTHROPIC_API_KEY` | Claude API key — **server-only, never expose to client** | [console.anthropic.com](https://console.anthropic.com) |
| `NEXT_PUBLIC_PRIVY_APP_ID` | Privy app ID — public, safe to expose | [dashboard.privy.io](https://dashboard.privy.io) |
| `PRIVY_APP_SECRET` | Privy secret — **server-only** | [dashboard.privy.io](https://dashboard.privy.io) |
| `COINGECKO_API_KEY` | Token price data | [coingecko.com/api](https://www.coingecko.com/en/api) |
| `NEXT_PUBLIC_APP_URL` | App base URL | `http://localhost:3000` locally, your Vercel URL in production |

> **Security:** `ANTHROPIC_API_KEY` and `PRIVY_APP_SECRET` are consumed only in API routes. They must never appear in client-side code.

---

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start dev server at `http://localhost:3000` |
| `pnpm build` | Production build + TypeScript check |
| `pnpm start` | Start production server (after build) |
| `pnpm lint` | ESLint via flat config (`eslint.config.mjs`) |
| `pnpm test` | Vitest in watch mode |
| `pnpm test:run` | Vitest single pass (CI-friendly) |

---

## API Docs

### `POST /api/structure-asset`

Structures a plain-text asset description into a token spec using Claude.

**Request**
```json
{ "description": "I own a 5-hectare palm oil plantation in Riau..." }
```

**Response**
```json
{
  "tokenName": "Riau Palm Oil Plantation",
  "ticker": "PALM-RI01",
  "assetType": "Agricultural",
  "country": "Indonesia",
  "yieldAPY": 14.5,
  "riskScore": 4,
  "riskRationale": "Commodity price exposure offset by stable offtake agreements.",
  "recommendedChain": "Base",
  "tokenSupply": 100000,
  "tokenPrice": 50,
  "investorBrief": "..."
}
```

**Errors:** `400` (missing/short description — min 10 chars) · `429` (rate limit) · `500` (Claude failure)

---

### `POST /api/copilot`

Answers an investor question about a specific asset using Claude.

**Request**
```json
{
  "assetData": { /* full Asset object */ },
  "question": "What is the liquidity risk of this asset?"
}
```

**Response**
```json
{ "answer": "Liquidity risk is moderate — tokens are issued on EVM testnet with..." }
```

**Errors:** `400` (missing fields) · `500` (Claude failure)

---

## Testing

```bash
pnpm test:run
```

**Test suites (20 tests):**

| File | Coverage |
|---|---|
| `mock-assets.test.ts` | `getRiskLabel()`, `formatCurrency()`, `getAssetById()` |
| `CopilotMessage.test.tsx` | User / assistant bubble rendering |
| `SuggestedQuestions.test.tsx` | 3 pill buttons, click callbacks |
| `AssetForm.test.tsx` | Min-length validation, submit, character count |
| `InvestmentCalculator.test.tsx` | Default yield calc, recalculation on token change |

---

## Deployment

The app is deployed on Vercel. To deploy your own instance:

1. Push to GitHub
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Add all environment variables in **Vercel → Settings → Environment Variables**
4. Set `NEXT_PUBLIC_APP_URL` to your Vercel deployment URL
5. In the [Privy dashboard](https://dashboard.privy.io), add your Vercel URL to **Allowed Origins**
6. In [Google Cloud Console](https://console.cloud.google.com), add `https://auth.privy.io/api/v1/oauth/callback` to **Authorized Redirect URIs**

---

## Known Limitations

| Area | Limitation |
|---|---|
| **Persistence** | User-minted assets are stored in `localStorage` — they don't sync across devices or browsers and are lost on a browser data clear |
| **Auth** | Wallet login (MetaMask, WalletConnect) requires HTTPS — cannot be tested on `http://localhost:3000` without a tunnel or deployment |
| **Chain** | No real smart contract is deployed — the "mint" action is fully simulated; tokens exist only in the app |
| **Investment** | No actual payment or fund transfer — the investment calculator is a projection tool only |
| **Rate limiting** | `/api/structure-asset` rate limit (10 req/min) is in-memory and resets on server restart |
| **AI output** | Claude may occasionally return malformed JSON for the token spec — the app handles this with a 500 error but does not retry automatically |
| **Scale** | Mock marketplace has 5 seed assets; no backend database or admin CMS for adding real assets |

---

## Known Bugs & Gaps

- **No portfolio view** — investors can browse assets but have no dashboard showing their holdings or total invested
- **No asset images** — asset cards and detail pages use type badges instead of real photos; the data model has no image field
- **No re-mint protection** — submitting the tokenize form twice creates duplicate assets in localStorage with different UUIDs
- **Copilot chat is not persisted** — refreshing the asset detail page clears the conversation history
- **`COINGECKO_API_KEY` is wired but unused** — the price feed integration was planned but not implemented in the hackathon scope
- **Email OTP UX** — the "Use a different email" reset button clears the code input but does not cancel the pending Privy OTP session; users may need to wait before requesting a new code

---

## Contributing

This project was built for a hackathon. Contributions, forks, and feedback are welcome.

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit using Conventional Commits: `feat(scope): description`
4. Open a pull request

---

## Roadmap

> Post-hackathon priorities — contributions welcome.

- [ ] Real smart contract deployment on EVM mainnet
- [ ] On-chain asset attestation via [EAS (Ethereum Attestation Service)](https://attest.org) — verifiable proof of asset ownership and token spec
- [ ] On-chain yield distribution (ERC-20 dividend mechanism)
- [ ] KYC/KYB integration for regulated asset classes
- [ ] Multi-language support (Bahasa Indonesia, Thai, Vietnamese)
- [ ] Secondary market trading between investors
- [ ] Chainlink price feeds for real-time asset valuation

---

## License

MIT © 2026 Fitzaro
