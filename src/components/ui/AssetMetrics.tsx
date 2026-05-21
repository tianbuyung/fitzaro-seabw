import { type Asset, formatCurrency } from '@/data/mock-assets'

interface AssetMetricsProps {
  assets: Asset[]
}

interface Stat {
  label: string
  value: string
}

function StatCard({ label, value }: Stat) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500">{label}</p>
      <p className="mt-2 text-2xl font-bold text-primary sm:text-3xl">{value}</p>
    </div>
  )
}

export function AssetMetrics({ assets }: AssetMetricsProps) {
  const totalBusinesses = assets.length
  const totalValueLocked = assets.reduce((sum, asset) => sum + asset.totalValue, 0)
  const avgProfitShare =
    totalBusinesses === 0
      ? '—'
      : `${(assets.reduce((sum, asset) => sum + asset.profitShare, 0) / totalBusinesses).toFixed(1)}%`
  const countries = new Set(assets.map((asset) => asset.country)).size

  const stats: Stat[] = [
    { label: 'Businesses', value: totalBusinesses.toString() },
    { label: 'Total Value', value: formatCurrency(totalValueLocked) },
    { label: 'Avg Profit Share', value: avgProfitShare },
    { label: 'Countries', value: countries.toString() },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.label} label={stat.label} value={stat.value} />
      ))}
    </div>
  )
}
