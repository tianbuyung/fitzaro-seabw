import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Vitest with `globals: false` does not auto-unmount RTL renders between
// tests, so we wire it up here. Without this, DOM nodes leak across tests
// and `getByRole` / `getByText` see duplicates.
afterEach(() => {
  cleanup()
})
