'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Heart, Users, Calendar, Clock, Award, Coffee } from 'lucide-react'
import { cn } from '@/lib/utils'

const volunteerRoles = [
  { id: 'guest-services', label: 'Guest Services & Registration' },
  { id: 'venue-support', label: 'Venue Support & Ushering' },
  { id: 'filmmaker-liaison', label: 'Filmmaker Liaison' },
  { id: 'media-press', label: 'Media & Press Support' },
  { id: 'event-setup', label: 'Event Setup & Breakdown' },
  { id: 'social-media', label: 'Social Media & Photography' },
  { id: 'transportation', label: 'Transportation & Logistics' },
  { id: 'tech-support', label: 'Technical Support' }
]

const availability = [
  { id: 'nov-15', label: 'Thursday, Nov 15 (Opening Night)' },
  { id: 'nov-16', label: 'Friday, Nov 16' },
  { id: 'nov-17', label: 'Saturday, Nov 17' },
  { id: 'nov-18', label: 'Sunday, Nov 18 (Closing Night)' },
  { id: 'pre-fest', label: 'Pre-Festival Setup (Nov 13-14)' }
]

export default function VolunteerPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    roles: [] as string[],
    availability: [] as string[],
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send the data to an API
    setSubmitted(true)
  }

  const toggleRole = (roleId: string) => {
    setFormData(prev => ({
      ...prev,
      roles: prev.roles.includes(roleId)
        ? prev.roles.filter(id => id !== roleId)
        : [...prev.roles, roleId]
    }))
  }

  const toggleAvailability = (dayId: string) => {
    setFormData(prev => ({
      ...prev,
      availability: prev.availability.includes(dayId)
        ? prev.availability.filter(id => id !== dayId)
        : [...prev.availability, dayId]
    }))
  }

  if (submitted) {
    return (
      <div className="container py-12">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
            <Heart className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="mb-4 text-3xl font-bold">Thank You for Your Interest!</h1>
          <p className="mb-8 text-lg text-muted-foreground">
            We've received your volunteer application and will be in touch soon with more information about joining our festival team.
          </p>
          <Button asChild>
            <a href="/">Return to Home</a>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">
            Volunteer at BHFF
          </h1>
          <p className="text-xl text-muted-foreground">
            Be part of the magic and help create an unforgettable festival experience
          </p>
        </div>

        {/* Benefits */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Volunteer Benefits</CardTitle>
            <CardDescription>What you'll receive as a BHFF volunteer</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-start gap-3">
                <Award className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold">Festival Access</p>
                  <p className="text-sm text-muted-foreground">
                    Complimentary access to film screenings during off-duty hours
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold">Networking</p>
                  <p className="text-sm text-muted-foreground">
                    Connect with filmmakers, industry professionals, and fellow film lovers
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Coffee className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold">Meals & Refreshments</p>
                  <p className="text-sm text-muted-foreground">
                    Complimentary meals and snacks during your volunteer shifts
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Heart className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold">Certificate & Recognition</p>
                  <p className="text-sm text-muted-foreground">
                    Official volunteer certificate and festival t-shirt
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Application Form */}
        <Card>
          <CardHeader>
            <CardTitle>Volunteer Application</CardTitle>
            <CardDescription>Join our team of dedicated festival volunteers</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Personal Information</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="max-w-xs"
                  />
                </div>
              </div>

              {/* Volunteer Preferences */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Volunteer Preferences</h3>
                
                {/* Roles */}
                <div>
                  <Label>Areas of Interest (select all that apply) *</Label>
                  <div className="mt-3 space-y-3">
                    {volunteerRoles.map((role) => (
                      <label
                        key={role.id}
                        className="flex items-center space-x-3 cursor-pointer"
                      >
                        <Checkbox
                          checked={formData.roles.includes(role.id)}
                          onCheckedChange={() => toggleRole(role.id)}
                        />
                        <span className="text-sm">{role.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <Label>Availability (select all that apply) *</Label>
                  <div className="mt-3 space-y-3">
                    {availability.map((day) => (
                      <label
                        key={day.id}
                        className="flex items-center space-x-3 cursor-pointer"
                      >
                        <Checkbox
                          checked={formData.availability.includes(day.id)}
                          onCheckedChange={() => toggleAvailability(day.id)}
                        />
                        <span className="text-sm">{day.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div>
                <Label htmlFor="experience">Previous Volunteer/Event Experience</Label>
                <Textarea
                  id="experience"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  placeholder="Tell us about any relevant experience..."
                  rows={3}
                />
              </div>

              {/* Additional Message */}
              <div>
                <Label htmlFor="message">Why do you want to volunteer at BHFF?</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share your motivation for joining our team..."
                  rows={4}
                />
              </div>

              {/* Submit */}
              <div className="flex items-center justify-between pt-4">
                <p className="text-sm text-muted-foreground">
                  * Required fields
                </p>
                <Button 
                  type="submit" 
                  size="lg"
                  disabled={formData.roles.length === 0 || formData.availability.length === 0}
                >
                  Submit Application
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <Card className="mt-8 border-muted bg-muted/50">
          <CardHeader>
            <CardTitle className="text-lg">Important Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              <strong>Time Commitment:</strong> Volunteers are expected to commit to a minimum of one 4-hour shift.
            </p>
            <p>
              <strong>Training:</strong> All volunteers must attend a brief orientation session before the festival.
            </p>
            <p>
              <strong>Age Requirement:</strong> Volunteers must be 18 years or older.
            </p>
            <p>
              <strong>Questions?</strong> Contact us at{' '}
              <a href="mailto:volunteers@bhfilmfest.com" className="text-primary underline">
                volunteers@bhfilmfest.com
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}