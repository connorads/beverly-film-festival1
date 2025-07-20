# Test Infrastructure Documentation

## Overview

This document describes the test infrastructure created for the Beverly Hills Film Festival prototype following Test-Driven Development (TDD) principles.

## Test Builders

We've created flexible builders using the Builder pattern for creating test data:

### VenueBuilder (`/test/builders/venue.builder.ts`)
- Creates venue test data with sensible defaults
- Supports different venue types: theater, outdoor, multiplex, screening-room
- Static factory methods for common venue types
- Example: `VenueBuilder.aTheater().withCapacity(300).build()`

### SponsorBuilder (`/test/builders/sponsor.builder.ts`)
- Creates sponsor test data with tier-based defaults
- Automatically sets appropriate contribution amounts and benefits based on tier
- Supports platinum, gold, silver, and bronze tiers
- Example: `SponsorBuilder.aPlatinumSponsor().withName('Netflix').build()`

### AwardBuilder (`/test/builders/award.builder.ts`)
- Creates award test data with category-specific defaults
- Supports various award categories: feature, short, documentary, animation, student, screenplay, achievement
- Includes eligibility criteria, prizes, and jury information
- Example: `AwardBuilder.aBestFeatureAward().withPrize({ monetary: 50000 }).build()`

## PAGE_RULES Manifest (`/test/page-rules.ts`)

The PAGE_RULES manifest serves as the single source of truth for:
- Routing rules and access permissions
- Navigation visibility based on mode (public vs admin)
- User role requirements
- Page metadata

Key features:
- Defines which pages are accessible in each mode
- Specifies required user roles for each page
- Controls navigation visibility and ordering
- Includes helper functions for route protection

## Test Suites

### Site Mode Switching Tests (`/test/features/site-mode-switching.test.tsx`)

Tests for the core site mode switching functionality:
- SiteModeContext provider functionality
- Mode persistence in localStorage
- ModeSwitcher component behavior
- Keyboard accessibility
- Visual mode indicators

### Navigation Visibility Tests (`/test/features/navigation-visibility.test.tsx`)

Tests for navigation visibility based on mode and user role:
- Public mode navigation for different user types
- Admin mode navigation with role-based access
- Navigation item ordering
- Mobile responsiveness
- Active route highlighting
- Accessibility features

## Test Fixtures (`/test/fixtures/test-data.ts`)

Pre-configured test data for consistent testing:
- Common venues (main theater, outdoor venue, etc.)
- Sponsor examples for each tier
- Award configurations
- Film categories
- Ticket types
- Test users for different roles
- Common dates
- API response fixtures

## Test Configuration

### Vitest Setup (`/vitest.config.ts`)
- Uses React Testing Library with happy-dom environment
- Configured with path aliases (@/)
- Global test utilities available

### Test Scripts (added to `package.json`)
- `npm test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage
- `npm run test:e2e` - Run Playwright E2E tests
- `npm run test:e2e:ui` - Run E2E tests with UI

## Current Test Status

✅ **Created (Failing as Expected - TDD)**:
1. Test builders for venue, sponsor, and award entities
2. PAGE_RULES manifest for routing and permissions
3. Comprehensive test suites for site mode switching
4. Navigation visibility tests with role-based access
5. Common test fixtures and data

❌ **Pending Implementation**:
1. SiteModeContext and provider
2. AuthContext and provider
3. Navigation component
4. ModeSwitcher component
5. Route protection helpers

## Next Steps

Following TDD principles, the next steps are to implement the components and contexts to make these tests pass:

1. Create `SiteModeContext` in `/lib/context/site-mode.tsx`
2. Create `AuthContext` in `/lib/context/auth.tsx`
3. Implement `Navigation` component in `/components/navigation.tsx`
4. Implement `ModeSwitcher` component in `/components/mode-switcher.tsx`
5. Add route protection logic using the PAGE_RULES manifest

## Usage Examples

```typescript
// Using builders
const venue = VenueBuilder.aTheater()
  .withName('Grand Theater')
  .withCapacity(500)
  .build()

// Using fixtures
import { venues, sponsors, testUsers } from '@/test/fixtures/test-data'

// Using PAGE_RULES
import { getNavigationItems, canAccessPage } from '@/test/page-rules'
const publicNav = getNavigationItems('public', 'anonymous')
const canAccess = canAccessPage('/admin', 'admin', 'admin')
```