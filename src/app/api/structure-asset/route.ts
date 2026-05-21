import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `You are a micro-business credit structuring expert specializing in Southeast Asian SMEs. Given a business description, output ONLY valid JSON with no markdown, no code fences, and no explanation. Output exactly these fields:
- tokenName: string (memorable 3-5 word name, e.g. "Bangkok Coffee Shop")
- ticker: string (4-8 chars uppercase with hyphen, e.g. "CAFE-BKK01")
- category: exactly "Micro"
- country: string (country name)
- profitShare: number (realistic profit share %, e.g. 13.0 — range 8–18)
- repaymentMultiple: number (total repayment as a multiple of principal, e.g. 1.4)
- useOfFunds: string (short phrase describing what the capital will be used for)
- riskScore: integer 1-10 (1=lowest risk, 10=highest)
- riskRationale: string (1 sentence explaining the risk score)
- recommendedChain: one of exactly "Base" | "Polygon" | "Arbitrum"
- tokenSupply: number (total tokens to issue)
- tokenPrice: number (price per token in USD, keep small for micro businesses: $5–$25)
- summary: string (2 sentences for investors, plain language — explain what the business does and how investors share in its profit)

Use "profit share" not "APY" or "interest". Returns track real business performance. Output JSON only. No other text.`

// Simple in-memory rate limiter
const calls: number[] = []
const RATE_LIMIT = 10
const WINDOW_MS = 60 * 1000

function checkRateLimit(): boolean {
  const now = Date.now()
  const recent = calls.filter((t) => now - t < WINDOW_MS)
  if (recent.length >= RATE_LIMIT) return false
  calls.push(now)
  return true
}

export async function POST(req: NextRequest) {
  if (!checkRateLimit()) {
    return NextResponse.json({ error: 'Rate limit exceeded. Try again in a minute.' }, { status: 429 })
  }

  const body = await req.json().catch(() => null)
  if (!body?.description || typeof body.description !== 'string' || body.description.trim().length < 10) {
    return NextResponse.json({ error: 'Please provide a description of at least 10 characters.' }, { status: 400 })
  }

  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: `Business description: ${body.description.trim()}` }],
    })

    const text = message.content[0].type === 'text' ? message.content[0].text : ''
    const clean = text.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(clean)

    // Validate required fields
    const required = [
      'tokenName', 'ticker', 'category', 'country', 'profitShare', 'repaymentMultiple',
      'useOfFunds', 'riskScore', 'riskRationale', 'recommendedChain', 'tokenSupply',
      'tokenPrice', 'summary',
    ]
    for (const field of required) {
      if (!(field in parsed)) throw new Error(`Missing field: ${field}`)
    }

    return NextResponse.json(parsed)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('Asset structuring error:', message)
    const isDev = process.env.NODE_ENV === 'development'
    return NextResponse.json(
      { error: isDev ? `AI structuring failed: ${message}` : 'AI structuring failed. Please try again.' },
      { status: 500 }
    )
  }
}
