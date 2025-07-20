import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { SiteModeProvider } from '@/lib/context/site-mode'
import { AuthProvider } from '@/lib/context/auth'
import { Navigation } from '@/components/navigation'
import { UserRole } from '@/test/page-rules'
import * as nextNavigation from 'next/navigation'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/'),
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn()
  })),
  useSearchParams: vi.fn(() => new URLSearchParams())
}))

// Mock user for testing
const mockUser = (role: UserRole) => ({
  id: '123',
  email: 'test@example.com',
  role,
  name: 'Test User'
})

// Helper to render navigation with context
function renderNavigation(mode: 'public' | 'admin' = 'public', userRole?: UserRole) {
  const user = userRole ? mockUser(userRole) : null
  
  return render(
    <SiteModeProvider initialMode={mode}>
      <AuthProvider initialUser={user}>
        <Navigation />
      </AuthProvider>
    </SiteModeProvider>
  )
}

describe('Navigation Visibility Based on Mode and Role', () => {
  beforeEach(() => {
    // Reset localStorage mock before each test
    const localStorageMock = global.localStorage as any
    localStorageMock.getItem.mockReset()
    localStorageMock.setItem.mockReset()
    localStorageMock.removeItem.mockReset()
    localStorageMock.clear.mockReset()
    localStorageMock.getItem.mockReturnValue(null)
  })

  describe('Public Mode Navigation', () => {
    it('should show basic navigation for anonymous users', () => {
      renderNavigation('public')

      // Should see public navigation
      expect(screen.getByText('Home')).toBeInTheDocument()
      expect(screen.getByText('Films')).toBeInTheDocument()
      expect(screen.getByText('Schedule')).toBeInTheDocument()
      expect(screen.getByText('Venues')).toBeInTheDocument()
      expect(screen.getByText('Buy Tickets')).toBeInTheDocument()
      expect(screen.getByText('Awards')).toBeInTheDocument()
      expect(screen.getByText('Sponsors')).toBeInTheDocument()
      expect(screen.getByText('About')).toBeInTheDocument()
      expect(screen.getByText('Contact')).toBeInTheDocument()
      expect(screen.getByText('Submit Film')).toBeInTheDocument()

      // Should NOT see account or admin items
      expect(screen.queryByText('My Account')).not.toBeInTheDocument()
      expect(screen.queryByText('Admin Dashboard')).not.toBeInTheDocument()
    })

    it('should show account menu for authenticated attendees', () => {
      renderNavigation('public', 'attendee')

      // Should see all public navigation
      expect(screen.getByText('Films')).toBeInTheDocument()
      expect(screen.getByText('Buy Tickets')).toBeInTheDocument()

      // Should also see account menu - use getAllByText since multiple may exist
      const accountLinks = screen.getAllByText('My Account')
      expect(accountLinks.length).toBeGreaterThan(0)
      
      // Should NOT see admin items
      expect(screen.queryByText('Admin Dashboard')).not.toBeInTheDocument()
    })

    it('should show filmmaker-specific items for filmmakers', () => {
      renderNavigation('public', 'filmmaker')

      // Should see public navigation
      expect(screen.getByText('Films')).toBeInTheDocument()
      
      // Should see filmmaker-specific items
      expect(screen.getByText('Submit Film')).toBeInTheDocument()
      const accountLinks = screen.getAllByText('My Account')
      expect(accountLinks.length).toBeGreaterThan(0)
    })

    it('should show sponsor account access for sponsors', () => {
      renderNavigation('public', 'sponsor')

      // Should see public navigation
      expect(screen.getByText('Sponsors')).toBeInTheDocument()
      
      // Should see sponsor account access - use getAllByText since multiple may exist
      const accountLinks = screen.getAllByText('My Account')
      expect(accountLinks.length).toBeGreaterThan(0)
    })

    it('should NOT show admin items even for admin users in public mode', () => {
      renderNavigation('public', 'admin')

      // Should see public navigation
      expect(screen.getByText('Films')).toBeInTheDocument()
      
      // Should NOT see admin navigation in public mode
      expect(screen.queryByText('Admin Dashboard')).not.toBeInTheDocument()
      expect(screen.queryByText('Manage Films')).not.toBeInTheDocument()
    })
  })

  describe('Admin Mode Navigation', () => {
    it('should show admin navigation for admin users', () => {
      renderNavigation('admin', 'admin')

      // Should see admin navigation
      expect(screen.getByText('Admin Dashboard')).toBeInTheDocument()
      expect(screen.getByText('Manage Films')).toBeInTheDocument()
      expect(screen.getByText('Manage Schedule')).toBeInTheDocument()
      expect(screen.getByText('Manage Venues')).toBeInTheDocument()
      expect(screen.getByText('Ticket Sales')).toBeInTheDocument()
      expect(screen.getByText('Manage Sponsors')).toBeInTheDocument()
      expect(screen.getByText('Manage Awards')).toBeInTheDocument()
      expect(screen.getByText('Reports')).toBeInTheDocument()

      // Should NOT see user management (super-admin only)
      expect(screen.queryByText('Manage Users')).not.toBeInTheDocument()
      expect(screen.queryByText('Settings')).not.toBeInTheDocument()

      // Should NOT see public-only navigation
      expect(screen.queryByText('Submit Film')).not.toBeInTheDocument()
    })

    it('should show all admin navigation for super-admin users', () => {
      renderNavigation('admin', 'super-admin')

      // Should see all admin navigation including super-admin items
      expect(screen.getByText('Admin Dashboard')).toBeInTheDocument()
      expect(screen.getByText('Manage Films')).toBeInTheDocument()
      expect(screen.getByText('Manage Users')).toBeInTheDocument()
      expect(screen.getByText('Settings')).toBeInTheDocument()
    })

    it('should NOT show any navigation for non-admin users in admin mode', () => {
      renderNavigation('admin', 'attendee')

      // Should not see any admin navigation
      expect(screen.queryByText('Admin Dashboard')).not.toBeInTheDocument()
      expect(screen.queryByText('Manage Films')).not.toBeInTheDocument()
      
      // Should show access denied or redirect message
      expect(screen.getByText(/access denied|unauthorized/i)).toBeInTheDocument()
    })

    it('should NOT show navigation for anonymous users in admin mode', () => {
      renderNavigation('admin')

      // Should not see any admin navigation
      expect(screen.queryByText('Admin Dashboard')).not.toBeInTheDocument()
      
      // Should show login prompt
      expect(screen.getByText(/please log in/i)).toBeInTheDocument()
    })
  })

  describe('Navigation Item Ordering', () => {
    it('should maintain correct order in public mode', () => {
      renderNavigation('public')

      const navItems = screen.getAllByRole('link')
      const navTexts = navItems.map(item => item.textContent)

      // Check first few items are in correct order
      expect(navTexts[0]).toBe('Home')
      expect(navTexts[1]).toBe('Films')
      expect(navTexts[2]).toBe('Schedule')
      expect(navTexts[3]).toBe('Venues')
    })

    it('should maintain correct order in admin mode', () => {
      renderNavigation('admin', 'admin')

      const navItems = screen.getAllByRole('link')
      const navTexts = navItems.map(item => item.textContent)

      // Check admin items are in correct order
      expect(navTexts[0]).toBe('Admin Dashboard')
      expect(navTexts[1]).toBe('Manage Films')
      expect(navTexts[2]).toBe('Manage Schedule')
    })
  })

  describe('Navigation Responsiveness', () => {
    it('should show mobile menu button on small screens', () => {
      // Mock window.matchMedia for mobile
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(query => ({
          matches: query === '(max-width: 768px)',
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      })

      renderNavigation('public')

      expect(screen.getByLabelText(/menu/i)).toBeInTheDocument()
    })

    it('should hide navigation items on mobile until menu is opened', () => {
      // Mock for mobile
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(query => ({
          matches: query === '(max-width: 768px)',
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      })

      renderNavigation('public')

      // Navigation items should be hidden initially
      const nav = screen.getByRole('navigation')
      expect(nav).toHaveClass('mobile-closed')
    })
  })

  describe('Active Route Highlighting', () => {
    it('should highlight the current active route', () => {
      // Mock will return '/films' for this test  
      vi.mocked(nextNavigation.usePathname).mockReturnValue('/films')

      renderNavigation('public')

      const filmsLink = screen.getByText('Films').closest('a')
      expect(filmsLink).toHaveClass('active')
    })

    it('should highlight parent route when on child route', () => {
      // Mock will return child route for this test
      vi.mocked(nextNavigation.usePathname).mockReturnValue('/films/123')

      renderNavigation('public')

      const filmsLink = screen.getByText('Films').closest('a')
      expect(filmsLink).toHaveClass('active')
    })
  })

  describe('Navigation Accessibility', () => {
    it('should have proper ARIA labels', () => {
      renderNavigation('public')

      expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Main navigation')
    })

    it('should support keyboard navigation', () => {
      renderNavigation('public')

      const firstLink = screen.getByText('Home')
      const secondLink = screen.getByText('Films')
      
      firstLink.focus()
      expect(document.activeElement).toBe(firstLink)

      // Tab key behavior is handled by browser, so we'll simulate focus change
      secondLink.focus()
      expect(document.activeElement).toBe(secondLink)
    })

    it('should announce mode changes to screen readers', () => {
      // Start with public mode
      const { unmount } = renderNavigation('public')

      // Check for aria-live region
      expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite')
      expect(screen.getByRole('status')).toHaveTextContent('Viewing public site')

      // Unmount and remount with admin mode
      unmount()
      renderNavigation('admin', 'admin')

      expect(screen.getByRole('status')).toHaveTextContent('Viewing admin panel')
    })
  })
})