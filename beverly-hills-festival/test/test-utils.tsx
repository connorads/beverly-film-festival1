import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { SiteModeProvider } from '@/lib/context/site-mode'
import { AuthProvider } from '@/lib/context/auth'

import { vi } from 'vitest'

// Mock Next.js router context
const mockRouter = {
  push: vi.fn(),
  replace: vi.fn(),
  prefetch: vi.fn(),
  back: vi.fn(),
  pathname: '/',
  query: {},
  asPath: '/',
}

// Wrapper component that provides all necessary contexts
function AllTheProviders({ children }: { children: React.ReactNode }) {
  return (
    <SiteModeProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </SiteModeProvider>
  )
}

// Custom render method that includes providers
export function render(ui: React.ReactElement, options = {}) {
  return rtlRender(ui, { wrapper: AllTheProviders, ...options })
}

// Re-export everything
export * from '@testing-library/react'