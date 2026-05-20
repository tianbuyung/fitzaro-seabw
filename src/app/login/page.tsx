import type { Metadata } from 'next'
import { LoginView } from '@/components/auth/LoginView'

export const metadata: Metadata = {
  title: 'Sign In — Fitzaro',
  description: 'Sign in to tokenize or invest in Southeast Asian real-world assets.',
}

export default function LoginPage() {
  return <LoginView />
}
