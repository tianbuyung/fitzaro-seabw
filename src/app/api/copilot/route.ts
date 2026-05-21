import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'
import { Asset } from '@/data/mock-assets'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `You are Fitzaro AI — an expert advisor for micro-business profit-share investments in Southeast Asia.
Answer investor questions about the provided business clearly and honestly.
Be specific to the business data given — reference actual numbers like profit share %, repayment multiple, and risk score.
Explain that investors receive a share of the business's monthly net profit until repaid the stated multiple. Strong months pay more, slow months pay less. This is profit sharing, not fixed interest.
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
Business: ${asset.tokenName}
Country: ${asset.country}
Category: ${asset.category}
Profit share: ${asset.profitShare}% of monthly net profit
Repayment multiple: ${asset.repaymentMultiple}x (investors are repaid ${asset.repaymentMultiple}x their principal)
Use of funds: ${asset.useOfFunds}
Risk score: ${asset.riskScore}/10
Risk rationale: ${asset.riskRationale}
Token price: $${asset.tokenPrice} per token
Total supply: ${asset.tokenSupply.toLocaleString()} tokens
Chain: ${asset.recommendedChain}
Business description: ${asset.description}
Summary: ${asset.summary}
`

  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Business context:\n${assetContext}\n\nInvestor question: ${question}`,
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
