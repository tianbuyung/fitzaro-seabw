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
  const totalAssets = assets.length
  const totalValueLocked = assets.reduce((sum, asset) => sum + asset.totalValue, 0)
  const avgAPY =
    totalAssets === 0
      ? '—'
      : `${(assets.reduce((sum, asset) => sum + asset.yieldAPY, 0) / totalAssets).toFixed(1)}%`
  const countries = new Set(assets.map((asset) => asset.country)).size

  const stats: Stat[] = [
    { label: 'Total Assets', value: totalAssets.toString() },
    { label: 'Total Value Locked', value: formatCurrency(totalValueLocked) },
    { label: 'Avg APY', value: avgAPY },
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
