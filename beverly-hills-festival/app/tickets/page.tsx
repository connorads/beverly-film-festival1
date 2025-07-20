'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Ticket, Calendar, MapPin, Users, Star, Clock, CreditCard } from 'lucide-react'
import { cn } from '@/lib/utils'

const ticketTypes = [
  {
    id: 'opening-night',
    name: 'Opening Night Gala',
    price: 250,
    description: 'Red carpet premiere, cocktail reception, and after-party',
    features: ['Red carpet access', 'Premium seating', 'Cocktail reception', 'After-party entry'],
    availability: 'Limited',
    date: 'November 15, 2024',
    popular: true
  },
  {
    id: 'all-access',
    name: 'All-Access Festival Pass',
    price: 500,
    description: 'Complete access to all films, panels, and special events',
    features: ['All film screenings', 'Industry panels', 'Networking events', 'Closing ceremony'],
    availability: 'Available',
    date: 'November 15-18, 2024'
  },
  {
    id: 'single-day',
    name: 'Single Day Pass',
    price: 125,
    description: 'Access to all screenings and events for one day',
    features: ['All day screenings', 'Panel discussions', 'Exhibit access'],
    availability: 'Available',
    date: 'Select one day'
  },
  {
    id: 'film-only',
    name: 'Film Screening Pass',
    price: 75,
    description: 'Access to film screenings only (no special events)',
    features: ['All film screenings', 'Q&A sessions'],
    availability: 'Available',
    date: 'November 15-18, 2024'
  },
  {
    id: 'student',
    name: 'Student Pass',
    price: 50,
    description: 'Discounted access for students with valid ID',
    features: ['All film screenings', 'Select panels', 'Student networking'],
    availability: 'Requires verification',
    date: 'November 15-18, 2024'
  }
]

export default function TicketsPage() {
  const [selectedTicket, setSelectedTicket] = useState('')
  const [quantity, setQuantity] = useState(1)

  const selectedTicketInfo = ticketTypes.find(t => t.id === selectedTicket)
  const totalPrice = selectedTicketInfo ? selectedTicketInfo.price * quantity : 0

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">
            Festival Tickets
          </h1>
          <p className="text-xl text-muted-foreground">
            Secure your spot at the Beverly Hills Film Festival
          </p>
        </div>

        {/* Festival Info */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Festival Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-start gap-3">
                <Calendar className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold">Dates</p>
                  <p className="text-sm text-muted-foreground">November 15-18, 2024</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold">Venue</p>
                  <p className="text-sm text-muted-foreground">Beverly Hills Theater Complex</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold">Capacity</p>
                  <p className="text-sm text-muted-foreground">Limited seating available</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Ticket Selection */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Select Your Tickets</CardTitle>
                <CardDescription>Choose from our available ticket options</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedTicket} onValueChange={setSelectedTicket}>
                  <div className="space-y-4">
                    {ticketTypes.map((ticket) => (
                      <label
                        key={ticket.id}
                        htmlFor={ticket.id}
                        className={cn(
                          "relative flex cursor-pointer rounded-lg border p-4 transition-colors",
                          selectedTicket === ticket.id ? "border-primary bg-primary/5" : "border-border hover:bg-accent"
                        )}
                      >
                        <RadioGroupItem value={ticket.id} id={ticket.id} className="sr-only" />
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold">
                                {ticket.name}
                                {ticket.popular && (
                                  <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                                    <Star className="h-3 w-3" />
                                    Popular
                                  </span>
                                )}
                              </h3>
                              <p className="mt-1 text-sm text-muted-foreground">{ticket.description}</p>
                              <div className="mt-3 flex items-center gap-4 text-sm">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {ticket.date}
                                </span>
                                <span className={cn(
                                  "font-medium",
                                  ticket.availability === 'Limited' ? "text-orange-600" : "text-green-600"
                                )}>
                                  {ticket.availability}
                                </span>
                              </div>
                              <ul className="mt-3 space-y-1">
                                {ticket.features.map((feature, i) => (
                                  <li key={i} className="text-sm text-muted-foreground">
                                    • {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="ml-4 text-right">
                              <p className="text-2xl font-bold">${ticket.price}</p>
                              <p className="text-sm text-muted-foreground">per ticket</p>
                            </div>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </RadioGroup>

                {selectedTicket && (
                  <div className="mt-6">
                    <Label htmlFor="quantity">Number of Tickets</Label>
                    <div className="mt-2 flex items-center gap-4">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                      >
                        -
                      </Button>
                      <Input
                        id="quantity"
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                        className="w-20 text-center"
                        min="1"
                        max="10"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(Math.min(10, quantity + 1))}
                        disabled={quantity >= 10}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedTicketInfo ? (
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold">{selectedTicketInfo.name}</p>
                      <p className="text-sm text-muted-foreground">
                        ${selectedTicketInfo.price} x {quantity} ticket{quantity > 1 ? 's' : ''}
                      </p>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total</span>
                        <span>${totalPrice}</span>
                      </div>
                    </div>
                    <Button className="w-full" size="lg">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Proceed to Checkout
                    </Button>
                    <p className="text-center text-xs text-muted-foreground">
                      Secure payment powered by Stripe
                    </p>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    <Ticket className="mx-auto mb-2 h-12 w-12 opacity-20" />
                    <p>Select a ticket type to continue</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Additional Info */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-base">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>
                  <strong>Group Sales:</strong> For purchases of 10+ tickets, contact us for special rates.
                </p>
                <p>
                  <strong>Refund Policy:</strong> Full refund available up to 7 days before the event.
                </p>
                <p>
                  <strong>Contact:</strong>{' '}
                  <a href="mailto:tickets@bhfilmfest.com" className="text-primary underline">
                    tickets@bhfilmfest.com
                  </a>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}