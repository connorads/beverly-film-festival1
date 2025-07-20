import { VenueBuilder } from '@/test/builders/venue.builder'
import { SponsorBuilder } from '@/test/builders/sponsor.builder'
import { AwardBuilder } from '@/test/builders/award.builder'

/**
 * Common test data fixtures for use across tests
 * These provide consistent, realistic data for testing
 */

// Venues
export const venues = {
  mainTheater: VenueBuilder.aTheater()
    .withName('Beverly Hills Grand Theater')
    .withAddress('123 Rodeo Drive')
    .withCapacity(500)
    .withAmenities(['IMAX', 'Dolby Atmos', 'Concessions', 'VIP Lounge'])
    .withVipSection(true)
    .build(),

  outdoorVenue: VenueBuilder.anOutdoorVenue()
    .withName('Beverly Gardens Amphitheater')
    .withAddress('456 Canon Drive')
    .withCapacity(800)
    .build(),

  screeningRoom: VenueBuilder.aScreeningRoom()
    .withName('Directors Guild Screening Room')
    .withAddress('789 Wilshire Blvd')
    .withCapacity(50)
    .build(),

  multiplex: VenueBuilder.aMultiplex()
    .withName('Beverly Center Cinemas')
    .withAddress('321 La Cienega Blvd')
    .withCapacity(1200)
    .build()
}

// Sponsors
export const sponsors = {
  platinumSponsor: SponsorBuilder.aPlatinumSponsor()
    .withName('Paramount Pictures')
    .withIndustry('Film Production')
    .withContribution(75000)
    .build(),

  goldSponsor: SponsorBuilder.aGoldSponsor()
    .withName('Netflix')
    .withIndustry('Streaming Media')
    .withContribution(35000)
    .build(),

  silverSponsor: SponsorBuilder.aSilverSponsor()
    .withName('Beverly Hills Hotel')
    .withIndustry('Hospitality')
    .withContribution(15000)
    .build(),

  mediaSponsor: SponsorBuilder.aMediaSponsor()
    .withName('Variety')
    .withTier('gold')
    .withContribution(25000)
    .build(),

  localSponsor: SponsorBuilder.aBronzeSponsor()
    .withName('Rodeo Drive Business Association')
    .withIndustry('Local Business')
    .withContribution(7500)
    .build()
}

// Awards
export const awards = {
  bestFeature: AwardBuilder.aBestFeatureAward()
    .withDescription('Recognizing excellence in feature-length filmmaking')
    .withPrize({
      monetary: 50000,
      items: ['Golden Palm Trophy', 'Certificate of Excellence'],
      opportunities: ['Distribution deal with major studio', 'Festival circuit support']
    })
    .build(),

  audienceChoice: AwardBuilder.anAudienceChoiceAward()
    .withDescription('The people\'s choice for best film of the festival')
    .withPrize({
      monetary: 25000,
      items: ['Crystal Trophy', 'Audience Certificate'],
      opportunities: ['Streaming platform consideration']
    })
    .build(),

  studentFilm: AwardBuilder.aStudentFilmAward()
    .withDescription('Celebrating the next generation of filmmakers')
    .build(),

  lifetimeAchievement: AwardBuilder.aLifetimeAchievementAward()
    .withPresenterName('Steven Spielberg')
    .build(),

  bestShort: AwardBuilder.aBestShortAward()
    .withDescription('Excellence in short-form storytelling')
    .build()
}

// Film categories for testing
export const filmCategories = [
  'Drama',
  'Comedy',
  'Action',
  'Documentary',
  'Animation',
  'Horror',
  'Sci-Fi',
  'Romance',
  'Thriller',
  'International'
]

// Ticket types for testing
export const ticketTypes = [
  {
    id: 'single-screening',
    name: 'Single Screening',
    price: 25,
    description: 'Access to one film screening'
  },
  {
    id: 'day-pass',
    name: 'Day Pass',
    price: 75,
    description: 'Access to all screenings for one day'
  },
  {
    id: 'festival-pass',
    name: 'Festival Pass',
    price: 250,
    description: 'Access to all screenings for the entire festival'
  },
  {
    id: 'vip-pass',
    name: 'VIP Pass',
    price: 500,
    description: 'All access plus exclusive events and parties'
  },
  {
    id: 'industry-pass',
    name: 'Industry Pass',
    price: 350,
    description: 'Professional access with networking events'
  }
]

// User roles for testing auth
export const testUsers = {
  anonymous: null,
  
  attendee: {
    id: 'user-1',
    email: 'attendee@test.com',
    name: 'Test Attendee',
    role: 'attendee' as const
  },
  
  filmmaker: {
    id: 'user-2',
    email: 'filmmaker@test.com',
    name: 'Test Filmmaker',
    role: 'filmmaker' as const
  },
  
  sponsor: {
    id: 'user-3',
    email: 'sponsor@test.com',
    name: 'Test Sponsor',
    role: 'sponsor' as const
  },
  
  admin: {
    id: 'user-4',
    email: 'admin@test.com',
    name: 'Test Admin',
    role: 'admin' as const
  },
  
  superAdmin: {
    id: 'user-5',
    email: 'super@test.com',
    name: 'Test Super Admin',
    role: 'super-admin' as const
  }
}

// Common date fixtures
export const dates = {
  festivalStart: new Date('2024-06-15'),
  festivalEnd: new Date('2024-06-22'),
  submissionDeadline: new Date('2024-04-01'),
  earlyBirdDeadline: new Date('2024-05-01'),
  notificationDate: new Date('2024-05-15')
}

// API response fixtures
export const apiResponses = {
  success: {
    status: 'success',
    message: 'Operation completed successfully'
  },
  
  error: {
    status: 'error',
    message: 'An error occurred',
    code: 'GENERIC_ERROR'
  },
  
  unauthorized: {
    status: 'error',
    message: 'Unauthorized access',
    code: 'UNAUTHORIZED'
  },
  
  notFound: {
    status: 'error',
    message: 'Resource not found',
    code: 'NOT_FOUND'
  }
}

// Helper function to generate multiple items
export function generateMultiple<T>(builder: () => T, count: number): T[] {
  return Array.from({ length: count }, builder)
}

// Example usage:
// const multipleVenues = generateMultiple(() => VenueBuilder.aVenue().build(), 5)
// const multipleSponsorTiers = [
//   ...generateMultiple(() => SponsorBuilder.aPlatinumSponsor().build(), 2),
//   ...generateMultiple(() => SponsorBuilder.aGoldSponsor().build(), 3),
//   ...generateMultiple(() => SponsorBuilder.aSilverSponsor().build(), 5)
// ]