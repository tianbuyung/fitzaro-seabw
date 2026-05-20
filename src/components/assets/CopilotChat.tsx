'use client'

import { useEffect, useRef, useState } from 'react'
import { useCopilot } from '@/features/copilot/mutations/use-copilot'
import type { Asset } from '@/data/mock-assets'
import { CopilotMessage } from './CopilotMessage'
import { SuggestedQuestions } from './SuggestedQuestions'

interface CopilotChatProps {
  asset: Asset
}

interface ChatMessage {
  role: 'user' | 'assistant'
  text: string
}

/**
 * Orchestrator for the AI copilot chat panel.
 *
 * SRP: owns the conversation state (messages + input) and wires the
 * `useCopilot` mutation hook to the presentational children. Rendering
 * each message and the suggestion pills is delegated to their own
 * components so this stays focused on conversational flow.
 */
export function CopilotChat({ asset }: CopilotChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState<string>('')
  const { mutateAsync, isPending } = useCopilot()
  const scrollRef = useRef<HTMLDivElement | null>(null)

  // Auto-scroll the chat to the latest message whenever messages or the
  // pending indicator change.
  useEffect(() => {
    const node = scrollRef.current
    if (!node) return
    node.scrollTop = node.scrollHeight
  }, [messages, isPending])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    const question = input.trim()
    if (!question || isPending) return

    setMessages((prev) => [...prev, { role: 'user', text: question }])
    setInput('')

    try {
      const response = await mutateAsync({ assetData: asset, question })
      setMessages((prev) => [...prev, { role: 'assistant', text: response.answer }])
    } catch (error) {
      const fallback =
        error instanceof Error
          ? `Sorry, I couldn't answer that: ${error.message}`
          : "Sorry, I couldn't reach the AI right now. Please try again."
      setMessages((prev) => [...prev, { role: 'assistant', text: fallback }])
    }
  }

  const isEmpty = messages.length === 0

  return (
    <section
      aria-label="AI copilot chat"
      className="flex h-full max-h-[80vh] min-h-[28rem] flex-col rounded-2xl bg-white shadow-sm ring-1 ring-gray-100"
    >
      <header className="border-b border-gray-100 px-5 py-4">
        <h2 className="text-base font-semibold text-gray-900">Fitzaro AI</h2>
        <p className="mt-0.5 text-xs text-gray-500">
          Ask anything about {asset.tokenName}.
        </p>
      </header>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-5 py-4"
        aria-live="polite"
      >
        {isEmpty ? (
          <div className="flex h-full flex-col items-start justify-end gap-4">
            <p className="text-sm text-gray-500">
              Hi! I can break down this asset&apos;s risk, yield, or fit for
              your portfolio. Pick a question to get started.
            </p>
            <SuggestedQuestions onSelect={setInput} />
          </div>
        ) : (
          <ul className="flex flex-col gap-4">
            {messages.map((message, index) => (
              <li key={`${message.role}-${index}`}>
                <CopilotMessage role={message.role} text={message.text} />
              </li>
            ))}
            {isPending && (
              <li>
                <CopilotMessage role="assistant" text="Thinking…" />
              </li>
            )}
          </ul>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t border-gray-100 px-4 py-3"
      >
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask about risk, yield, fit…"
          aria-label="Ask the Fitzaro AI a question"
          className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
          disabled={isPending}
        />
        <button
          type="submit"
          disabled={isPending || input.trim().length === 0}
          className="inline-flex items-center justify-center rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[var(--color-primary-hover)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </section>
  )
}
