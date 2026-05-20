# Fitzaro — SEA RWA Tokenization Platform

> Tokenize Southeast Asian real-world assets with AI. No wallet setup required for asset owners.

**SEABW 2026 Vibe Coding Hackathon** · Bangkok, Thailand · May 20–21, 2026

🔗 **Live demo:** [https://fitzaro.vercel.app](https://fitzaro.vercel.app)

---

## The problem

$3 trillion of Southeast Asian real assets — rice farmland, SME invoices, palm oil plantations,
shophouse properties — are invisible to global DeFi investors. At the same time, SEA asset owners
(farmers, SME owners) can't access global capital because the tooling assumes crypto-native users.

## The solution

Fitzaro bridges this gap. Asset owners log in with Google or email (no wallet, no seed phrase).
They describe their asset in plain language. Our AI (Claude) structures it into a compliant token
spec — yield, risk score, token supply, recommended chain. The asset appears on a marketplace where
global investors can explore, ask the AI copilot questions, and invest.

## Key features

- **Social login** — Google, email magic link, Apple for asset owners. MetaMask + WalletConnect for investors. Powered by Privy.
- **AI asset structuring** — Describe your asset in plain text → Claude generates a full token spec in seconds.
- **Token marketplace** — Browse tokenized SEA assets filtered by type and country.
- **AI investor copilot** — Ask questions about any asset and get specific, honest answers from Claude.
- **Mock token mint** — Simulate the full tokenization flow on Base testnet.

## Tech stack

| Layer     | Technology                                      |
| --------- | ----------------------------------------------- |
| Framework | Next.js 14 (App Router, TypeScript)             |
| Styling   | Tailwind CSS                                    |
| Auth      | Privy (social + wallet login)                   |
| AI        | Anthropic Claude API (claude-sonnet-4-20250514) |
| Chain     | Base testnet (simulated)                        |
| Deploy    | Vercel                                          |

## Running locally

```bash
git clone https://github.com/YOUR_USERNAME/fitzaro-seabw
cd fitzaro-seabw
npm install
cp .env.example .env.local
# Fill in your API keys in .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Required API keys

| Key                        | Where to get it                                        |
| -------------------------- | ------------------------------------------------------ |
| `ANTHROPIC_API_KEY`        | [console.anthropic.com](https://console.anthropic.com) |
| `NEXT_PUBLIC_PRIVY_APP_ID` | [dashboard.privy.io](https://dashboard.privy.io)       |
| `PRIVY_APP_SECRET`         | [dashboard.privy.io](https://dashboard.privy.io)       |

## AI collaboration

Built with Claude Code as the primary vibe coding tool for the SEABW 2026 hackathon.
All major features were generated via AI prompts with human review, integration, and testing.
Commit history shows [claude-code] tags in every commit throughout.

## Judging criteria alignment

| Criterion                 | How Fitzaro addresses it                                                                    |
| ------------------------- | ------------------------------------------------------------------------------------------- |
| **Originality (30%)**     | First RWA tokenization platform built specifically for SEA real assets with Web2 onboarding |
| **Problem-solving (30%)** | Removes both barriers: crypto complexity for owners, opacity for investors                  |
| **Completeness (20%)**    | Full working flow: login → tokenize → marketplace → AI copilot → mock mint                  |
| **Scalability (20%)**     | Clear path: structuring fees + yield spread → API licensing to SEA fintechs                 |

## License

MIT © 2026
