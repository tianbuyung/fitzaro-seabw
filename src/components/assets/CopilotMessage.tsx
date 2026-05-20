interface CopilotMessageProps {
  role: 'user' | 'assistant'
  text: string
}

/**
 * Pure presentational chat bubble.
 *
 * SRP: only renders one message. The orchestrator owns the list and
 * scroll behaviour.
 */
export function CopilotMessage({ role, text }: CopilotMessageProps) {
  const isUser = role === 'user'
  const label = isUser ? 'You' : 'Fitzaro AI'
  const bubbleClass = isUser
    ? 'bg-amber-100 text-amber-950'
    : 'bg-gray-100 text-gray-800'
  const alignment = isUser ? 'items-end' : 'items-start'

  return (
    <div className={`flex flex-col gap-1 ${alignment}`}>
      <span className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
        {label}
      </span>
      <div
        className={`max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-2 text-sm leading-relaxed shadow-sm ${bubbleClass}`}
      >
        {text}
      </div>
    </div>
  )
}
