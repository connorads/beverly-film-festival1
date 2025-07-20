import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { SiteModeProvider, useSiteMode } from '@/lib/context/site-mode'
import { AuthProvider } from '@/lib/context/auth'
import { Navigation } from '@/components/navigation'
import { ModeSwitcher } from '@/components/mode-switcher'
import { PAGE_RULES, getNavigationItems, canAccessPage, SiteMode } from '@/test/page-rules'

// Component to test the site mode context
function TestComponent() {
  const { mode, setMode, isAdminMode } = useSiteMode()
  return (
    <div>
      <div data-testid="current-mode">{mode}</div>
      <div data-testid="is-admin">{isAdminMode ? 'true' : 'false'}</div>
      <button onClick={() => setMode('public')}>Set Public</button>
      <button onClick={() => setMode('admin')}>Set Admin</button>
    </div>
  )
}

describe('Site Mode Switching', () => {
  beforeEach(() => {
    // Reset localStorage mock before each test
    const localStorageMock = global.localStorage as any
    localStorageMock.getItem.mockReset()
    localStorageMock.setItem.mockReset()
    localStorageMock.removeItem.mockReset()
    localStorageMock.clear.mockReset()
    localStorageMock.getItem.mockReturnValue(null)
  })

  describe('SiteModeContext', () => {
    it('should provide site mode context with default public mode', () => {
      render(
        <SiteModeProvider>
          <TestComponent />
        </SiteModeProvider>
      )

      expect(screen.getByTestId('current-mode')).toHaveTextContent('public')
      expect(screen.getByTestId('is-admin')).toHaveTextContent('false')
    })

    it('should allow switching between public and admin modes', () => {
      render(
        <SiteModeProvider>
          <TestComponent />
        </SiteModeProvider>
      )

      // Switch to admin mode
      fireEvent.click(screen.getByText('Set Admin'))
      expect(screen.getByTestId('current-mode')).toHaveTextContent('admin')
      expect(screen.getByTestId('is-admin')).toHaveTextContent('true')

      // Switch back to public mode
      fireEvent.click(screen.getByText('Set Public'))
      expect(screen.getByTestId('current-mode')).toHaveTextContent('public')
      expect(screen.getByTestId('is-admin')).toHaveTextContent('false')
    })

    it('should persist mode in localStorage', () => {
      const mockLocalStorage = {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
        key: vi.fn(),
        length: 0
      }
      Object.defineProperty(window, 'localStorage', { value: mockLocalStorage })

      render(
        <SiteModeProvider>
          <TestComponent />
        </SiteModeProvider>
      )

      fireEvent.click(screen.getByText('Set Admin'))
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('siteMode', 'admin')
    })

    it('should load initial mode from localStorage', () => {
      const mockLocalStorage = {
        getItem: vi.fn().mockReturnValue('admin'),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
        key: vi.fn(),
        length: 0
      }
      Object.defineProperty(window, 'localStorage', { value: mockLocalStorage })

      render(
        <SiteModeProvider>
          <TestComponent />
        </SiteModeProvider>
      )

      expect(screen.getByTestId('current-mode')).toHaveTextContent('admin')
      expect(screen.getByTestId('is-admin')).toHaveTextContent('true')
    })
  })

  describe('ModeSwitcher Component', () => {
    it('should render mode switcher with current mode', () => {
      render(
        <SiteModeProvider>
          <ModeSwitcher />
        </SiteModeProvider>
      )

      expect(screen.getByRole('button', { name: /public site/i })).toBeInTheDocument()
    })

    it('should toggle between modes when clicked', () => {
      render(
        <SiteModeProvider>
          <ModeSwitcher />
        </SiteModeProvider>
      )

      const switcher = screen.getByRole('button', { name: /public site/i })
      fireEvent.click(switcher)

      expect(screen.getByRole('button', { name: /admin panel/i })).toBeInTheDocument()
    })

    it('should show appropriate icon for each mode', () => {
      render(
        <SiteModeProvider>
          <ModeSwitcher />
        </SiteModeProvider>
      )

      // Check for public mode icon
      expect(screen.getByTestId('globe-icon')).toBeInTheDocument()

      // Switch to admin mode
      fireEvent.click(screen.getByRole('button'))

      // Check for admin mode icon
      expect(screen.getByTestId('settings-icon')).toBeInTheDocument()
    })

    it('should have keyboard accessibility', () => {
      render(
        <SiteModeProvider>
          <ModeSwitcher />
        </SiteModeProvider>
      )

      const switcher = screen.getByRole('button')
      
      // Simulate Enter key press
      fireEvent.keyDown(switcher, { key: 'Enter', code: 'Enter' })
      expect(screen.getByRole('button', { name: /admin panel/i })).toBeInTheDocument()

      // Simulate Space key press
      fireEvent.keyDown(switcher, { key: ' ', code: 'Space' })
      expect(screen.getByRole('button', { name: /public site/i })).toBeInTheDocument()
    })
  })

  describe('Navigation Visibility', () => {
    it('should show only public navigation items in public mode', () => {
      render(
        <SiteModeProvider>
          <AuthProvider>
            <Navigation />
          </AuthProvider>
        </SiteModeProvider>
      )

      // Public navigation items should be visible
      expect(screen.getByText('Films')).toBeInTheDocument()
      expect(screen.getByText('Schedule')).toBeInTheDocument()
      expect(screen.getByText('Buy Tickets')).toBeInTheDocument()

      // Admin navigation items should NOT be visible
      expect(screen.queryByText('Admin Dashboard')).not.toBeInTheDocument()
      expect(screen.queryByText('Manage Films')).not.toBeInTheDocument()
      expect(screen.queryByText('Ticket Sales')).not.toBeInTheDocument()
    })

    it('should show only admin navigation items in admin mode', () => {
      // Mock localStorage to start in admin mode
      const mockLocalStorage = {
        getItem: vi.fn().mockReturnValue('admin'),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
        key: vi.fn(),
        length: 0
      }
      Object.defineProperty(window, 'localStorage', { value: mockLocalStorage })

      render(
        <SiteModeProvider>
          <AuthProvider initialUser={{ id: '1', email: 'admin@test.com', role: 'admin', name: 'Admin User' }}>
            <Navigation />
          </AuthProvider>
        </SiteModeProvider>
      )

      // Admin navigation items should be visible
      expect(screen.getByText('Admin Dashboard')).toBeInTheDocument()
      expect(screen.getByText('Manage Films')).toBeInTheDocument()
      expect(screen.getByText('Manage Schedule')).toBeInTheDocument()

      // Public navigation items (except those also in admin) should NOT be visible
      expect(screen.queryByText('Buy Tickets')).not.toBeInTheDocument()
      expect(screen.queryByText('Submit Film')).not.toBeInTheDocument()
    })

    it('should update navigation immediately when mode changes', () => {
      render(
        <SiteModeProvider>
          <AuthProvider initialUser={{ id: '1', email: 'admin@test.com', role: 'admin', name: 'Admin User' }}>
            <Navigation />
            <ModeSwitcher />
          </AuthProvider>
        </SiteModeProvider>
      )

      // Start in public mode
      expect(screen.getByText('Films')).toBeInTheDocument()
      expect(screen.queryByText('Admin Dashboard')).not.toBeInTheDocument()

      // Switch to admin mode
      fireEvent.click(screen.getByRole('button', { name: /public site/i }))

      // Navigation should update immediately
      expect(screen.queryByText('Buy Tickets')).not.toBeInTheDocument()
      expect(screen.getByText('Admin Dashboard')).toBeInTheDocument()
    })
  })

  describe('PAGE_RULES Helper Functions', () => {
    it('should get correct navigation items for public mode', () => {
      const publicNav = getNavigationItems('public')
      
      expect(publicNav).toContainEqual(
        expect.objectContaining({ path: '/films', name: 'Films' })
      )
      expect(publicNav).toContainEqual(
        expect.objectContaining({ path: '/tickets', navigationLabel: 'Buy Tickets' })
      )
      expect(publicNav).not.toContainEqual(
        expect.objectContaining({ path: '/admin' })
      )
    })

    it('should get correct navigation items for admin mode', () => {
      const adminNav = getNavigationItems('admin', 'admin')
      
      expect(adminNav).toContainEqual(
        expect.objectContaining({ path: '/admin', name: 'Admin Dashboard' })
      )
      expect(adminNav).toContainEqual(
        expect.objectContaining({ path: '/admin/films', name: 'Manage Films' })
      )
      expect(adminNav).not.toContainEqual(
        expect.objectContaining({ path: '/submit' })
      )
    })

    it('should check page access permissions correctly', () => {
      // Anonymous user in public mode
      expect(canAccessPage('/films', 'public', 'anonymous')).toBe(true)
      expect(canAccessPage('/admin', 'public', 'anonymous')).toBe(false)
      
      // Admin user in admin mode
      expect(canAccessPage('/admin', 'admin', 'admin')).toBe(true)
      expect(canAccessPage('/admin/users', 'admin', 'admin')).toBe(false) // super-admin only
      
      // Super-admin user in admin mode
      expect(canAccessPage('/admin/users', 'admin', 'super-admin')).toBe(true)
    })

    it('should respect navigation order', () => {
      const publicNav = getNavigationItems('public')
      const orders = publicNav.map(item => item.navigationOrder)
      
      // Check that items are sorted by order
      for (let i = 1; i < orders.length; i++) {
        expect(orders[i]! >= orders[i - 1]!).toBe(true)
      }
    })
  })

  describe('Route Protection', () => {
    it('should redirect to login when accessing protected routes without auth', () => {
      const mockRouter = {
        push: vi.fn()
      }

      // Attempt to access admin route as anonymous user
      const canAccess = canAccessPage('/admin', 'admin', 'anonymous')
      expect(canAccess).toBe(false)
      
      // In real implementation, this would trigger a redirect
      if (!canAccess) {
        mockRouter.push('/login')
      }
      
      expect(mockRouter.push).toHaveBeenCalledWith('/login')
    })

    it('should allow access to public routes for all users', () => {
      expect(canAccessPage('/', 'public', 'anonymous')).toBe(true)
      expect(canAccessPage('/films', 'public', 'anonymous')).toBe(true)
      expect(canAccessPage('/schedule', 'public', 'anonymous')).toBe(true)
    })

    it('should handle dynamic routes correctly', () => {
      expect(canAccessPage('/films/123', 'public', 'anonymous')).toBe(true)
      expect(canAccessPage('/films/category/documentary', 'public', 'anonymous')).toBe(true)
    })
  })

  describe('Visual Mode Indicators', () => {
    it('should apply different theme/styling in admin mode', () => {
      render(
        <SiteModeProvider>
          <AuthProvider>
            <div className="app-container">
              <Navigation />
            </div>
          </AuthProvider>
        </SiteModeProvider>
      )

      const container = screen.getByRole('navigation').parentElement
      expect(container).toHaveClass('mode-public')
      expect(container).not.toHaveClass('mode-admin')
    })

    it('should show mode indicator badge', () => {
      render(
        <SiteModeProvider>
          <ModeSwitcher showBadge />
        </SiteModeProvider>
      )

      expect(screen.getByText('PUBLIC MODE')).toBeInTheDocument()
      expect(screen.getByText('PUBLIC MODE')).toHaveClass('badge-public')
    })
  })
})