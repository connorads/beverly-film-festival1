'use client'

import { Layout } from '@/components/Layout'
import { HeroSection } from '@/components/HeroSection'
import { FilmCard } from '@/components/FilmCard'
import { ScheduleCard } from '@/components/ScheduleCard'
import { SponsorCard } from '@/components/SponsorCard'
import { Button } from '@/components/ui/button'
import { ArrowRight, Users, Film, Sparkles, Info } from 'lucide-react'
import Link from 'next/link'
import { useSiteMode } from '@/lib/context/site-mode'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'

// Sample data - in production this would come from an API
const featuredFilms = [
  {
    id: '1',
    title: 'The Last Dawn',
    director: 'Sarah Mitchell',
    genre: ['Drama', 'Thriller'],
    duration: 120,
    rating: 4.8,
    synopsis: 'A gripping tale of survival in a post-apocalyptic world where hope is the only currency.',
    screeningTime: 'April 16, 7:00 PM',
    venue: 'Main Theater',
    isFeature: true
  },
  {
    id: '2',
    title: 'Echoes of Tomorrow',
    director: 'James Chen',
    genre: ['Sci-Fi', 'Drama'],
    duration: 95,
    rating: 4.6,
    synopsis: 'A thought-provoking exploration of AI consciousness and human connection.',
    screeningTime: 'April 17, 5:30 PM',
    venue: 'Theater 2'
  },
  {
    id: '3',
    title: 'City Lights Redux',
    director: 'Maria Garcia',
    genre: ['Documentary'],
    duration: 88,
    rating: 4.9,
    synopsis: 'An intimate look at urban life through the eyes of street artists.',
    screeningTime: 'April 18, 3:00 PM',
    venue: 'Theater 3'
  }
]

const upcomingEvents = [
  {
    id: 'e1',
    title: 'Opening Night Gala',
    type: 'ceremony' as const,
    date: 'April 15, 2024',
    startTime: '6:00 PM',
    endTime: '11:00 PM',
    venue: 'Beverly Hills Hotel',
    description: 'Join us for the grand opening of the festival with red carpet arrivals and champagne reception.',
    capacity: 500,
    attendees: 423
  },
  {
    id: 'e2',
    title: 'Filmmaker Networking Brunch',
    type: 'networking' as const,
    date: 'April 16, 2024',
    startTime: '10:00 AM',
    endTime: '12:00 PM',
    venue: 'Rooftop Garden',
    description: 'Connect with fellow filmmakers, producers, and industry professionals.',
    capacity: 150,
    attendees: 89
  }
]

const sponsors = [
  {
    id: 's1',
    name: 'Paramount Pictures',
    tier: 'platinum' as const,
    description: 'Leading the way in entertainment for over a century.',
    website: 'https://www.paramount.com',
    benefits: ['Logo on all materials', 'VIP tickets', 'Award presentation rights']
  },
  {
    id: 's2',
    name: 'Sony Entertainment',
    tier: 'gold' as const,
    description: 'Bringing creative entertainment to the world.',
    website: 'https://www.sony.com',
    benefits: ['Prime booth location', 'Speaking opportunities', 'Exclusive screenings']
  }
]

export default function Home() {
  const { mode, setMode } = useSiteMode()

  return (
    <Layout>
      {/* Demo Mode Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-4 mb-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6" />
              <div>
                <h3 className="font-bold text-lg">Demo Mode Active</h3>
                <p className="text-sm opacity-90">
                  Currently viewing: <Badge variant="secondary" className="ml-2">{mode === 'admin' ? 'Admin Portal' : 'Public Festival Site'}</Badge>
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button 
                variant={mode === 'public' ? 'secondary' : 'outline'} 
                size="sm"
                onClick={() => setMode('public')}
                className="min-w-[140px]"
              >
                <Film className="mr-2 h-4 w-4" />
                Public Site
              </Button>
              <Button 
                variant={mode === 'admin' ? 'secondary' : 'outline'} 
                size="sm"
                onClick={() => {
                  setMode('admin');
                  // Navigate to admin after setting mode
                  window.location.href = '/admin';
                }}
                className="min-w-[140px]"
              >
                <Users className="mr-2 h-4 w-4" />
                Admin Portal
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                asChild
                className="bg-white/10 hover:bg-white/20"
              >
                <Link href="/demo">
                  <Info className="mr-2 h-4 w-4" />
                  View Demo Info
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Test Credentials Alert */}
      <div className="container mx-auto px-4 mb-8">
        <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
          <Info className="h-4 w-4" />
          <AlertTitle>Test Credentials Available</AlertTitle>
          <AlertDescription>
            <div className="mt-2 space-y-1">
              <p><strong>Admin Portal:</strong> admin@beverlyhillsfilmfestival.com / admin123</p>
              <p><strong>Filmmaker Portal:</strong> filmmaker@example.com / film123</p>
              <p><strong>Sponsor Portal:</strong> sponsor@paramount.com / sponsor123</p>
            </div>
          </AlertDescription>
        </Alert>
      </div>

      {/* Hero Section */}
      <HeroSection />

      {/* Dual Mode Feature Showcase */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">One Platform, Three Powerful Portals</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the Beverly Hills Film Festival through our innovative multi-portal system
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-card rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <Film className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Public Festival Site</h3>
              <p className="text-muted-foreground mb-4">
                Browse films, check schedules, and purchase tickets for the festival
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Film catalog & schedules
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Ticket purchasing
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Event information
                </li>
              </ul>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Filmmaker Portal</h3>
              <p className="text-muted-foreground mb-4">
                Submit films, manage screenings, and connect with industry professionals
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Film submission
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Screening management
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Analytics dashboard
                </li>
              </ul>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-12 w-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Sponsor Portal</h3>
              <p className="text-muted-foreground mb-4">
                Manage sponsorships, view analytics, and maximize your festival impact
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Sponsorship packages
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Brand visibility metrics
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Event management
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center">
            <Button size="lg" variant="default" asChild>
              <Link href="/demo">
                Explore All Features
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Films Section */}
      <section className="py-16">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Films</h2>
            <p className="text-muted-foreground">Don't miss these exceptional selections</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/films">
              View All Films
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredFilms.map((film) => (
            <FilmCard key={film.id} {...film} />
          ))}
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Upcoming Events</h2>
              <p className="text-muted-foreground">Panels, workshops, and networking opportunities</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/schedule">
                Full Schedule
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <ScheduleCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-16">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-2">Our Sponsors</h2>
          <p className="text-muted-foreground">Thank you to our generous partners</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sponsors.map((sponsor) => (
            <SponsorCard key={sponsor.id} {...sponsor} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button variant="outline" asChild>
            <Link href="/sponsor/opportunities">
              Become a Sponsor
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground rounded-lg my-16">
        <div className="text-center max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Cinema?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join us for 10 days of extraordinary films, inspiring conversations, and unforgettable moments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/tickets">Get Your Pass</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
              <Link href="/filmmaker/submit">Submit Your Film</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  )
}