'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Ticket, 
  Calendar, 
  MapPin, 
  Clock,
  Download,
  QrCode,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

interface TicketData {
  id: string;
  ticketNumber: string;
  filmTitle: string;
  screeningDate: string;
  screeningTime: string;
  venue: string;
  venuAddress: string;
  seatNumber?: string;
  ticketType: 'standard' | 'vip' | 'student';
  price: number;
  status: 'active' | 'used' | 'expired';
  purchaseDate: string;
  qrCode?: string;
}

export default function AccountTicketsPage() {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/buyer/tickets', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Mock data for demonstration
        const mockTickets: TicketData[] = [
          {
            id: '1',
            ticketNumber: 'BHF2024-001',
            filmTitle: 'The Last Sunset',
            screeningDate: '2024-04-15',
            screeningTime: '7:00 PM',
            venue: 'Beverly Theater',
            venuAddress: '123 Beverly Drive, Beverly Hills, CA 90210',
            seatNumber: 'A15',
            ticketType: 'vip',
            price: 150,
            status: 'active',
            purchaseDate: '2024-03-01',
          },
          {
            id: '2',
            ticketNumber: 'BHF2024-002',
            filmTitle: 'City Dreams',
            screeningDate: '2024-04-16',
            screeningTime: '5:00 PM',
            venue: 'Hollywood Plaza',
            venuAddress: '456 Sunset Blvd, Hollywood, CA 90028',
            seatNumber: 'B22',
            ticketType: 'standard',
            price: 75,
            status: 'active',
            purchaseDate: '2024-03-02',
          },
          {
            id: '3',
            ticketNumber: 'BHF2024-003',
            filmTitle: 'Voices of Change',
            screeningDate: '2024-03-10',
            screeningTime: '3:00 PM',
            venue: 'Academy Hall',
            venuAddress: '789 Academy Way, Beverly Hills, CA 90212',
            ticketType: 'student',
            price: 50,
            status: 'used',
            purchaseDate: '2024-03-05',
          },
        ];
        setTickets(mockTickets);
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const upcomingTickets = tickets.filter(t => t.status === 'active');
  const pastTickets = tickets.filter(t => t.status === 'used' || t.status === 'expired');

  const getTicketTypeColor = (type: string) => {
    switch (type) {
      case 'vip':
        return 'bg-purple-500';
      case 'student':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const downloadTicket = (ticketId: string) => {
    // Implement ticket download functionality
    console.log('Downloading ticket:', ticketId);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Tickets</h1>
        <p className="text-muted-foreground">
          View and manage your festival tickets
        </p>
      </div>

      {tickets.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Ticket className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No tickets yet</h3>
            <p className="text-muted-foreground mb-4">
              Start exploring the festival and book your first screening!
            </p>
            <Link href="/">
              <Button>Browse Films</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upcoming">
              Upcoming ({upcomingTickets.length})
            </TabsTrigger>
            <TabsTrigger value="past">
              Past ({pastTickets.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingTickets.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-muted-foreground">No upcoming screenings</p>
                </Card>
              </Card>
            ) : (
              upcomingTickets.map((ticket) => (
                <Card key={ticket.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                      <div className="flex-1 space-y-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold">{ticket.filmTitle}</h3>
                            <Badge className={`${getTicketTypeColor(ticket.ticketType)} text-white`}>
                              {ticket.ticketType.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Ticket #{ticket.ticketNumber}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{new Date(ticket.screeningDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{ticket.screeningTime}</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <div>
                              <p className="font-medium">{ticket.venue}</p>
                              <p className="text-muted-foreground">{ticket.venuAddress}</p>
                            </div>
                          </div>
                          {ticket.seatNumber && (
                            <div>
                              <p className="font-medium">Seat: {ticket.seatNumber}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col items-center justify-center gap-4 p-4 border-l">
                        <div className="w-32 h-32 bg-muted rounded flex items-center justify-center">
                          <QrCode className="h-24 w-24 text-muted-foreground" />
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => downloadTicket(ticket.id)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          Please arrive 15 minutes before the screening time. 
                          Bring a valid ID along with your ticket.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {pastTickets.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-muted-foreground">No past tickets</p>
                </Card>
              </Card>
            ) : (
              pastTickets.map((ticket) => (
                <Card key={ticket.id} className="opacity-75">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{ticket.filmTitle}</h3>
                          <Badge variant="secondary">
                            {ticket.status === 'used' ? 'Attended' : 'Expired'}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span>{new Date(ticket.screeningDate).toLocaleDateString()}</span>
                          <span>{ticket.screeningTime}</span>
                          <span>{ticket.venue}</span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadTicket(ticket.id)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Receipt
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      )}

      {/* Purchase Summary */}
      {tickets.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Purchase Summary</CardTitle>
            <CardDescription>Your ticket purchase history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Tickets Purchased</span>
                <span className="font-medium">{tickets.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Amount Spent</span>
                <span className="font-medium">
                  ${tickets.reduce((sum, t) => sum + t.price, 0).toFixed(2)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}