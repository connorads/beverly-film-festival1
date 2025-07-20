'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, Film, Sparkles, Bell } from 'lucide-react'
import { useState } from 'react'
import { Input } from '@/components/ui/input'

export default function FestivalProgramPage() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-primary/10 p-4">
              <Calendar className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight">
            Festival Program
          </h1>
          <p className="text-xl text-muted-foreground">
            Coming Soon • November 15-18, 2024
          </p>
        </div>

        {/* Teaser Content */}
        <Card className="mb-8 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Get Ready for an Unforgettable Experience
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              The Beverly Hills Film Festival program is being carefully curated to bring you the best in contemporary cinema. 
              Our selection committee is reviewing hundreds of submissions to create a diverse and compelling lineup.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg bg-background p-4">
                <Film className="mb-2 h-8 w-8 text-primary" />
                <h3 className="mb-1 font-semibold">100+ Films</h3>
                <p className="text-sm text-muted-foreground">
                  Features, shorts, documentaries, and more from around the world
                </p>
              </div>
              <div className="rounded-lg bg-background p-4">
                <Clock className="mb-2 h-8 w-8 text-primary" />
                <h3 className="mb-1 font-semibold">4 Days</h3>
                <p className="text-sm text-muted-foreground">
                  Packed schedule of screenings, panels, and networking events
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What to Expect */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>What to Expect</CardTitle>
            <CardDescription>A preview of this year's festival highlights</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="mb-2 font-semibold">Opening Night Gala</h4>
              <p className="text-sm text-muted-foreground">
                Red carpet premiere of a highly anticipated film, followed by an exclusive reception with filmmakers and industry professionals.
              </p>
            </div>
            <div>
              <h4 className="mb-2 font-semibold">Competition Categories</h4>
              <p className="text-sm text-muted-foreground">
                Best Feature, Best Short, Best Documentary, Best Student Film, and special jury awards across multiple genres.
              </p>
            </div>
            <div>
              <h4 className="mb-2 font-semibold">Industry Panels</h4>
              <p className="text-sm text-muted-foreground">
                Discussions on filmmaking, distribution, emerging technologies, and the future of cinema with leading industry experts.
              </p>
            </div>
            <div>
              <h4 className="mb-2 font-semibold">Networking Events</h4>
              <p className="text-sm text-muted-foreground">
                Daily mixers, filmmaker brunches, and the closing night awards ceremony providing opportunities to connect.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Email Notification */}
        <Card className="border-0 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Be the First to Know
            </CardTitle>
            <CardDescription>
              Sign up to receive the full program schedule as soon as it's released
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button type="submit">
                  Notify Me
                </Button>
              </form>
            ) : (
              <div className="rounded-lg bg-green-100 p-4 text-center text-green-800 dark:bg-green-900/20 dark:text-green-400">
                <p className="font-medium">Thank you for subscribing!</p>
                <p className="text-sm">We'll email you as soon as the program is announced.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Timeline */}
        <div className="mt-12">
          <h2 className="mb-6 text-center text-2xl font-bold">Important Dates</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                1
              </div>
              <div className="flex-1">
                <p className="font-semibold">October 15, 2024</p>
                <p className="text-sm text-muted-foreground">Full program announcement</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                2
              </div>
              <div className="flex-1">
                <p className="font-semibold">November 1, 2024</p>
                <p className="text-sm text-muted-foreground">Individual ticket sales begin</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                3
              </div>
              <div className="flex-1">
                <p className="font-semibold">November 15-18, 2024</p>
                <p className="text-sm text-muted-foreground">Festival dates</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}