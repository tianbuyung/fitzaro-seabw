import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { QueryProvider } from '@/components/providers/QueryProvider'
import { PrivyProvider } from '@/components/providers/PrivyProvider'
import '@/styles/globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Fitzaro — Tokenize SEA Real Assets',
  description:
    'Tokenize Southeast Asian real-world assets. Invest in rice farms, SME invoices, palm oil plantations, and property tokens.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          <PrivyProvider>{children}</PrivyProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
