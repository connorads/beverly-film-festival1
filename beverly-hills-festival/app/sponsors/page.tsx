'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sparkles, Award, Heart, Star, Building2, Briefcase, Gift, Mail } from 'lucide-react'
import Image from 'next/image'

// Mock sponsor data - in production, this would come from an API
const sponsors = {
  presenting: [
    { name: 'Global Studios', logo: '/api/placeholder/300/150', website: '#' },
    { name: 'Premier Entertainment', logo: '/api/placeholder/300/150', website: '#' }
  ],
  platinum: [
    { name: 'Luxury Motors Beverly Hills', logo: '/api/placeholder/250/125', website: '#' },
    { name: 'The Beverly Hotel', logo: '/api/placeholder/250/125', website: '#' },
    { name: 'Elite Productions', logo: '/api/placeholder/250/125', website: '#' }
  ],
  gold: [
    { name: 'Cinema Tech Solutions', logo: '/api/placeholder/200/100', website: '#' },
    { name: 'Film Finance Partners', logo: '/api/placeholder/200/100', website: '#' },
    { name: 'Media Distribution Co', logo: '/api/placeholder/200/100', website: '#' },
    { name: 'Sound Design Studios', logo: '/api/placeholder/200/100', website: '#' }
  ],
  silver: [
    { name: 'Local Restaurant Group', logo: '/api/placeholder/150/75', website: '#' },
    { name: 'Beverly Hills Magazine', logo: '/api/placeholder/150/75', website: '#' },
    { name: 'Premiere Catering', logo: '/api/placeholder/150/75', website: '#' },
    { name: 'Event Photography Pro', logo: '/api/placeholder/150/75', website: '#' },
    { name: 'Film Equipment Rentals', logo: '/api/placeholder/150/75', website: '#' },
    { name: 'Legal Services LLC', logo: '/api/placeholder/150/75', website: '#' }
  ]
}

const sponsorshipLevels = [
  {
    name: 'Presenting Sponsor',
    price: '$50,000+',
    icon: Sparkles,
    color: 'text-purple-600',
    benefits: [
      'Title sponsorship with logo on all materials',
      'Opening/closing ceremony speaking opportunity',
      '20 VIP all-access passes',
      'Premium booth at festival venue',
      'Full-page ad in festival program',
      'Logo on step & repeat at all events',
      'Exclusive networking reception',
      'Social media partnership campaign'
    ]
  },
  {
    name: 'Platinum Sponsor',
    price: '$25,000',
    icon: Award,
    color: 'text-gray-600',
    benefits: [
      'Logo on select marketing materials',
      'Award category sponsorship',
      '10 VIP all-access passes',
      'Exhibition space at venue',
      'Half-page ad in program',
      'Logo on main step & repeat',
      'Invitation to VIP events'
    ]
  },
  {
    name: 'Gold Sponsor',
    price: '$10,000',
    icon: Star,
    color: 'text-yellow-600',
    benefits: [
      'Logo on festival website',
      'Event or screening sponsorship',
      '6 festival passes',
      'Quarter-page ad in program',
      'Social media mentions',
      'Networking event access'
    ]
  },
  {
    name: 'Silver Sponsor',
    price: '$5,000',
    icon: Heart,
    color: 'text-gray-500',
    benefits: [
      'Logo on website sponsor page',
      '4 festival passes',
      'Program listing',
      'Opening night tickets',
      'Social media recognition'
    ]
  }
]

export default function SponsorsPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">
            Our Sponsors & Partners
          </h1>
          <p className="text-xl text-muted-foreground">
            Thank you to the organizations that make our festival possible
          </p>
        </div>

        {/* Current Sponsors */}
        <div className="mb-16 space-y-12">
          {/* Presenting Sponsors */}
          <div>
            <div className="mb-6 flex items-center justify-center gap-2">
              <Sparkles className="h-6 w-6 text-purple-600" />
              <h2 className="text-2xl font-bold">Presenting Sponsors</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {sponsors.presenting.map((sponsor, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-[2/1] bg-muted p-8">
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      width={300}
                      height={150}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Platinum Sponsors */}
          <div>
            <div className="mb-6 flex items-center justify-center gap-2">
              <Award className="h-5 w-5 text-gray-600" />
              <h3 className="text-xl font-bold">Platinum Sponsors</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {sponsors.platinum.map((sponsor, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-[2/1] bg-muted p-6">
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      width={250}
                      height={125}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Gold Sponsors */}
          <div>
            <div className="mb-6 flex items-center justify-center gap-2">
              <Star className="h-5 w-5 text-yellow-600" />
              <h3 className="text-xl font-bold">Gold Sponsors</h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {sponsors.gold.map((sponsor, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-[2/1] bg-muted p-4">
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      width={200}
                      height={100}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Silver Sponsors */}
          <div>
            <div className="mb-6 flex items-center justify-center gap-2">
              <Heart className="h-5 w-5 text-gray-500" />
              <h3 className="text-xl font-bold">Silver Sponsors</h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {sponsors.silver.map((sponsor, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-[2/1] bg-muted p-3">
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      width={150}
                      height={75}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Become a Sponsor */}
        <Card className="mb-12 border-primary bg-gradient-to-br from-primary/5 to-primary/10">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Become a Sponsor</CardTitle>
            <CardDescription className="text-center text-base">
              Join us in celebrating and supporting independent cinema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-8 text-center text-muted-foreground">
              Sponsoring the Beverly Hills Film Festival provides unique opportunities to connect with filmmakers, 
              industry professionals, and cinema enthusiasts while supporting the arts in our community.
            </p>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {sponsorshipLevels.map((level, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <level.icon className={`mx-auto h-8 w-8 ${level.color}`} />
                    <CardTitle className="text-lg">{level.name}</CardTitle>
                    <p className="text-2xl font-bold">{level.price}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-left text-sm">
                      {level.benefits.slice(0, 4).map((benefit, i) => (
                        <li key={i} className="text-muted-foreground">• {benefit}</li>
                      ))}
                      {level.benefits.length > 4 && (
                        <li className="font-medium text-primary">
                          + {level.benefits.length - 4} more benefits
                        </li>
                      )}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Why Sponsor */}
        <div className="mb-12 grid gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <Building2 className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Brand Visibility</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Reach thousands of attendees including industry professionals, media, and influential consumers in the entertainment capital.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Briefcase className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Business Development</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Network with decision-makers, creative professionals, and potential partners in exclusive sponsor-only events.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Gift className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Community Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Support emerging filmmakers and contribute to the cultural vibrancy of Beverly Hills and the global film community.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Contact CTA */}
        <Card className="bg-muted/50 text-center">
          <CardContent className="py-8">
            <Mail className="mx-auto mb-4 h-12 w-12 text-primary" />
            <h3 className="mb-2 text-2xl font-bold">Ready to Partner With Us?</h3>
            <p className="mb-6 text-muted-foreground">
              Contact our sponsorship team to discuss custom packages and opportunities
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <a href="mailto:sponsors@bhfilmfest.com">
                  Contact Sponsorship Team
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/contact">General Inquiries</a>
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Email: sponsors@bhfilmfest.com | Phone: (310) 555-1234
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}