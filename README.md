# Fitzaro

**Tokenize Southeast Asian real-world assets. No seed phrases. No crypto knowledge required.**

Built for the [SEABW 2026 Vibe Coding Hackathon](https://seabw.io) · Bangkok, Thailand · May 20–21, 2026

[![Live Demo](https://img.shields.io/badge/Live%20Demo-fitzaro.vercel.app-E8820C?style=flat-square)](https://fitzaro.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![Powered by Claude](https://img.shields.io/badge/AI-Claude%20Sonnet-7F77DD?style=flat-square)](https://anthropic.com)

---

## The Problem

Over $3 trillion in Southeast Asian real assets — rice farmland, SME invoices, palm oil plantations, shophouse properties — remain inaccessible to global DeFi capital. The barrier cuts both ways: asset owners (farmers, SME operators) lack the technical knowledge to tokenize, while investors have no transparent window into these assets.

## The Solution

Fitzaro is a Web3 RWA tokenization platform purpose-built for Southeast Asia.

- **Asset owners** log in with Google or email (zero crypto setup), describe their asset in plain language, and let Claude AI generate a compliant token spec in seconds
- **Investors** browse a tokenized asset marketplace, run yield calculations, and get honest AI-powered answers via an embedded copilot

## Features

| Feature | Description |
|---|---|
| Social login | Google, email magic link (asset owners) + MetaMask, WalletConnect (investors) via Privy |
| AI asset structuring | Plain-text description → Claude generates token name, yield, risk score, chain recommendation |
| Marketplace | Browse and filter tokenized SEA assets by type and country |
| Investment calculator | Live yield projections based on token quantity |
| AI copilot | Ask any question about an asset — Claude answers in plain English, no jargon |
| Mock mint | Full tokenization flow simulated on Base testnet |

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript strict) |
| Styling | Tailwind CSS 4 (CSS-first config) |
| Auth | Privy `@privy-io/react-auth` v3 |
| AI | Anthropic Claude API — `claude-sonnet-4-20250514` |
| Data fetching | TanStack Query v5 |
| Chain | Base testnet (ERC-20, simulated) |
| Deploy | Vercel |

## Getting Started

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local

# Start the dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

### Environment Variables

| Variable | Description | Source |
|---|---|---|
| `ANTHROPIC_API_KEY` | Claude API key (server-only) | [console.anthropic.com](https://console.anthropic.com) |
| `NEXT_PUBLIC_PRIVY_APP_ID` | Privy app ID (public) | [dashboard.privy.io](https://dashboard.privy.io) |
| `PRIVY_APP_SECRET` | Privy secret (server-only) | [dashboard.privy.io](https://dashboard.privy.io) |
| `NEXT_PUBLIC_APP_URL` | App base URL | `http://localhost:3000` locally |

## App Routes

| Route | Description |
|---|---|
| `/login` | Two-column auth — asset owners (Google + email) / investors (all methods) |
| `/tokenize` | Describe your asset → AI generates token spec → mint |
| `/dashboard` | Tokenized asset marketplace with filters |
| `/assets/[id]` | Asset detail, investment calculator, AI copilot chat |

## Architecture

```
src/
├── app/                    # Next.js App Router (Server Components)
├── components/             # UI components (Client Components at leaf level)
│   ├── ui/                 # Shared: Navbar, AssetCard, AssetGrid, etc.
│   ├── auth/               # Login panels, OAuth buttons, email OTP
│   ├── dashboard/          # Marketplace orchestrator
│   ├── tokenize/           # Tokenization form + token spec card
│   └── assets/             # Asset detail, calculator, copilot chat
├── features/               # TanStack Query layer
│   ├── assets/             # api/ queries/ mutations/
│   ├── tokenize/           # api/ mutations/ types.ts
│   └── copilot/            # api/ mutations/
└── app/api/                # Server-side API routes (Claude calls)
    ├── structure-asset/    # POST — structures asset description with Claude
    └── copilot/            # POST — answers investor questions with Claude
```

## Built With AI

Developed using [Claude Code](https://claude.ai/code) as the primary development tool. All features were implemented through AI-assisted coding with human review, testing, and integration at every step.

---

MIT © 2026 Fitzaro
