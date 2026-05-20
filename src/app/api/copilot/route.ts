import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'
import { Asset } from '@/data/mock-assets'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `You are Fitzaro AI — an expert investment advisor for Southeast Asian real-world asset tokens. 
Answer investor questions about the provided asset clearly and honestly. 
Be specific to the asset data given — reference actual numbers like yield, risk score, and country.
Flag risks honestly. Never overpromise returns.
Maximum 3 sentences per answer. 
No crypto jargon unless the investor uses it first.
Do not say "I" — speak as a knowledgeable advisor giving a direct answer.`

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  if (!body?.assetData || !body?.question) {
    return NextResponse.json({ error: 'Missing assetData or question.' }, { status: 400 })
  }

  const asset: Asset = body.assetData
  const question: string = body.question

  const assetContext = `
Asset: ${asset.tokenName} (${asset.ticker})
Type: ${asset.assetType}
Country: ${asset.country}
Annual yield: ${asset.yieldAPY}%
Risk score: ${asset.riskScore}/10
Risk rationale: ${asset.riskRationale}
Token price: $${asset.tokenPrice} per token
Total supply: ${asset.tokenSupply.toLocaleString()} tokens
Chain: ${asset.recommendedChain}
Description: ${asset.description}
Investor brief: ${asset.investorBrief}
`

  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Asset context:\n${assetContext}\n\nInvestor question: ${question}`,
        },
      ],
    })

    const answer = message.content[0].type === 'text' ? message.content[0].text : 'Unable to generate a response.'
    return NextResponse.json({ answer })
  } catch (err) {
    console.error('Copilot error:', err)
    return NextResponse.json({ error: 'AI response failed. Please try again.' }, { status: 500 })
  }
}
