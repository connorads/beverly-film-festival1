'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, FileText, Image, Camera, Newspaper, Mail, Phone, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const pressReleases = [
  {
    date: '2024-10-15',
    title: 'Beverly Hills Film Festival Announces 2024 Official Selection',
    description: 'Over 120 films from 42 countries to screen at prestigious festival',
    downloadUrl: '#'
  },
  {
    date: '2024-09-20',
    title: 'BHFF Partners with Major Streaming Platform for Distribution',
    description: 'Selected films to receive exclusive streaming opportunities',
    downloadUrl: '#'
  },
  {
    date: '2024-08-30',
    title: 'Festival Announces Star-Studded Jury Panel',
    description: 'Academy Award winners to judge this year\'s competition',
    downloadUrl: '#'
  }
]

const mediaAssets = [
  { type: 'Logo Package', format: 'ZIP', size: '15 MB', icon: Image },
  { type: 'Festival Photos', format: 'ZIP', size: '250 MB', icon: Camera },
  { type: 'B-Roll Footage', format: 'MP4', size: '1.2 GB', icon: Camera },
  { type: 'Press Kit', format: 'PDF', size: '5 MB', icon: FileText }
]

export default function PressPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">
            Press & Media Center
          </h1>
          <p className="text-xl text-muted-foreground">
            Resources for journalists and media professionals
          </p>
        </div>

        {/* Press Accreditation */}
        <Card className="mb-8 border-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Newspaper className="h-5 w-5" />
              Press Accreditation for 2024
            </CardTitle>
            <CardDescription>
              Apply for media credentials to cover the festival
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="mb-2 font-semibold">Accreditation Benefits</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Access to press screenings</li>
                  <li>• Invitation to press conferences</li>
                  <li>• Access to media lounge</li>
                  <li>• Interview opportunities</li>
                </ul>
              </div>
              <div>
                <h4 className="mb-2 font-semibold">Requirements</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Valid press credentials</li>
                  <li>• Letter of assignment</li>
                  <li>• Published work samples</li>
                  <li>• Professional references</li>
                </ul>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button>Apply for Press Pass</Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download Application Form
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Press Releases */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Latest Press Releases</CardTitle>
                <CardDescription>
                  Official announcements and festival news
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pressReleases.map((release, index) => (
                    <div key={index} className="rounded-lg border p-4">
                      <div className="mb-2 flex items-start justify-between">
                        <Badge variant="outline">{release.date}</Badge>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                      <h4 className="mb-1 font-semibold">{release.title}</h4>
                      <p className="text-sm text-muted-foreground">{release.description}</p>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="mt-4 w-full">
                  View All Press Releases
                </Button>
              </CardContent>
            </Card>

            {/* Media Assets */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Media Assets</CardTitle>
                <CardDescription>
                  Downloadable resources for your coverage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  {mediaAssets.map((asset, index) => (
                    <div key={index} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-3">
                        <asset.icon className="h-8 w-8 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{asset.type}</p>
                          <p className="text-sm text-muted-foreground">
                            {asset.format} • {asset.size}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Press Contacts */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Press Contacts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    <h4 className="font-semibold">Media Relations</h4>
                  </div>
                  <p className="text-sm">Jennifer Matthews</p>
                  <p className="text-sm text-muted-foreground">Director of Communications</p>
                  <div className="mt-2 space-y-1">
                    <a href="mailto:press@bhfilmfest.com" className="flex items-center gap-2 text-sm text-primary hover:underline">
                      <Mail className="h-3 w-3" />
                      press@bhfilmfest.com
                    </a>
                    <a href="tel:+13105551235" className="flex items-center gap-2 text-sm text-primary hover:underline">
                      <Phone className="h-3 w-3" />
                      (310) 555-1235
                    </a>
                  </div>
                </div>

                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    <h4 className="font-semibold">International Press</h4>
                  </div>
                  <p className="text-sm">Marco Rossi</p>
                  <p className="text-sm text-muted-foreground">International Media Coordinator</p>
                  <div className="mt-2 space-y-1">
                    <a href="mailto:international@bhfilmfest.com" className="flex items-center gap-2 text-sm text-primary hover:underline">
                      <Mail className="h-3 w-3" />
                      international@bhfilmfest.com
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Facts */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Facts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold">Festival Dates</p>
                  <p className="text-muted-foreground">November 15-18, 2024</p>
                </div>
                <div>
                  <p className="font-semibold">Location</p>
                  <p className="text-muted-foreground">Beverly Hills Theater Complex</p>
                </div>
                <div>
                  <p className="font-semibold">Founded</p>
                  <p className="text-muted-foreground">2001</p>
                </div>
                <div>
                  <p className="font-semibold">Films Screened</p>
                  <p className="text-muted-foreground">120+ films from 42 countries</p>
                </div>
                <div>
                  <p className="font-semibold">Expected Attendance</p>
                  <p className="text-muted-foreground">3,500+ industry professionals and film enthusiasts</p>
                </div>
              </CardContent>
            </Card>

            {/* Press Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle>Press Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p className="text-muted-foreground">
                  • Embargoes must be respected for all announcements
                </p>
                <p className="text-muted-foreground">
                  • Photography allowed only in designated areas
                </p>
                <p className="text-muted-foreground">
                  • Interview requests must be submitted 48 hours in advance
                </p>
                <p className="text-muted-foreground">
                  • Press badges must be visible at all times
                </p>
                <Button variant="outline" size="sm" className="mt-4 w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Full Press Guidelines
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Press Room Info */}
        <Card className="mt-8 bg-muted/50">
          <CardHeader>
            <CardTitle>On-Site Press Room</CardTitle>
            <CardDescription>
              Available throughout the festival for accredited media
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <h4 className="mb-2 font-semibold">Facilities</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• High-speed internet</li>
                  <li>• Work stations</li>
                  <li>• Press conference room</li>
                  <li>• Interview areas</li>
                </ul>
              </div>
              <div>
                <h4 className="mb-2 font-semibold">Services</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Press kit distribution</li>
                  <li>• Interview coordination</li>
                  <li>• Translation services</li>
                  <li>• Refreshments</li>
                </ul>
              </div>
              <div>
                <h4 className="mb-2 font-semibold">Hours</h4>
                <p className="text-sm text-muted-foreground">
                  Thursday-Saturday: 9:00 AM - 10:00 PM<br />
                  Sunday: 9:00 AM - 8:00 PM
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}