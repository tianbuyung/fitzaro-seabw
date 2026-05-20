import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `You are an RWA tokenization expert specializing in Southeast Asian real-world assets. Given an asset description, output ONLY valid JSON with no markdown, no code fences, and no explanation. Output exactly these fields:
- tokenName: string (memorable 3-5 word name)
- ticker: string (4-6 chars uppercase, e.g. RICE-WJ01)
- assetType: one of exactly "Agricultural" | "Property" | "Invoice" | "Infrastructure"
- country: string (country name)
- yieldAPY: number (realistic annual yield %, e.g. 12.0)
- riskScore: integer 1-10 (1=lowest risk, 10=highest)
- riskRationale: string (1 sentence explaining the risk score)
- recommendedChain: one of exactly "Base" | "Polygon" | "Arbitrum"
- tokenSupply: number (total tokens to issue)
- tokenPrice: number (price per token in USD)
- investorBrief: string (2 sentences for investors, plain language, no crypto jargon)

Output JSON only. No other text.`

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
      messages: [{ role: 'user', content: `Asset description: ${body.description.trim()}` }],
    })

    const text = message.content[0].type === 'text' ? message.content[0].text : ''
    const clean = text.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(clean)

    // Validate required fields
    const required = ['tokenName', 'ticker', 'assetType', 'country', 'yieldAPY', 'riskScore',
      'riskRationale', 'recommendedChain', 'tokenSupply', 'tokenPrice', 'investorBrief']
    for (const field of required) {
      if (!(field in parsed)) throw new Error(`Missing field: ${field}`)
    }

    return NextResponse.json(parsed)
  } catch (err) {
    console.error('Asset structuring error:', err)
    return NextResponse.json({ error: 'AI structuring failed. Please try again.' }, { status: 500 })
  }
}
