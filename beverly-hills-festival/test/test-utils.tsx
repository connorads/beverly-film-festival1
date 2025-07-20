import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { SiteModeProvider } from '@/lib/context/site-mode'
import { AuthProvider } from '@/lib/context/auth'

// Mock Next.js router context
const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
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