import { faker } from '@faker-js/faker'

export interface Venue {
  id: string
  name: string
  address: string
  city: string
  state: string
  zipCode: string
  capacity: number
  type: 'theater' | 'outdoor' | 'multiplex' | 'screening-room'
  amenities: string[]
  parkingAvailable: boolean
  accessibleSeating: boolean
  vipSection: boolean
}

export class VenueBuilder {
  private venue: Partial<Venue> = {}

  withId(id?: string): this {
    this.venue.id = id ?? faker.string.uuid()
    return this
  }

  withName(name?: string): this {
    this.venue.name = name ?? faker.company.name() + ' Theater'
    return this
  }

  withAddress(address?: string): this {
    this.venue.address = address ?? faker.location.streetAddress()
    return this
  }

  withCity(city?: string): this {
    this.venue.city = city ?? 'Beverly Hills'
    return this
  }

  withState(state?: string): this {
    this.venue.state = state ?? 'CA'
    return this
  }

  withZipCode(zipCode?: string): this {
    this.venue.zipCode = zipCode ?? '90210'
    return this
  }

  withCapacity(capacity?: number): this {
    this.venue.capacity = capacity ?? faker.number.int({ min: 50, max: 500 })
    return this
  }

  withType(type?: Venue['type']): this {
    this.venue.type = type ?? faker.helpers.arrayElement(['theater', 'outdoor', 'multiplex', 'screening-room'])
    return this
  }

  withAmenities(amenities?: string[]): this {
    this.venue.amenities = amenities ?? faker.helpers.arrayElements([
      'Dolby Atmos',
      'IMAX',
      '4K Projection',
      'Concessions',
      'Bar',
      'Lounge',
      'VIP Entrance'
    ], { min: 2, max: 5 })
    return this
  }

  withParkingAvailable(available?: boolean): this {
    this.venue.parkingAvailable = available ?? faker.datatype.boolean()
    return this
  }

  withAccessibleSeating(accessible?: boolean): this {
    this.venue.accessibleSeating = accessible ?? true
    return this
  }

  withVipSection(hasVip?: boolean): this {
    this.venue.vipSection = hasVip ?? faker.datatype.boolean()
    return this
  }

  build(): Venue {
    return {
      id: this.venue.id ?? faker.string.uuid(),
      name: this.venue.name ?? faker.company.name() + ' Theater',
      address: this.venue.address ?? faker.location.streetAddress(),
      city: this.venue.city ?? 'Beverly Hills',
      state: this.venue.state ?? 'CA',
      zipCode: this.venue.zipCode ?? '90210',
      capacity: this.venue.capacity ?? faker.number.int({ min: 50, max: 500 }),
      type: this.venue.type ?? 'theater',
      amenities: this.venue.amenities ?? ['4K Projection', 'Concessions'],
      parkingAvailable: this.venue.parkingAvailable ?? true,
      accessibleSeating: this.venue.accessibleSeating ?? true,
      vipSection: this.venue.vipSection ?? false
    }
  }

  static aVenue(): VenueBuilder {
    return new VenueBuilder()
  }

  static aTheater(): VenueBuilder {
    return new VenueBuilder()
      .withType('theater')
      .withCapacity(faker.number.int({ min: 100, max: 300 }))
  }

  static anOutdoorVenue(): VenueBuilder {
    return new VenueBuilder()
      .withType('outdoor')
      .withCapacity(faker.number.int({ min: 200, max: 1000 }))
      .withAmenities(['Outdoor Screen', 'Food Trucks', 'Picnic Area'])
  }

  static aMultiplex(): VenueBuilder {
    return new VenueBuilder()
      .withType('multiplex')
      .withCapacity(faker.number.int({ min: 500, max: 2000 }))
      .withVipSection(true)
  }

  static aScreeningRoom(): VenueBuilder {
    return new VenueBuilder()
      .withType('screening-room')
      .withCapacity(faker.number.int({ min: 20, max: 50 }))
      .withAmenities(['Private Bar', 'Leather Seating', '8K Projection'])
      .withVipSection(true)
  }
}