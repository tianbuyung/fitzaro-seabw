'use client'

const FILTER_OPTIONS = ['All', 'Agricultural', 'Property', 'Invoice', 'Infrastructure'] as const

export type AssetFilterValue = (typeof FILTER_OPTIONS)[number]

interface AssetFiltersProps {
  selected: string
  onChange: (value: string) => void
}

export function AssetFilters({ selected, onChange }: AssetFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter assets by type">
      {FILTER_OPTIONS.map((option) => {
        const isActive = selected === option
        const baseClass =
          'inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
        const stateClass = isActive
          ? 'bg-primary text-white'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'

        return (
          <button
            key={option}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(option)}
            className={`${baseClass} ${stateClass}`}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}
