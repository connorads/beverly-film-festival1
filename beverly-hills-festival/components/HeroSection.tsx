import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Film } from 'lucide-react'
import Link from 'next/link'

interface HeroSectionProps {
  title?: string
  subtitle?: string
  dates?: string
  location?: string
  featuredFilmCount?: number
  primaryAction?: {
    label: string
    href: string
  }
  secondaryAction?: {
    label: string
    href: string
  }
}

export function HeroSection({
  title = 'Beverly Hills Film Festival 2024',
  subtitle = 'Celebrating Independent Cinema',
  dates = 'April 15-25, 2024',
  location = 'Beverly Hills, CA',
  featuredFilmCount = 150,
  primaryAction = { label: 'Get Tickets', href: '/tickets' },
  secondaryAction = { label: 'Submit Your Film', href: '/filmmaker/submit' }
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-primary/5 to-background">
      <div className="container relative z-10 mx-auto px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl text-center">
          {/* Event Info Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <Badge variant="secondary" className="px-3 py-1">
              <Calendar className="mr-2 h-3 w-3" />
              {dates}
            </Badge>
            <Badge variant="secondary" className="px-3 py-1">
              <MapPin className="mr-2 h-3 w-3" />
              {location}
            </Badge>
            <Badge variant="secondary" className="px-3 py-1">
              <Film className="mr-2 h-3 w-3" />
              {featuredFilmCount}+ Films
            </Badge>
          </div>

          {/* Title and Subtitle */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
            {title}
          </h1>
          <p className="mb-10 text-xl text-muted-foreground sm:text-2xl">
            {subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild>
              <Link href={primaryAction.href}>
                {primaryAction.label}
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href={secondaryAction.href}>
                {secondaryAction.label}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 blur-3xl" aria-hidden="true">
          <div
            className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-primary to-primary/30 opacity-30"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>
    </section>
  )
}