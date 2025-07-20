'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, DollarSign, Film, FileText, Award, Clock } from 'lucide-react'
import Link from 'next/link'

export default function SubmitPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">
            Submit Your Film
          </h1>
          <p className="text-xl text-muted-foreground">
            Join the prestigious Beverly Hills Film Festival and showcase your work to industry professionals
          </p>
        </div>

        {/* Submission Deadline */}
        <Card className="mb-8 border-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Submission Deadlines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <p className="font-semibold">Early Bird</p>
                <p className="text-sm text-muted-foreground">March 15, 2024</p>
                <p className="text-sm font-semibold text-green-600">Save 30%</p>
              </div>
              <div>
                <p className="font-semibold">Regular</p>
                <p className="text-sm text-muted-foreground">June 15, 2024</p>
                <p className="text-sm text-muted-foreground">Standard rates</p>
              </div>
              <div>
                <p className="font-semibold">Late</p>
                <p className="text-sm text-muted-foreground">August 15, 2024</p>
                <p className="text-sm text-orange-600">+50% late fee</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Film className="h-5 w-5" />
              Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="mb-2 font-semibold">Narrative</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Feature Film (70+ minutes)</li>
                  <li>• Short Film (under 40 minutes)</li>
                  <li>• Student Film</li>
                  <li>• Web Series</li>
                </ul>
              </div>
              <div>
                <h4 className="mb-2 font-semibold">Documentary</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Feature Documentary</li>
                  <li>• Short Documentary</li>
                  <li>• Docuseries</li>
                  <li>• Social Impact</li>
                </ul>
              </div>
              <div>
                <h4 className="mb-2 font-semibold">Animation</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Animated Feature</li>
                  <li>• Animated Short</li>
                  <li>• Experimental</li>
                </ul>
              </div>
              <div>
                <h4 className="mb-2 font-semibold">Special Categories</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Music Video</li>
                  <li>• Commercial</li>
                  <li>• Virtual Reality</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submission Fees */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Submission Fees
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="pb-2 text-left">Category</th>
                    <th className="pb-2 text-center">Early Bird</th>
                    <th className="pb-2 text-center">Regular</th>
                    <th className="pb-2 text-center">Late</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-2">Feature Film</td>
                    <td className="py-2 text-center">$75</td>
                    <td className="py-2 text-center">$100</td>
                    <td className="py-2 text-center">$150</td>
                  </tr>
                  <tr>
                    <td className="py-2">Short Film</td>
                    <td className="py-2 text-center">$45</td>
                    <td className="py-2 text-center">$65</td>
                    <td className="py-2 text-center">$95</td>
                  </tr>
                  <tr>
                    <td className="py-2">Student Film</td>
                    <td className="py-2 text-center">$35</td>
                    <td className="py-2 text-center">$45</td>
                    <td className="py-2 text-center">$65</td>
                  </tr>
                  <tr>
                    <td className="py-2">Documentary</td>
                    <td className="py-2 text-center">$65</td>
                    <td className="py-2 text-center">$85</td>
                    <td className="py-2 text-center">$125</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Requirements */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Submission Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• Films must be completed after January 1, 2022</li>
              <li>• All entries must include English subtitles (if not in English)</li>
              <li>• Submitted films must not be available online for free viewing</li>
              <li>• Multiple submissions are allowed with separate entry fees</li>
              <li>• Films must be uploaded to FilmFreeway or sent via secure screener</li>
              <li>• High-resolution stills and promotional materials required</li>
            </ul>
          </CardContent>
        </Card>

        {/* Awards */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Awards & Prizes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Grand Jury Prize</h4>
                <p className="text-sm text-muted-foreground">
                  $10,000 cash prize + Industry meetings + Distribution support
                </p>
              </div>
              <div>
                <h4 className="font-semibold">Best Feature Film</h4>
                <p className="text-sm text-muted-foreground">
                  $5,000 cash prize + Trophy + Industry recognition
                </p>
              </div>
              <div>
                <h4 className="font-semibold">Category Winners</h4>
                <p className="text-sm text-muted-foreground">
                  Trophy + Certificate + Festival laurels + Industry exposure
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="rounded-lg bg-primary/10 p-8 text-center">
          <Clock className="mx-auto mb-4 h-12 w-12 text-primary" />
          <h3 className="mb-2 text-2xl font-bold">Ready to Submit?</h3>
          <p className="mb-6 text-muted-foreground">
            Submit your film through FilmFreeway - our official submission platform
          </p>
          <Button asChild size="lg" className="font-semibold">
            <a 
              href="https://filmfreeway.com/BeverlyHillsFilmFestival" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Submit on FilmFreeway
            </a>
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            Questions? Email us at{' '}
            <a href="mailto:submissions@bhfilmfest.com" className="font-medium underline">
              submissions@bhfilmfest.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}