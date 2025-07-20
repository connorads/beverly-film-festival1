'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useSiteMode } from '@/lib/context/site-mode'
import { useAuth } from '@/lib/context/auth'
import { getNavigationItems } from '@/test/page-rules'
import { Menu } from 'lucide-react'

export function Navigation() {
  const pathname = usePathname()
  const { mode, isAdminMode } = useSiteMode()
  const { user } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  // Get navigation items based on mode and user role
  const navItems = getNavigationItems(mode, user?.role || 'anonymous')

  // Check if user can access admin mode
  if (isAdminMode && (!user || (user.role !== 'admin' && user.role !== 'super-admin'))) {
    return (
      <nav role="navigation" aria-label="Main navigation">
        <div role="status" aria-live="polite" className="sr-only">
          Viewing admin panel
        </div>
        <div className="p-4 text-center">
          {!user ? (
            <p>Please log in to access the admin panel</p>
          ) : (
            <p>Access denied. You are not authorized to view this page.</p>
          )}
        </div>
      </nav>
    )
  }

  const isActiveRoute = (path: string) => {
    if (path === '/') return pathname === '/'
    return pathname.startsWith(path)
  }

  // Add mode class to parent container for styling
  React.useEffect(() => {
    const appContainer = document.querySelector('.app-container');
    if (appContainer) {
      appContainer.classList.remove('mode-public', 'mode-admin');
      appContainer.classList.add(`mode-${mode}`);
    }
  }, [mode]);

  return (
    <nav 
      role="navigation" 
      aria-label="Main navigation"
      className={cn(
        'navigation',
        isMobileMenuOpen ? 'mobile-open' : 'mobile-closed'
      )}
    >
      <div role="status" aria-live="polite" className="sr-only">
        {isAdminMode ? 'Viewing admin panel' : 'Viewing public site'}
      </div>

      {/* Mobile menu button */}
      <button
        className="md:hidden p-2"
        aria-label="Menu"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu size={24} />
      </button>

      {/* Navigation items */}
      <div className={cn(
        'flex flex-col md:flex-row gap-4',
        'md:block',
        isMobileMenuOpen ? 'block' : 'hidden md:block'
      )}>
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={cn(
              'nav-link',
              isActiveRoute(item.path) && 'active'
            )}
          >
            {item.navigationLabel || item.name}
          </Link>
        ))}

        {/* My Account link for authenticated users in public mode */}
        {!isAdminMode && user && (
          <Link
            href="/account"
            className={cn(
              'nav-link',
              isActiveRoute('/account') && 'active'
            )}
          >
            My Account
          </Link>
        )}
      </div>
    </nav>
  )
}