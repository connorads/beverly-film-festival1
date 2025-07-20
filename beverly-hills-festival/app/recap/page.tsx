'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Play, Trophy, Film, Users, Calendar, Globe, Heart, TrendingUp } from 'lucide-react'
import { Progress } from '@/components/ui/progress'

export default function RecapPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">
            Beverly Hills Film Festival 2024 Recap
          </h1>
          <p className="text-xl text-muted-foreground">
            A celebration of cinema, creativity, and community
          </p>
        </div>

        {/* Video Recap */}
        <Card className="mb-12 overflow-hidden">
          <div className="relative aspect-video bg-muted">
            <div className="absolute inset-0 flex items-center justify-center">
              <Button size="lg" className="gap-2">
                <Play className="h-5 w-5" />
                Watch Festival Highlights
              </Button>
            </div>
            {/* In production, this would be an actual video player */}
            <div className="absolute bottom-4 left-4 rounded bg-black/60 px-3 py-1 text-sm text-white">
              3:45
            </div>
          </div>
        </Card>

        {/* Festival Statistics */}
        <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <Film className="mb-2 h-8 w-8 text-primary" />
              <CardTitle className="text-3xl">127</CardTitle>
              <CardDescription>Films Screened</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                From 42 countries worldwide
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <Users className="mb-2 h-8 w-8 text-primary" />
              <CardTitle className="text-3xl">3,547</CardTitle>
              <CardDescription>Total Attendees</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                28% increase from 2023
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <Trophy className="mb-2 h-8 w-8 text-primary" />
              <CardTitle className="text-3xl">24</CardTitle>
              <CardDescription>Awards Presented</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Across 15 categories
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <Globe className="mb-2 h-8 w-8 text-primary" />
              <CardTitle className="text-3xl">85</CardTitle>
              <CardDescription>Industry Professionals</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Speakers & panelists
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Festival Highlights */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Festival Highlights</CardTitle>
            <CardDescription>Key moments from four unforgettable days</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Calendar className="mt-0.5 h-5 w-5 text-primary" />
              <div className="flex-1">
                <h4 className="mb-1 font-semibold">Opening Night Gala</h4>
                <p className="text-sm text-muted-foreground">
                  The red carpet premiere of "The Last Chapter" drew over 500 guests, including Academy Award winners and industry luminaries. The Spanish drama went on to win our Grand Jury Prize.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Users className="mt-0.5 h-5 w-5 text-primary" />
              <div className="flex-1">
                <h4 className="mb-1 font-semibold">Industry Panels</h4>
                <p className="text-sm text-muted-foreground">
                  Our "Future of Cinema" panel featuring Netflix, A24, and Blumhouse executives was standing room only. Key insights on streaming, theatrical releases, and emerging technologies shaped important industry conversations.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Heart className="mt-0.5 h-5 w-5 text-primary" />
              <div className="flex-1">
                <h4 className="mb-1 font-semibold">Audience Favorites</h4>
                <p className="text-sm text-muted-foreground">
                  "Finding Home" won the Audience Choice Award with a 98% approval rating. The documentary about refugee families touched hearts and sparked important discussions about global migration.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <TrendingUp className="mt-0.5 h-5 w-5 text-primary" />
              <div className="flex-1">
                <h4 className="mb-1 font-semibold">Distribution Deals</h4>
                <p className="text-sm text-muted-foreground">
                  Seven films secured distribution deals during the festival, including streaming agreements with major platforms and theatrical releases in key markets.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Impact & Reach */}
        <div className="mb-12 grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Global Reach</CardTitle>
              <CardDescription>Films from around the world</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>North America</span>
                    <span className="font-medium">35%</span>
                  </div>
                  <Progress value={35} className="h-2" />
                </div>
                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>Europe</span>
                    <span className="font-medium">28%</span>
                  </div>
                  <Progress value={28} className="h-2" />
                </div>
                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>Asia</span>
                    <span className="font-medium">22%</span>
                  </div>
                  <Progress value={22} className="h-2" />
                </div>
                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>Other Regions</span>
                    <span className="font-medium">15%</span>
                  </div>
                  <Progress value={15} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Social Impact</CardTitle>
              <CardDescription>Community engagement and outreach</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Student Attendees</span>
                <span className="font-semibold">450+</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Free Community Screenings</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Educational Workshops</span>
                <span className="font-semibold">8</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Scholarship Recipients</span>
                <span className="font-semibold">25</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Volunteer Hours</span>
                <span className="font-semibold">2,400</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Testimonials */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>What People Are Saying</CardTitle>
            <CardDescription>Feedback from filmmakers and attendees</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <p className="italic text-muted-foreground">
                  "The Beverly Hills Film Festival provided the perfect platform to showcase our work. The industry connections we made were invaluable."
                </p>
                <p className="text-sm font-semibold">- Maria Rodriguez, Director</p>
              </div>
              <div className="space-y-2">
                <p className="italic text-muted-foreground">
                  "An exceptionally well-organized festival with a genuine commitment to supporting independent cinema. We'll definitely be back next year."
                </p>
                <p className="text-sm font-semibold">- James Chen, Producer</p>
              </div>
              <div className="space-y-2">
                <p className="italic text-muted-foreground">
                  "The quality of films and the passion of the festival team made this an unforgettable experience. BHFF is a must-attend event."
                </p>
                <p className="text-sm font-semibold">- Sarah Williams, Film Critic</p>
              </div>
              <div className="space-y-2">
                <p className="italic text-muted-foreground">
                  "From the opening gala to the closing ceremony, every detail was perfect. This festival truly celebrates the art of filmmaking."
                </p>
                <p className="text-sm font-semibold">- Michael Park, Attendee</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Thank You & Save the Date */}
        <div className="rounded-lg bg-primary/10 p-8 text-center">
          <h3 className="mb-2 text-2xl font-bold">Thank You for an Amazing Festival!</h3>
          <p className="mb-6 text-muted-foreground">
            Save the date for Beverly Hills Film Festival 2025
          </p>
          <p className="mb-6 text-3xl font-bold">November 14-17, 2025</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild>
              <a href="/submit">Submit Your Film</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/gallery">View Photo Gallery</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}