'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mic, Users, Briefcase, Camera, Lightbulb, Coffee } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function PanelsEventsPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">
            Panels & Special Events
          </h1>
          <p className="text-xl text-muted-foreground">
            Coming Soon • Industry insights and networking opportunities
          </p>
        </div>

        {/* Coming Soon Card */}
        <Card className="mb-8 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardHeader>
            <CardTitle className="text-2xl">2024 Program Under Development</CardTitle>
            <CardDescription className="text-base">
              We're putting together an exceptional lineup of panels and events for this year's festival
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-muted-foreground">
              The Beverly Hills Film Festival brings together industry leaders, innovative filmmakers, and creative professionals 
              for engaging discussions and exclusive networking opportunities. Our 2024 program will feature compelling panels, 
              masterclasses, and special events designed to inspire and connect our community.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Mic className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Expert Panels</h4>
                  <p className="text-sm text-muted-foreground">Industry leaders share insights</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Networking Events</h4>
                  <p className="text-sm text-muted-foreground">Connect with fellow creatives</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Masterclasses</h4>
                  <p className="text-sm text-muted-foreground">Learn from the masters</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Coffee className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Social Mixers</h4>
                  <p className="text-sm text-muted-foreground">Casual meetups and discussions</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Expected Topics */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Expected Panel Topics</CardTitle>
            <CardDescription>A preview of discussions planned for 2024</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="mb-2 flex items-start justify-between">
                <h4 className="font-semibold">The Future of Independent Cinema</h4>
                <Badge variant="secondary">Industry</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Distribution strategies, funding models, and emerging platforms reshaping indie film
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <div className="mb-2 flex items-start justify-between">
                <h4 className="font-semibold">AI and Filmmaking</h4>
                <Badge variant="secondary">Technology</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                How artificial intelligence is transforming production, post-production, and storytelling
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <div className="mb-2 flex items-start justify-between">
                <h4 className="font-semibold">Diversity in Hollywood</h4>
                <Badge variant="secondary">Culture</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Progress, challenges, and opportunities for underrepresented voices in film
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <div className="mb-2 flex items-start justify-between">
                <h4 className="font-semibold">From Script to Screen</h4>
                <Badge variant="secondary">Production</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                The complete journey of bringing a story to life, featuring successful case studies
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Special Events Preview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Special Events</CardTitle>
            <CardDescription>Exclusive experiences beyond the screenings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <Camera className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <h4 className="font-semibold">Opening Night Gala</h4>
                <p className="text-sm text-muted-foreground">
                  Red carpet premiere with cocktail reception and industry mixer
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Briefcase className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <h4 className="font-semibold">Industry Breakfast Series</h4>
                <p className="text-sm text-muted-foreground">
                  Intimate morning sessions with producers, distributors, and executives
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <h4 className="font-semibold">Filmmaker Happy Hours</h4>
                <p className="text-sm text-muted-foreground">
                  Daily networking opportunities in a relaxed atmosphere
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Lightbulb className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <h4 className="font-semibold">Closing Awards Ceremony</h4>
                <p className="text-sm text-muted-foreground">
                  Celebrate the festival's winners with champagne and celebration
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stay Updated */}
        <div className="rounded-lg bg-muted p-8 text-center">
          <h3 className="mb-2 text-xl font-semibold">Full Schedule Coming Soon</h3>
          <p className="mb-4 text-muted-foreground">
            The complete panels and events schedule will be announced in October 2024
          </p>
          <Button asChild>
            <a href="/tickets">Get Your Festival Pass</a>
          </Button>
        </div>
      </div>
    </div>
  )
}