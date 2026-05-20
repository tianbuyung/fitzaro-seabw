'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { usePrivy } from '@privy-io/react-auth'
import { AuthButton } from './AuthButton'

interface NavLink {
  href: string
  label: string
}

const NAV_LINKS: NavLink[] = [{ href: '/dashboard', label: 'Dashboard' }]

export function Navbar() {
  const pathname = usePathname()
  const { authenticated } = usePrivy()

  const isActive = (href: string): boolean => {
    if (!pathname) return false
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link
            href="/dashboard"
            className="text-xl font-bold text-primary tracking-tight"
          >
            Fitzaro
          </Link>

          <ul className="hidden items-center gap-6 sm:flex">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href)
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative text-sm font-medium transition-colors ${
                      active ? 'text-primary' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {link.label}
                    {active && (
                      <span
                        aria-hidden
                        className="absolute -bottom-[22px] left-0 right-0 h-0.5 bg-primary"
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
          {authenticated && (
            <Link
              href="/tokenize"
              className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[var(--color-primary-hover)]"
            >
              Tokenize an asset
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}
