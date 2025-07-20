import { faker } from '@faker-js/faker'

export interface Sponsor {
  id: string
  name: string
  logo: string
  website: string
  tier: 'platinum' | 'gold' | 'silver' | 'bronze'
  contribution: number
  benefits: string[]
  industry: string
  contactName: string
  contactEmail: string
  contactPhone: string
  activeSince: Date
  featured: boolean
}

export class SponsorBuilder {
  private sponsor: Partial<Sponsor> = {}

  withId(id?: string): this {
    this.sponsor.id = id ?? faker.string.uuid()
    return this
  }

  withName(name?: string): this {
    this.sponsor.name = name ?? faker.company.name()
    return this
  }

  withLogo(logo?: string): this {
    this.sponsor.logo = logo ?? faker.image.url()
    return this
  }

  withWebsite(website?: string): this {
    this.sponsor.website = website ?? faker.internet.url()
    return this
  }

  withTier(tier?: Sponsor['tier']): this {
    this.sponsor.tier = tier ?? faker.helpers.arrayElement(['platinum', 'gold', 'silver', 'bronze'])
    return this
  }

  withContribution(amount?: number): this {
    if (amount !== undefined) {
      this.sponsor.contribution = amount
    } else {
      // Set contribution based on tier if not specified
      const tierContributions = {
        platinum: faker.number.int({ min: 50000, max: 100000 }),
        gold: faker.number.int({ min: 25000, max: 49999 }),
        silver: faker.number.int({ min: 10000, max: 24999 }),
        bronze: faker.number.int({ min: 5000, max: 9999 })
      }
      this.sponsor.contribution = tierContributions[this.sponsor.tier || 'bronze']
    }
    return this
  }

  withBenefits(benefits?: string[]): this {
    if (benefits) {
      this.sponsor.benefits = benefits
    } else {
      // Set benefits based on tier
      const tierBenefits = {
        platinum: [
          'Premier logo placement',
          'Opening night gala table',
          'Award presentation opportunity',
          'Full-page program ad',
          'VIP passes (20)',
          'Private screening room access'
        ],
        gold: [
          'Prominent logo placement',
          'Gala tickets (10)',
          'Half-page program ad',
          'VIP passes (10)',
          'Pre-screening reception access'
        ],
        silver: [
          'Logo on materials',
          'Gala tickets (4)',
          'Quarter-page program ad',
          'VIP passes (4)'
        ],
        bronze: [
          'Website listing',
          'Gala tickets (2)',
          'Program listing',
          'VIP passes (2)'
        ]
      }
      this.sponsor.benefits = tierBenefits[this.sponsor.tier || 'bronze']
    }
    return this
  }

  withIndustry(industry?: string): this {
    this.sponsor.industry = industry ?? faker.company.buzzNoun()
    return this
  }

  withContactName(name?: string): this {
    this.sponsor.contactName = name ?? faker.person.fullName()
    return this
  }

  withContactEmail(email?: string): this {
    this.sponsor.contactEmail = email ?? faker.internet.email()
    return this
  }

  withContactPhone(phone?: string): this {
    this.sponsor.contactPhone = phone ?? faker.phone.number()
    return this
  }

  withActiveSince(date?: Date): this {
    this.sponsor.activeSince = date ?? faker.date.past({ years: 5 })
    return this
  }

  withFeatured(featured?: boolean): this {
    this.sponsor.featured = featured ?? (this.sponsor.tier === 'platinum' || this.sponsor.tier === 'gold')
    return this
  }

  build(): Sponsor {
    const tier = this.sponsor.tier ?? 'bronze'
    
    // Ensure contribution matches tier if not set
    if (!this.sponsor.contribution) {
      this.withContribution()
    }
    
    // Ensure benefits match tier if not set
    if (!this.sponsor.benefits) {
      this.withBenefits()
    }

    return {
      id: this.sponsor.id ?? faker.string.uuid(),
      name: this.sponsor.name ?? faker.company.name(),
      logo: this.sponsor.logo ?? faker.image.url(),
      website: this.sponsor.website ?? faker.internet.url(),
      tier,
      contribution: this.sponsor.contribution!,
      benefits: this.sponsor.benefits!,
      industry: this.sponsor.industry ?? faker.company.buzzNoun(),
      contactName: this.sponsor.contactName ?? faker.person.fullName(),
      contactEmail: this.sponsor.contactEmail ?? faker.internet.email(),
      contactPhone: this.sponsor.contactPhone ?? faker.phone.number(),
      activeSince: this.sponsor.activeSince ?? faker.date.past({ years: 5 }),
      featured: this.sponsor.featured ?? false
    }
  }

  static aSponsor(): SponsorBuilder {
    return new SponsorBuilder()
  }

  static aPlatinumSponsor(): SponsorBuilder {
    return new SponsorBuilder()
      .withTier('platinum')
      .withFeatured(true)
  }

  static aGoldSponsor(): SponsorBuilder {
    return new SponsorBuilder()
      .withTier('gold')
      .withFeatured(true)
  }

  static aSilverSponsor(): SponsorBuilder {
    return new SponsorBuilder()
      .withTier('silver')
  }

  static aBronzeSponsor(): SponsorBuilder {
    return new SponsorBuilder()
      .withTier('bronze')
  }

  static aMediaSponsor(): SponsorBuilder {
    return new SponsorBuilder()
      .withIndustry('Media & Entertainment')
      .withBenefits([
        'Media partnership',
        'Press coverage',
        'Interview opportunities',
        'Content distribution rights'
      ])
  }
}