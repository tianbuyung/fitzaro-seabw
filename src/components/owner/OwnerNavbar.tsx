'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AuthButton } from '@/components/ui/AuthButton'

interface NavLink {
  href: string
  label: string
}

const NAV_LINKS: NavLink[] = [
  { href: '/owner/dashboard', label: 'My Businesses' },
]

export function OwnerNavbar() {
  const pathname = usePathname()

  const isActive = (href: string): boolean => {
    if (!pathname) return false
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b-2 border-[#7F77DD]/20 bg-white">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Link href="/owner/dashboard" className="text-xl font-bold text-[#7F77DD] tracking-tight">
              Fitzaro
            </Link>
            <span className="rounded-full bg-[#7F77DD]/10 px-2 py-0.5 text-xs font-semibold text-[#7F77DD]">
              Owner
            </span>
          </div>

          <ul className="hidden items-center gap-6 sm:flex">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href)
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative text-sm font-medium transition-colors ${
                      active ? 'text-[#7F77DD]' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {link.label}
                    {active && (
                      <span
                        aria-hidden
                        className="absolute -bottom-[22px] left-0 right-0 h-0.5 bg-[#7F77DD]"
                      />
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="flex items-center gap-3">
          <AuthButton />
          <Link
            href="/owner/tokenize"
            className="inline-flex items-center rounded-lg bg-[#7F77DD] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#6b64c4]"
          >
            + Tokenize
          </Link>
        </div>
      </nav>
    </header>
  )
}
