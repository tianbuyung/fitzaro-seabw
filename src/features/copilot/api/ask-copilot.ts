import { type Asset } from '@/data/mock-assets'

export interface AskCopilotInput {
  assetData: Asset
  question: string
}

export interface AskCopilotResponse {
  answer: string
}

export async function askCopilot(input: AskCopilotInput): Promise<AskCopilotResponse> {
  const res = await fetch('/api/copilot', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })

  if (!res.ok) {
    throw new Error('Failed to get copilot response')
  }

  return res.json() as Promise<AskCopilotResponse>
}
