'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSiteMode } from '@/lib/context/site-mode'
import { useAuth } from '@/lib/context/auth'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { Film, Calendar, Trophy, User, LogOut, Settings, Menu } from 'lucide-react'

export function Navigation() {
  const { mode, setMode } = useSiteMode()
  const { user, isAuthenticated, logout, isLoading } = useAuth()
  const router = useRouter()

  const guestLinks = [
    { href: '/', label: 'Home' },
    { href: '/films', label: 'Films' },
    { href: '/schedule', label: 'Schedule' },
    { href: '/tickets', label: 'Tickets' },
    { href: '/about', label: 'About' },
  ]

  const filmmakerLinks = [
    { href: '/', label: 'Dashboard' },
    { href: '/filmmaker/submit', label: 'Submit Film' },
    { href: '/filmmaker/submissions', label: 'My Submissions' },
    { href: '/filmmaker/screenings', label: 'Screenings' },
    { href: '/filmmaker/networking', label: 'Networking' },
  ]

  const sponsorLinks = [
    { href: '/', label: 'Dashboard' },
    { href: '/sponsor/opportunities', label: 'Sponsorship' },
    { href: '/sponsor/events', label: 'Events' },
    { href: '/sponsor/analytics', label: 'Analytics' },
    { href: '/sponsor/benefits', label: 'Benefits' },
  ]

  // Show different links based on mode and authentication
  const getNavigationLinks = () => {
    if (mode === 'admin') {
      // Admin mode links
      return [
        { href: '/admin', label: 'Dashboard' },
        { href: '/admin/films', label: 'Films' },
        { href: '/admin/schedule', label: 'Schedule' },
        { href: '/admin/attendees', label: 'Attendees' },
        { href: '/admin/analytics', label: 'Analytics' },
      ];
    } else if (isAuthenticated && user?.role === 'filmmaker') {
      // Filmmaker portal links
      return filmmakerLinks;
    } else if (isAuthenticated && user?.role === 'sponsor') {
      // Sponsor portal links  
      return sponsorLinks;
    } else {
      // Public mode links
      return guestLinks;
    }
  };

  const currentLinks = getNavigationLinks();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 mr-6">
          <Film className="h-6 w-6" />
          <span className="font-bold text-xl">Beverly Hills Film Festival</span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {currentLinks.map((link) => (
              <NavigationMenuItem key={link.href}>
                <Link href={link.href} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {link.label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right side actions */}
        <div className="ml-auto flex items-center space-x-4">
          {/* Mode Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                {mode === 'public' ? 'Public' : 'Admin'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Switch Mode</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => {
                setMode('public');
                router.push('/');
              }}>
                Public Mode
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                setMode('admin');
                router.push('/admin');
              }}>
                Admin Mode
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Auth Actions */}
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  {user.firstName} {user.lastName}
                  <div className="text-xs text-muted-foreground">{user.email}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => {
                  if (user.role === 'filmmaker') {
                    router.push('/submitter/dashboard')
                  } else if (user.role === 'admin') {
                    router.push('/admin/dashboard')
                  } else {
                    router.push('/account')
                  }
                }}>
                  <User className="mr-2 h-4 w-4" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/account/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => logout()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              onClick={() => {
                if (mode === 'admin') {
                  router.push('/admin/login')
                } else {
                  // For public mode, show portal selection
                  router.push('/portals')
                }
              }}
              disabled={isLoading}
            >
              Sign In
            </Button>
          )}

          {/* Mobile menu */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  )
}

// Helper component for complex menu items
const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'