'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Film, Trophy, Users, Heart, Calendar, MapPin, Target, Sparkles } from 'lucide-react'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">
            About Beverly Hills Film Festival
          </h1>
          <p className="text-xl text-muted-foreground">
            Celebrating cinematic excellence in the heart of entertainment
          </p>
        </div>

        {/* Hero Section */}
        <Card className="mb-12 overflow-hidden">
          <div className="relative aspect-[21/9] bg-muted">
            <Image
              src="/api/placeholder/1200/514"
              alt="Beverly Hills Film Festival"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <h2 className="mb-2 text-3xl font-bold">Where Dreams Meet Reality</h2>
              <p className="text-lg opacity-90">
                Since 2001, showcasing the best in independent and international cinema
              </p>
            </div>
          </div>
        </Card>

        {/* Mission & Vision */}
        <div className="mb-12 grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                The Beverly Hills Film Festival is dedicated to showcasing innovative and compelling cinema from emerging and established filmmakers worldwide. We provide a platform for artistic expression, cultural exchange, and industry networking in one of the world's most prestigious entertainment capitals.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To be the premier destination for discovering breakthrough talent and exceptional storytelling, fostering connections between filmmakers and industry professionals while celebrating the transformative power of cinema to inspire, educate, and entertain audiences worldwide.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Festival Stats */}
        <Card className="mb-12 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Festival by the Numbers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-8 text-center md:grid-cols-4">
              <div>
                <Film className="mx-auto mb-2 h-8 w-8 text-primary" />
                <p className="text-3xl font-bold">2,000+</p>
                <p className="text-sm text-muted-foreground">Films Screened</p>
              </div>
              <div>
                <Trophy className="mx-auto mb-2 h-8 w-8 text-primary" />
                <p className="text-3xl font-bold">500+</p>
                <p className="text-sm text-muted-foreground">Awards Presented</p>
              </div>
              <div>
                <Users className="mx-auto mb-2 h-8 w-8 text-primary" />
                <p className="text-3xl font-bold">50,000+</p>
                <p className="text-sm text-muted-foreground">Total Attendees</p>
              </div>
              <div>
                <Heart className="mx-auto mb-2 h-8 w-8 text-primary" />
                <p className="text-3xl font-bold">23</p>
                <p className="text-sm text-muted-foreground">Years of Excellence</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What Makes Us Special */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>What Makes BHFF Special</CardTitle>
            <CardDescription>
              More than just a film festival - a celebration of cinematic artistry
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="rounded-lg bg-primary/10 p-2">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="mb-1 font-semibold">Prime Location</h4>
                <p className="text-sm text-muted-foreground">
                  Located in the heart of Beverly Hills, minutes from major studios and production companies, providing unparalleled access to industry professionals.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="rounded-lg bg-primary/10 p-2">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="mb-1 font-semibold">Industry Connections</h4>
                <p className="text-sm text-muted-foreground">
                  Our extensive network includes distributors, agents, producers, and executives actively seeking new talent and compelling content.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="rounded-lg bg-primary/10 p-2">
                <Trophy className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="mb-1 font-semibold">Prestigious Recognition</h4>
                <p className="text-sm text-muted-foreground">
                  BHFF laurels are recognized worldwide, with many of our winners going on to achieve critical acclaim and commercial success.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="rounded-lg bg-primary/10 p-2">
                <Heart className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="mb-1 font-semibold">Filmmaker Support</h4>
                <p className="text-sm text-muted-foreground">
                  Beyond screenings, we offer year-round support including mentorship programs, distribution guidance, and promotional opportunities.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Festival Leadership</CardTitle>
            <CardDescription>
              Dedicated professionals passionate about cinema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-muted" />
                <h4 className="font-semibold">Nino Simone</h4>
                <p className="text-sm text-muted-foreground">Festival Director & CEO</p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-muted" />
                <h4 className="font-semibold">Sarah Mitchell</h4>
                <p className="text-sm text-muted-foreground">Programming Director</p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-muted" />
                <h4 className="font-semibold">Michael Chen</h4>
                <p className="text-sm text-muted-foreground">Industry Relations</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Partners & Sponsors Preview */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Our Partners</CardTitle>
            <CardDescription>
              Proud to work with industry leaders and local businesses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-sm text-muted-foreground">
              The Beverly Hills Film Festival is made possible through the generous support of our sponsors and partners who share our commitment to celebrating exceptional cinema.
            </p>
            <div className="flex justify-center">
              <Button asChild>
                <a href="/sponsors">View All Sponsors</a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Calendar className="mx-auto mb-4 h-12 w-12 text-primary" />
              <h3 className="mb-2 text-xl font-semibold">Join Us in 2024</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                November 15-18, 2024 at Beverly Hills Theater Complex
              </p>
              <Button asChild>
                <a href="/tickets">Get Tickets</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Film className="mx-auto mb-4 h-12 w-12 text-primary" />
              <h3 className="mb-2 text-xl font-semibold">Submit Your Film</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Share your story with the world at BHFF 2024
              </p>
              <Button asChild>
                <a href="/submit">Learn More</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}