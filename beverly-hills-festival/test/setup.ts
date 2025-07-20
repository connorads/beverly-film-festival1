import '@testing-library/jest-dom'
import { expect, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)

afterEach(() => {
  cleanup()
  // Clear localStorage after each test
  localStorageMock.clear.mockClear()
  localStorageMock.getItem.mockClear()
  localStorageMock.setItem.mockClear()
  localStorageMock.removeItem.mockClear()
  // Reset localStorage to return null by default
  localStorageMock.getItem.mockReturnValue(null)
})

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(() => null), // Always return null by default
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  key: vi.fn(),
  length: 0
}
global.localStorage = localStorageMock as any