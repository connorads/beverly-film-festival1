/**
 * PAGE_RULES Manifest
 * 
 * This manifest defines the routing rules and access permissions for the Beverly Hills Film Festival
 * application. It serves as the single source of truth for:
 * 
 * 1. Which pages are accessible in each mode (public vs admin)
 * 2. Navigation visibility rules
 * 3. Authentication requirements
 * 4. Page metadata and descriptions
 */

export type SiteMode = 'public' | 'admin'
export type UserRole = 'anonymous' | 'attendee' | 'filmmaker' | 'sponsor' | 'admin' | 'super-admin'

export interface PageRule {
  path: string
  name: string
  description: string
  modes: SiteMode[]
  requiredRoles: UserRole[]
  showInNavigation: boolean
  navigationLabel?: string
  navigationOrder?: number
  children?: PageRule[]
}

export const PAGE_RULES: PageRule[] = [
  // Public Site Pages
  {
    path: '/',
    name: 'Home',
    description: 'Festival homepage with featured films and announcements',
    modes: ['public', 'admin'],
    requiredRoles: ['anonymous'],
    showInNavigation: true,
    navigationOrder: 1
  },
  {
    path: '/films',
    name: 'Films',
    description: 'Browse all films in the festival',
    modes: ['public', 'admin'],
    requiredRoles: ['anonymous'],
    showInNavigation: true,
    navigationOrder: 2,
    children: [
      {
        path: '/films/:id',
        name: 'Film Detail',
        description: 'Detailed view of a specific film',
        modes: ['public', 'admin'],
        requiredRoles: ['anonymous'],
        showInNavigation: false
      },
      {
        path: '/films/category/:category',
        name: 'Films by Category',
        description: 'Browse films by category',
        modes: ['public', 'admin'],
        requiredRoles: ['anonymous'],
        showInNavigation: false
      }
    ]
  },
  {
    path: '/schedule',
    name: 'Schedule',
    description: 'Festival screening schedule',
    modes: ['public', 'admin'],
    requiredRoles: ['anonymous'],
    showInNavigation: true,
    navigationOrder: 3
  },
  {
    path: '/venues',
    name: 'Venues',
    description: 'Festival venue information',
    modes: ['public', 'admin'],
    requiredRoles: ['anonymous'],
    showInNavigation: true,
    navigationOrder: 4
  },
  {
    path: '/tickets',
    name: 'Tickets',
    description: 'Purchase festival tickets and passes',
    modes: ['public', 'admin'],
    requiredRoles: ['anonymous'],
    showInNavigation: true,
    navigationLabel: 'Buy Tickets',
    navigationOrder: 5
  },
  {
    path: '/awards',
    name: 'Awards',
    description: 'Festival awards and competitions',
    modes: ['public', 'admin'],
    requiredRoles: ['anonymous'],
    showInNavigation: true,
    navigationOrder: 6
  },
  {
    path: '/sponsors',
    name: 'Sponsors',
    description: 'Our festival sponsors and partners',
    modes: ['public', 'admin'],
    requiredRoles: ['anonymous'],
    showInNavigation: true,
    navigationOrder: 7
  },
  {
    path: '/about',
    name: 'About',
    description: 'About the Beverly Hills Film Festival',
    modes: ['public', 'admin'],
    requiredRoles: ['anonymous'],
    showInNavigation: true,
    navigationOrder: 8
  },
  {
    path: '/contact',
    name: 'Contact',
    description: 'Contact information and support',
    modes: ['public', 'admin'],
    requiredRoles: ['anonymous'],
    showInNavigation: true,
    navigationOrder: 9
  },

  // Authentication Pages
  {
    path: '/login',
    name: 'Login',
    description: 'User login page',
    modes: ['public', 'admin'],
    requiredRoles: ['anonymous'],
    showInNavigation: false
  },
  {
    path: '/register',
    name: 'Register',
    description: 'Create a new account',
    modes: ['public'],
    requiredRoles: ['anonymous'],
    showInNavigation: false
  },
  {
    path: '/forgot-password',
    name: 'Forgot Password',
    description: 'Password recovery',
    modes: ['public'],
    requiredRoles: ['anonymous'],
    showInNavigation: false
  },

  // User Account Pages
  {
    path: '/account',
    name: 'My Account',
    description: 'User account dashboard',
    modes: ['public'],
    requiredRoles: ['attendee', 'filmmaker', 'sponsor'],
    showInNavigation: true,
    navigationOrder: 10,
    children: [
      {
        path: '/account/tickets',
        name: 'My Tickets',
        description: 'View purchased tickets',
        modes: ['public'],
        requiredRoles: ['attendee'],
        showInNavigation: false
      },
      {
        path: '/account/submissions',
        name: 'My Submissions',
        description: 'Manage film submissions',
        modes: ['public'],
        requiredRoles: ['filmmaker'],
        showInNavigation: false
      },
      {
        path: '/account/profile',
        name: 'Profile',
        description: 'Edit profile information',
        modes: ['public'],
        requiredRoles: ['attendee', 'filmmaker', 'sponsor'],
        showInNavigation: false
      }
    ]
  },

  // Film Submission Pages
  {
    path: '/submit',
    name: 'Submit Film',
    description: 'Submit your film to the festival',
    modes: ['public'],
    requiredRoles: ['anonymous', 'filmmaker'],
    showInNavigation: true,
    navigationOrder: 11
  },
  {
    path: '/submit/guidelines',
    name: 'Submission Guidelines',
    description: 'Film submission requirements',
    modes: ['public'],
    requiredRoles: ['anonymous'],
    showInNavigation: false
  },

  // Admin Pages
  {
    path: '/admin',
    name: 'Admin Dashboard',
    description: 'Festival administration dashboard',
    modes: ['admin'],
    requiredRoles: ['admin', 'super-admin'],
    showInNavigation: true,
    navigationOrder: 1
  },
  {
    path: '/admin/films',
    name: 'Manage Films',
    description: 'Manage festival films and submissions',
    modes: ['admin'],
    requiredRoles: ['admin', 'super-admin'],
    showInNavigation: true,
    navigationOrder: 2
  },
  {
    path: '/admin/schedule',
    name: 'Manage Schedule',
    description: 'Manage screening schedule',
    modes: ['admin'],
    requiredRoles: ['admin', 'super-admin'],
    showInNavigation: true,
    navigationOrder: 3
  },
  {
    path: '/admin/venues',
    name: 'Manage Venues',
    description: 'Manage festival venues',
    modes: ['admin'],
    requiredRoles: ['admin', 'super-admin'],
    showInNavigation: true,
    navigationOrder: 4
  },
  {
    path: '/admin/tickets',
    name: 'Ticket Sales',
    description: 'Monitor and manage ticket sales',
    modes: ['admin'],
    requiredRoles: ['admin', 'super-admin'],
    showInNavigation: true,
    navigationOrder: 5
  },
  {
    path: '/admin/users',
    name: 'Manage Users',
    description: 'User management and permissions',
    modes: ['admin'],
    requiredRoles: ['super-admin'],
    showInNavigation: true,
    navigationOrder: 6
  },
  {
    path: '/admin/sponsors',
    name: 'Manage Sponsors',
    description: 'Sponsor management',
    modes: ['admin'],
    requiredRoles: ['admin', 'super-admin'],
    showInNavigation: true,
    navigationOrder: 7
  },
  {
    path: '/admin/awards',
    name: 'Manage Awards',
    description: 'Award categories and winners',
    modes: ['admin'],
    requiredRoles: ['admin', 'super-admin'],
    showInNavigation: true,
    navigationOrder: 8
  },
  {
    path: '/admin/reports',
    name: 'Reports',
    description: 'Festival analytics and reports',
    modes: ['admin'],
    requiredRoles: ['admin', 'super-admin'],
    showInNavigation: true,
    navigationOrder: 9
  },
  {
    path: '/admin/settings',
    name: 'Settings',
    description: 'Festival settings and configuration',
    modes: ['admin'],
    requiredRoles: ['super-admin'],
    showInNavigation: true,
    navigationOrder: 10
  }
]

// Helper functions for working with page rules

export function getNavigationItems(mode: SiteMode, userRole: UserRole = 'anonymous'): PageRule[] {
  return PAGE_RULES
    .filter(rule => {
      // Check if page is available in current mode
      if (!rule.modes.includes(mode)) return false
      
      // Check if should show in navigation
      if (!rule.showInNavigation) return false
      
      // Check role access:
      // If page allows 'anonymous', it's accessible to everyone
      // Otherwise, check if user has the required role
      if (rule.requiredRoles.includes('anonymous')) return true
      return rule.requiredRoles.includes(userRole)
    })
    .sort((a, b) => (a.navigationOrder || 999) - (b.navigationOrder || 999))
}

export function canAccessPage(path: string, mode: SiteMode, userRole: UserRole): boolean {
  const rule = findPageRule(path)
  if (!rule) return false
  
  // Check if page is available in current mode
  if (!rule.modes.includes(mode)) return false
  
  // Check role access:
  // If page allows 'anonymous', it's accessible to everyone
  // Otherwise, check if user has the required role
  if (rule.requiredRoles.includes('anonymous')) return true
  return rule.requiredRoles.includes(userRole)
}

export function findPageRule(path: string): PageRule | undefined {
  // First try exact match
  let rule = PAGE_RULES.find(r => r.path === path)
  if (rule) return rule

  // Then check children
  for (const parentRule of PAGE_RULES) {
    if (parentRule.children) {
      rule = parentRule.children.find(r => r.path === path)
      if (rule) return rule
    }
  }

  // Finally check if it's a dynamic route
  for (const r of PAGE_RULES) {
    if (matchDynamicRoute(path, r.path)) return r
    
    if (r.children) {
      for (const child of r.children) {
        if (matchDynamicRoute(path, child.path)) return child
      }
    }
  }

  return undefined
}

function matchDynamicRoute(actualPath: string, rulePath: string): boolean {
  // Convert route pattern to regex
  // e.g., /films/:id -> /films/([^/]+)
  const pattern = rulePath.replace(/:([^/]+)/g, '([^/]+)')
  const regex = new RegExp(`^${pattern}$`)
  return regex.test(actualPath)
}

export function getPageTitle(path: string): string {
  const rule = findPageRule(path)
  return rule?.name || 'Beverly Hills Film Festival'
}

export function getPageDescription(path: string): string {
  const rule = findPageRule(path)
  return rule?.description || 'Welcome to the Beverly Hills Film Festival'
}