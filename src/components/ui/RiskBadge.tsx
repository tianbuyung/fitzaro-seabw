import { getRiskLabel } from '@/data/mock-assets'

interface RiskBadgeProps {
  score: number
}

export function RiskBadge({ score }: RiskBadgeProps) {
  const { label, color, bg } = getRiskLabel(score)

  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
      style={{ color, backgroundColor: bg }}
    >
      {label}
    </span>
  )
}
