import { type Asset, formatCurrency } from '@/data/mock-assets'

interface PayoutTrackerProps {
  assets: Asset[]
}

interface PayoutEntry {
  month: string
  assetName: string
  amount: number
  status: 'Paid' | 'Pending'
}

const PAYOUT_MONTHS = ['March 2026', 'April 2026', 'May 2026']

function generatePayouts(assets: Asset[]): PayoutEntry[] {
  const entries: PayoutEntry[] = []

  for (const asset of assets) {
    const monthlyBase = (asset.totalValue * asset.profitShare) / 100 / 12
    PAYOUT_MONTHS.forEach((month, i) => {
      const variance = 0.85 + (((asset.riskScore * (i + 1) * 7) % 30) / 100)
      entries.push({
        month,
        assetName: asset.tokenName,
        amount: Math.round(monthlyBase * variance),
        status: month === 'May 2026' ? 'Pending' : 'Paid',
      })
    })
  }

  return entries.sort((a, b) => b.month.localeCompare(a.month))
}

export function PayoutTracker({ assets }: PayoutTrackerProps) {
  if (assets.length === 0) return null

  const payouts = generatePayouts(assets)
  const totalPaid = payouts
    .filter((p) => p.status === 'Paid')
    .reduce((sum, p) => sum + p.amount, 0)

  return (
    <section aria-label="Payout tracker">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Payout History</h2>
        <span className="text-sm text-gray-500">
          Total received:{' '}
          <span className="font-semibold text-gray-900">{formatCurrency(totalPaid)}</span>
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-400"
              >
                Month
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-400"
              >
                Business
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wide text-gray-400"
              >
                Amount
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wide text-gray-400"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {payouts.map((payout, i) => (
              <tr key={i} className="hover:bg-gray-50/50">
                <td className="px-4 py-3 text-sm text-gray-600">{payout.month}</td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{payout.assetName}</td>
                <td className="px-4 py-3 text-right text-sm font-semibold text-gray-900">
                  {formatCurrency(payout.amount)}
                </td>
                <td className="px-4 py-3 text-right">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                      payout.status === 'Paid'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {payout.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
