import { faker } from '@faker-js/faker'

export interface Award {
  id: string
  name: string
  category: 'feature' | 'short' | 'documentary' | 'animation' | 'student' | 'screenplay' | 'achievement'
  description: string
  eligibilityCriteria: string[]
  submissionDeadline: Date
  prize: {
    monetary?: number
    items?: string[]
    opportunities?: string[]
  }
  juryMembers: string[]
  previousWinners: Array<{
    year: number
    winner: string
    title: string
  }>
  presenterName?: string
  ceremonyDate: Date
  voteType: 'jury' | 'audience' | 'hybrid'
}

export class AwardBuilder {
  private award: Partial<Award> = {}

  withId(id?: string): this {
    this.award.id = id ?? faker.string.uuid()
    return this
  }

  withName(name?: string): this {
    this.award.name = name ?? `${faker.word.adjective()} ${faker.word.noun()} Award`
    return this
  }

  withCategory(category?: Award['category']): this {
    this.award.category = category ?? faker.helpers.arrayElement([
      'feature', 'short', 'documentary', 'animation', 'student', 'screenplay', 'achievement'
    ])
    return this
  }

  withDescription(description?: string): this {
    this.award.description = description ?? faker.lorem.paragraph()
    return this
  }

  withEligibilityCriteria(criteria?: string[]): this {
    if (criteria) {
      this.award.eligibilityCriteria = criteria
    } else {
      const categoryDefaults: Record<Award['category'], string[]> = {
        feature: [
          'Feature-length film (75+ minutes)',
          'Completed within the past 2 years',
          'Not previously screened in Beverly Hills',
          'English subtitles required for non-English films'
        ],
        short: [
          'Short film (under 40 minutes)',
          'Completed within the past 2 years',
          'Original work by the filmmaker'
        ],
        documentary: [
          'Documentary format',
          'Based on factual subjects',
          'Minimum 40 minutes runtime',
          'Completed within the past 2 years'
        ],
        animation: [
          'Animated film (any length)',
          'At least 75% animated content',
          'Completed within the past 2 years'
        ],
        student: [
          'Director enrolled in accredited institution',
          'Film produced as part of curriculum',
          'Faculty endorsement required',
          'Any genre or length'
        ],
        screenplay: [
          'Original, unproduced screenplay',
          'Standard screenplay format',
          '90-120 pages for features',
          'WGA registration recommended'
        ],
        achievement: [
          'Significant contribution to cinema',
          'Minimum 10 years in the industry',
          'Peer nominations accepted'
        ]
      }
      this.award.eligibilityCriteria = categoryDefaults[this.award.category || 'feature']
    }
    return this
  }

  withSubmissionDeadline(deadline?: Date): this {
    this.award.submissionDeadline = deadline ?? faker.date.future({ years: 1 })
    return this
  }

  withPrize(prize?: Award['prize']): this {
    if (prize) {
      this.award.prize = prize
    } else {
      const categoryPrizes: Record<Award['category'], Award['prize']> = {
        feature: {
          monetary: 25000,
          items: ['Crystal Trophy', 'Laurel Certificate'],
          opportunities: ['Distribution deal consideration', 'Industry screening']
        },
        short: {
          monetary: 10000,
          items: ['Crystal Trophy', 'Laurel Certificate'],
          opportunities: ['Festival circuit support']
        },
        documentary: {
          monetary: 15000,
          items: ['Crystal Trophy', 'Laurel Certificate'],
          opportunities: ['Streaming platform pitch']
        },
        animation: {
          monetary: 15000,
          items: ['Crystal Trophy', 'Laurel Certificate'],
          opportunities: ['Studio meetings']
        },
        student: {
          monetary: 5000,
          items: ['Crystal Trophy', 'Laurel Certificate'],
          opportunities: ['Mentorship program', 'Internship opportunities']
        },
        screenplay: {
          monetary: 10000,
          items: ['Crystal Trophy', 'Coverage notes'],
          opportunities: ['Agent meetings', 'Producer pitches']
        },
        achievement: {
          items: ['Lifetime Achievement Trophy', 'Career retrospective screening'],
          opportunities: ['Masterclass opportunity']
        }
      }
      this.award.prize = categoryPrizes[this.award.category || 'feature']
    }
    return this
  }

  withJuryMembers(members?: string[]): this {
    this.award.juryMembers = members ?? Array.from(
      { length: faker.number.int({ min: 3, max: 7 }) },
      () => faker.person.fullName()
    )
    return this
  }

  withPreviousWinners(winners?: Award['previousWinners']): this {
    if (winners) {
      this.award.previousWinners = winners
    } else {
      const currentYear = new Date().getFullYear()
      this.award.previousWinners = Array.from(
        { length: faker.number.int({ min: 3, max: 5 }) },
        (_, index) => ({
          year: currentYear - index - 1,
          winner: faker.person.fullName(),
          title: faker.music.songName()
        })
      )
    }
    return this
  }

  withPresenterName(presenter?: string): this {
    this.award.presenterName = presenter ?? faker.person.fullName()
    return this
  }

  withCeremonyDate(date?: Date): this {
    this.award.ceremonyDate = date ?? faker.date.future({ years: 1 })
    return this
  }

  withVoteType(voteType?: Award['voteType']): this {
    this.award.voteType = voteType ?? faker.helpers.arrayElement(['jury', 'audience', 'hybrid'])
    return this
  }

  build(): Award {
    const category = this.award.category ?? 'feature'
    
    // Ensure eligibility criteria matches category if not set
    if (!this.award.eligibilityCriteria) {
      this.withEligibilityCriteria()
    }
    
    // Ensure prize matches category if not set
    if (!this.award.prize) {
      this.withPrize()
    }

    return {
      id: this.award.id ?? faker.string.uuid(),
      name: this.award.name ?? `${faker.word.adjective()} ${faker.word.noun()} Award`,
      category,
      description: this.award.description ?? faker.lorem.paragraph(),
      eligibilityCriteria: this.award.eligibilityCriteria!,
      submissionDeadline: this.award.submissionDeadline ?? faker.date.future({ years: 1 }),
      prize: this.award.prize!,
      juryMembers: this.award.juryMembers ?? Array.from({ length: 5 }, () => faker.person.fullName()),
      previousWinners: this.award.previousWinners ?? [],
      presenterName: this.award.presenterName,
      ceremonyDate: this.award.ceremonyDate ?? faker.date.future({ years: 1 }),
      voteType: this.award.voteType ?? 'jury'
    }
  }

  static anAward(): AwardBuilder {
    return new AwardBuilder()
  }

  static aBestFeatureAward(): AwardBuilder {
    return new AwardBuilder()
      .withName('Best Feature Film')
      .withCategory('feature')
      .withVoteType('jury')
  }

  static aBestShortAward(): AwardBuilder {
    return new AwardBuilder()
      .withName('Best Short Film')
      .withCategory('short')
      .withVoteType('jury')
  }

  static anAudienceChoiceAward(): AwardBuilder {
    return new AwardBuilder()
      .withName('Audience Choice Award')
      .withVoteType('audience')
      .withDescription('Voted by festival attendees for their favorite film')
  }

  static aLifetimeAchievementAward(): AwardBuilder {
    return new AwardBuilder()
      .withName('Lifetime Achievement Award')
      .withCategory('achievement')
      .withDescription('Honoring exceptional contributions to cinema')
      .withVoteType('jury')
  }

  static aStudentFilmAward(): AwardBuilder {
    return new AwardBuilder()
      .withName('Rising Filmmaker Award')
      .withCategory('student')
      .withVoteType('hybrid')
  }
}