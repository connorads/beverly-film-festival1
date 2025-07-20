'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send the data to an API
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="container py-12">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
            <Send className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="mb-4 text-3xl font-bold">Message Sent!</h1>
          <p className="mb-8 text-lg text-muted-foreground">
            Thank you for contacting us. We'll get back to you within 24-48 hours.
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
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground">
            We're here to help with your festival inquiries
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
                <CardDescription>
                  Choose the best way to reach us
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <a href="mailto:info@bhfilmfest.com" className="text-sm text-muted-foreground hover:text-primary">
                      info@bhfilmfest.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold">Phone</p>
                    <a href="tel:+13105551234" className="text-sm text-muted-foreground hover:text-primary">
                      (310) 555-1234
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold">Office</p>
                    <p className="text-sm text-muted-foreground">
                      123 Rodeo Drive<br />
                      Beverly Hills, CA 90210
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold">Office Hours</p>
                    <p className="text-sm text-muted-foreground">
                      Monday - Friday<br />
                      9:00 AM - 6:00 PM PST
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Department Contacts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Department Contacts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold">Film Submissions</p>
                  <a href="mailto:submissions@bhfilmfest.com" className="text-muted-foreground hover:text-primary">
                    submissions@bhfilmfest.com
                  </a>
                </div>
                <div>
                  <p className="font-semibold">Press & Media</p>
                  <a href="mailto:press@bhfilmfest.com" className="text-muted-foreground hover:text-primary">
                    press@bhfilmfest.com
                  </a>
                </div>
                <div>
                  <p className="font-semibold">Sponsorships</p>
                  <a href="mailto:sponsors@bhfilmfest.com" className="text-muted-foreground hover:text-primary">
                    sponsors@bhfilmfest.com
                  </a>
                </div>
                <div>
                  <p className="font-semibold">Volunteers</p>
                  <a href="mailto:volunteers@bhfilmfest.com" className="text-muted-foreground hover:text-primary">
                    volunteers@bhfilmfest.com
                  </a>
                </div>
                <div>
                  <p className="font-semibold">Tickets & Passes</p>
                  <a href="mailto:tickets@bhfilmfest.com" className="text-muted-foreground hover:text-primary">
                    tickets@bhfilmfest.com
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Send Us a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll respond as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="name">Your Name *</Label>
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
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="submissions">Film Submissions</SelectItem>
                        <SelectItem value="tickets">Tickets & Passes</SelectItem>
                        <SelectItem value="press">Press & Media</SelectItem>
                        <SelectItem value="sponsorship">Sponsorship</SelectItem>
                        <SelectItem value="volunteer">Volunteer</SelectItem>
                        <SelectItem value="technical">Technical Support</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Brief description of your inquiry"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please provide details about your inquiry..."
                      rows={6}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      * Required fields
                    </p>
                    <Button type="submit" size="lg" className="gap-2">
                      <Send className="h-4 w-4" />
                      Send Message
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* FAQ Link */}
            <Card className="mt-6 bg-muted/50">
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <h3 className="font-semibold">Frequently Asked Questions</h3>
                  <p className="text-sm text-muted-foreground">
                    Find quick answers to common questions
                  </p>
                </div>
                <Button variant="outline" asChild>
                  <a href="/faq">View FAQ</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Visit Our Office</CardTitle>
            <CardDescription>
              Located in the heart of Beverly Hills
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-[21/9] rounded-lg bg-muted">
              {/* In production, this would be an actual map embed */}
              <div className="flex h-full items-center justify-center text-muted-foreground">
                <MapPin className="mr-2 h-5 w-5" />
                Interactive map would be displayed here
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}