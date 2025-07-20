'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Trophy, Film, Users, Calendar, Award, ChevronRight, History } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

// Mock archive data - in production, this would come from an API
const archiveYears = [
  {
    year: 2023,
    theme: 'Voices of Tomorrow',
    dates: 'November 16-19, 2023',
    stats: {
      films: 115,
      countries: 38,
      attendees: 3200,
      awards: 22
    },
    highlights: [
      'First virtual reality film competition',
      'Record number of female directors',
      'Launch of emerging filmmaker mentorship program'
    ],
    grandJuryWinner: {
      title: 'Moonlight Sonata',
      director: 'Chen Wei',
      country: 'China'
    }
  },
  {
    year: 2022,
    theme: 'Cinema Reimagined',
    dates: 'November 17-20, 2022',
    stats: {
      films: 98,
      countries: 32,
      attendees: 2800,
      awards: 20
    },
    highlights: [
      'Return to in-person screenings post-pandemic',
      'Introduction of sustainability award',
      'Partnership with major streaming platforms'
    ],
    grandJuryWinner: {
      title: 'The Garden of Memory',
      director: 'Isabella Martinez',
      country: 'Mexico'
    }
  },
  {
    year: 2021,
    theme: 'Stories Without Borders',
    dates: 'November 18-21, 2021',
    stats: {
      films: 87,
      countries: 28,
      attendees: 2200,
      awards: 18
    },
    highlights: [
      'Hybrid festival format',
      'Global streaming access for international audiences',
      'COVID-19 documentary showcase'
    ],
    grandJuryWinner: {
      title: 'Distance',
      director: 'Jonas Berg',
      country: 'Sweden'
    }
  },
  {
    year: 2020,
    theme: 'Cinema Connects',
    dates: 'November 19-22, 2020',
    stats: {
      films: 75,
      countries: 25,
      attendees: 5000,
      awards: 16
    },
    highlights: [
      'First fully virtual festival',
      'Record online attendance',
      'Special pandemic stories category'
    ],
    grandJuryWinner: {
      title: 'Lockdown Letters',
      director: 'Sarah Johnson',
      country: 'UK'
    }
  }
]

const notableAlumni = [
  {
    name: 'Director A',
    film: 'Breaking Boundaries',
    year: 2019,
    achievement: 'Won Academy Award for Best Foreign Film'
  },
  {
    name: 'Director B',
    film: 'City Lights',
    year: 2018,
    achievement: 'Netflix Original Series Deal'
  },
  {
    name: 'Director C',
    film: 'The Journey',
    year: 2017,
    achievement: 'Cannes Film Festival Selection'
  }
]

export default function ArchivesPage() {
  const [selectedYear, setSelectedYear] = useState('2023')
  const selectedArchive = archiveYears.find(a => a.year.toString() === selectedYear)

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-primary/10 p-4">
              <History className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight">
            Festival Archives
          </h1>
          <p className="text-xl text-muted-foreground">
            Explore the rich history of Beverly Hills Film Festival
          </p>
        </div>

        {/* Year Selector */}
        <div className="mb-8 flex justify-center">
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select a year" />
            </SelectTrigger>
            <SelectContent>
              {archiveYears.map((archive) => (
                <SelectItem key={archive.year} value={archive.year.toString()}>
                  {archive.year}
                </SelectItem>
              ))}
              <SelectItem value="older">2019 and Earlier</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {selectedYear === 'older' ? (
          // Earlier Years Summary
          <Card>
            <CardHeader>
              <CardTitle>Festival History 2001-2019</CardTitle>
              <CardDescription>
                Two decades of celebrating independent cinema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-3 font-semibold">Festival Milestones</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• 2001: Festival founded by Nino Simone</li>
                    <li>• 2005: First international film competition</li>
                    <li>• 2010: Introduction of student film category</li>
                    <li>• 2015: Launch of industry mentorship program</li>
                    <li>• 2018: Partnership with major distributors</li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-3 font-semibold">By The Numbers (2001-2019)</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">1,500+</span> Films screened</p>
                    <p><span className="font-medium">300+</span> Awards presented</p>
                    <p><span className="font-medium">75+</span> Countries represented</p>
                    <p><span className="font-medium">40,000+</span> Total attendees</p>
                  </div>
                </div>
              </div>
              <Button asChild>
                <a href="/contact">Request Historical Information</a>
              </Button>
            </CardContent>
          </Card>
        ) : selectedArchive && (
          <>
            {/* Selected Year Details */}
            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{selectedArchive.year} Festival</CardTitle>
                    <CardDescription className="text-base">
                      Theme: "{selectedArchive.theme}" • {selectedArchive.dates}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="text-base">
                    <Calendar className="mr-1 h-4 w-4" />
                    {selectedArchive.year}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {/* Stats */}
                <div className="mb-6 grid gap-4 text-center sm:grid-cols-4">
                  <div className="rounded-lg bg-muted p-4">
                    <Film className="mx-auto mb-2 h-8 w-8 text-primary" />
                    <p className="text-2xl font-bold">{selectedArchive.stats.films}</p>
                    <p className="text-sm text-muted-foreground">Films</p>
                  </div>
                  <div className="rounded-lg bg-muted p-4">
                    <Trophy className="mx-auto mb-2 h-8 w-8 text-primary" />
                    <p className="text-2xl font-bold">{selectedArchive.stats.countries}</p>
                    <p className="text-sm text-muted-foreground">Countries</p>
                  </div>
                  <div className="rounded-lg bg-muted p-4">
                    <Users className="mx-auto mb-2 h-8 w-8 text-primary" />
                    <p className="text-2xl font-bold">{selectedArchive.stats.attendees.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Attendees</p>
                  </div>
                  <div className="rounded-lg bg-muted p-4">
                    <Award className="mx-auto mb-2 h-8 w-8 text-primary" />
                    <p className="text-2xl font-bold">{selectedArchive.stats.awards}</p>
                    <p className="text-sm text-muted-foreground">Awards</p>
                  </div>
                </div>

                {/* Grand Jury Winner */}
                <Card className="mb-6 border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Trophy className="h-5 w-5 text-yellow-600" />
                      Grand Jury Prize Winner
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xl font-semibold">{selectedArchive.grandJuryWinner.title}</p>
                    <p className="text-muted-foreground">
                      Directed by {selectedArchive.grandJuryWinner.director} • {selectedArchive.grandJuryWinner.country}
                    </p>
                  </CardContent>
                </Card>

                {/* Highlights */}
                <div>
                  <h3 className="mb-3 font-semibold">Festival Highlights</h3>
                  <ul className="space-y-2">
                    {selectedArchive.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <ChevronRight className="mt-0.5 h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Notable Alumni */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Success Stories</CardTitle>
            <CardDescription>
              BHFF alumni who've achieved international recognition
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {notableAlumni.map((alum, index) => (
                <div key={index} className="rounded-lg border p-4">
                  <p className="font-semibold">{alum.name}</p>
                  <p className="text-sm text-muted-foreground">"{alum.film}" ({alum.year})</p>
                  <p className="mt-2 text-sm font-medium text-primary">{alum.achievement}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Festival Evolution */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Festival Evolution</CardTitle>
            <CardDescription>
              How BHFF has grown and adapted over the years
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  01
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">The Early Years (2001-2005)</h4>
                  <p className="text-sm text-muted-foreground">
                    Started as a small local festival showcasing independent films from Southern California.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  02
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">International Expansion (2006-2015)</h4>
                  <p className="text-sm text-muted-foreground">
                    Grew to include international submissions and established partnerships with film schools worldwide.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  03
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">Digital Era (2016-2020)</h4>
                  <p className="text-sm text-muted-foreground">
                    Embraced digital submissions, online ticketing, and virtual screening options.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  04
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">New Horizons (2021-Present)</h4>
                  <p className="text-sm text-muted-foreground">
                    Hybrid festival model, industry partnerships, and focus on emerging technologies in filmmaking.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="rounded-lg bg-primary/10 p-8 text-center">
          <h3 className="mb-2 text-2xl font-bold">Be Part of Our Next Chapter</h3>
          <p className="mb-6 text-muted-foreground">
            Join us for the 2024 festival and help write the next page of BHFF history
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild>
              <a href="/submit">Submit Your Film</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/tickets">Get Festival Passes</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}