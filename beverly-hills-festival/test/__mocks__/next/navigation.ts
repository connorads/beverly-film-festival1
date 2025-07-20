import { vi } from 'vitest'

let pathname = '/'

export const useRouter = vi.fn(() => ({
  push: vi.fn((path: string) => {
    pathname = path
    return Promise.resolve()
  }),
  replace: vi.fn((path: string) => {
    pathname = path
    return Promise.resolve()
  }),
  prefetch: vi.fn(() => Promise.resolve()),
  back: vi.fn(),
  forward: vi.fn(),
  refresh: vi.fn(),
  pathname: pathname,
  route: pathname,
  query: {},
  asPath: pathname,
  basePath: '',
  isReady: true,
  isPreview: false,
}))

export const usePathname = vi.fn(() => pathname)
export const useSearchParams = vi.fn(() => new URLSearchParams())
export const useParams = vi.fn(() => ({}))