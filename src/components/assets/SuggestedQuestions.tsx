'use client'

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void
}

const SUGGESTIONS: readonly string[] = [
  "What's the risk profile of this asset?",
  'How is the yield generated?',
  'Is this asset suitable for first-time investors?',
]

/**
 * Empty-state helper for the copilot chat.
 *
 * SRP: surfaces a small set of canned questions. The parent decides
 * what happens when one is clicked (it typically pre-fills the input).
 */
export function SuggestedQuestions({ onSelect }: SuggestedQuestionsProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
        Try asking
      </p>
      <ul className="flex flex-wrap gap-2">
        {SUGGESTIONS.map((question) => (
          <li key={question}>
            <button
              type="button"
              onClick={() => onSelect(question)}
              className="rounded-full border border-gray-200 px-3 py-1.5 text-xs text-gray-700 transition-colors hover:border-[var(--color-primary)] hover:bg-amber-50 hover:text-[var(--color-primary)]"
            >
              {question}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
