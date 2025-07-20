'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trophy, Award, Star, Film, Users, Heart } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

// Mock data for winners - in a real app, this would come from an API
const winners = {
  grandJury: {
    film: 'The Last Chapter',
    director: 'Maria Rodriguez',
    country: 'Spain',
    synopsis: 'A moving story about family, loss, and redemption set against the backdrop of rural Spain.'
  },
  categories: [
    {
      category: 'Best Feature Film',
      winner: 'Echoes of Tomorrow',
      director: 'James Chen',
      country: 'USA'
    },
    {
      category: 'Best Documentary',
      winner: 'Voices Unheard',
      director: 'Sarah Williams',
      country: 'UK'
    },
    {
      category: 'Best Short Film',
      winner: 'The Red Bicycle',
      director: 'Pierre Dubois',
      country: 'France'
    },
    {
      category: 'Best Director',
      winner: 'Akira Tanaka',
      film: 'Night Falls on Tokyo',
      country: 'Japan'
    },
    {
      category: 'Best Cinematography',
      winner: 'Elena Volkov',
      film: 'Arctic Dreams',
      country: 'Russia'
    },
    {
      category: 'Best Student Film',
      winner: 'First Light',
      director: 'Alex Martinez',
      school: 'USC School of Cinematic Arts'
    }
  ],
  specialAwards: [
    {
      award: 'Audience Choice Award',
      winner: 'Finding Home',
      director: 'Lisa Anderson'
    },
    {
      award: 'Social Impact Award',
      winner: 'Climate Warriors',
      director: 'Mohammed Al-Hassan'
    },
    {
      award: 'Emerging Filmmaker Award',
      winner: 'Sophie Blanc',
      film: 'Midnight in Marseille'
    }
  ]
}

export default function WinnersPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-yellow-100 p-4 dark:bg-yellow-900/20">
              <Trophy className="h-12 w-12 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight">
            2024 Festival Winners
          </h1>
          <p className="text-xl text-muted-foreground">
            Celebrating excellence in filmmaking
          </p>
        </div>

        {/* Grand Jury Prize */}
        <Card className="mb-12 overflow-hidden border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50 dark:border-yellow-900 dark:from-yellow-950/20 dark:to-orange-950/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              <CardTitle className="text-2xl">Grand Jury Prize</CardTitle>
            </div>
            <CardDescription>The highest honor at Beverly Hills Film Festival</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="mb-1 text-3xl font-bold">{winners.grandJury.film}</h3>
                <p className="text-lg text-muted-foreground">
                  Directed by {winners.grandJury.director} • {winners.grandJury.country}
                </p>
              </div>
              <p className="text-muted-foreground">{winners.grandJury.synopsis}</p>
              <div className="flex flex-wrap gap-2 pt-2">
                <Badge variant="secondary">$10,000 Cash Prize</Badge>
                <Badge variant="secondary">Distribution Deal</Badge>
                <Badge variant="secondary">Industry Mentorship</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Winners */}
        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Category Winners</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {winners.categories.map((winner, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Award className="h-5 w-5 text-primary" />
                    {winner.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold">{winner.winner}</p>
                  <p className="text-sm text-muted-foreground">
                    {winner.director && `Directed by ${winner.director}`}
                    {winner.film && `For "${winner.film}"`}
                    {winner.school && winner.school}
                  </p>
                  {winner.country && (
                    <p className="mt-1 text-sm text-muted-foreground">{winner.country}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Special Awards */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              Special Awards
            </CardTitle>
            <CardDescription>Recognizing exceptional achievement and impact</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {winners.specialAwards.map((award, index) => (
                <div key={index} className="flex items-start justify-between rounded-lg border p-4">
                  <div>
                    <h4 className="font-semibold">{award.award}</h4>
                    <p className="text-sm text-muted-foreground">
                      {award.winner} {award.film && `• "${award.film}"`}
                    </p>
                    {award.director && (
                      <p className="text-sm text-muted-foreground">Directed by {award.director}</p>
                    )}
                  </div>
                  {award.award === 'Audience Choice Award' && (
                    <Heart className="h-5 w-5 text-red-500" />
                  )}
                  {award.award === 'Social Impact Award' && (
                    <Users className="h-5 w-5 text-green-600" />
                  )}
                  {award.award === 'Emerging Filmmaker Award' && (
                    <Star className="h-5 w-5 text-blue-600" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Festival Stats */}
        <Card className="mb-12 bg-muted/50">
          <CardHeader>
            <CardTitle>2024 Festival Highlights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 text-center md:grid-cols-4">
              <div>
                <p className="text-3xl font-bold">127</p>
                <p className="text-sm text-muted-foreground">Films Screened</p>
              </div>
              <div>
                <p className="text-3xl font-bold">42</p>
                <p className="text-sm text-muted-foreground">Countries Represented</p>
              </div>
              <div>
                <p className="text-3xl font-bold">3,500+</p>
                <p className="text-sm text-muted-foreground">Attendees</p>
              </div>
              <div>
                <p className="text-3xl font-bold">85</p>
                <p className="text-sm text-muted-foreground">Industry Professionals</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="rounded-lg bg-primary/10 p-8 text-center">
          <Film className="mx-auto mb-4 h-12 w-12 text-primary" />
          <h3 className="mb-2 text-2xl font-bold">Congratulations to All Winners!</h3>
          <p className="mb-6 text-muted-foreground">
            Thank you to all filmmakers who shared their stories with us
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild>
              <a href="/gallery">View Festival Gallery</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/watch">Watch Trailers</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}