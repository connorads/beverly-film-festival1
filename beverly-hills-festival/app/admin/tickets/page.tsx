'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Search, 
  Download, 
  QrCode,
  CheckCircle,
  XCircle,
  Clock,
  Ticket
} from 'lucide-react';

interface TicketData {
  id: string;
  ticketNumber: string;
  purchaserName: string;
  purchaserEmail: string;
  filmTitle: string;
  screeningDate: string;
  screeningTime: string;
  venue: string;
  ticketType: 'standard' | 'vip' | 'student';
  price: number;
  status: 'active' | 'used' | 'cancelled';
  purchaseDate: string;
}

export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<TicketData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTickets();
  }, []);

  useEffect(() => {
    filterTickets();
  }, [tickets, searchTerm, statusFilter, typeFilter]);

  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/tickets', {
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
            purchaserName: 'John Doe',
            purchaserEmail: 'john@example.com',
            filmTitle: 'The Last Sunset',
            screeningDate: '2024-04-15',
            screeningTime: '7:00 PM',
            venue: 'Beverly Theater',
            ticketType: 'vip',
            price: 150,
            status: 'active',
            purchaseDate: '2024-03-01',
          },
          {
            id: '2',
            ticketNumber: 'BHF2024-002',
            purchaserName: 'Jane Smith',
            purchaserEmail: 'jane@example.com',
            filmTitle: 'City Dreams',
            screeningDate: '2024-04-16',
            screeningTime: '5:00 PM',
            venue: 'Hollywood Plaza',
            ticketType: 'standard',
            price: 75,
            status: 'used',
            purchaseDate: '2024-03-02',
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

  const filterTickets = () => {
    let filtered = tickets;

    if (searchTerm) {
      filtered = filtered.filter(ticket =>
        ticket.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.purchaserName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.purchaserEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.filmTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(ticket => ticket.status === statusFilter);
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(ticket => ticket.ticketType === typeFilter);
    }

    setFilteredTickets(filtered);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'used':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'used':
        return 'secondary';
      case 'cancelled':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case 'vip':
        return 'default';
      case 'standard':
        return 'secondary';
      case 'student':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const exportTickets = () => {
    // Implement CSV export functionality
    console.log('Exporting tickets...');
  };

  const validateTicket = async (ticketId: string) => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/tickets/${ticketId}/validate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Update ticket status
        setTickets(tickets.map(ticket =>
          ticket.id === ticketId ? { ...ticket, status: 'used' } : ticket
        ));
      }
    } catch (error) {
      console.error('Error validating ticket:', error);
    }
  };

  const stats = {
    total: tickets.length,
    active: tickets.filter(t => t.status === 'active').length,
    used: tickets.filter(t => t.status === 'used').length,
    cancelled: tickets.filter(t => t.status === 'cancelled').length,
    revenue: tickets.reduce((sum, t) => sum + (t.status !== 'cancelled' ? t.price : 0), 0),
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ticket Management</h1>
          <p className="text-muted-foreground">
            Manage and track festival tickets
          </p>
        </div>
        <Button onClick={exportTickets}>
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Used</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.used}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.cancelled}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.revenue.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search tickets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="used">Used</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="vip">VIP</SelectItem>
                <SelectItem value="student">Student</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
              <Ticket className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {filteredTickets.length} tickets found
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tickets Table */}
      <Card>
        <CardHeader>
          <CardTitle>Tickets</CardTitle>
          <CardDescription>All ticket purchases and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket #</TableHead>
                <TableHead>Purchaser</TableHead>
                <TableHead>Film</TableHead>
                <TableHead>Screening</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-medium">{ticket.ticketNumber}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{ticket.purchaserName}</p>
                      <p className="text-sm text-muted-foreground">{ticket.purchaserEmail}</p>
                    </div>
                  </TableCell>
                  <TableCell>{ticket.filmTitle}</TableCell>
                  <TableCell>
                    <div>
                      <p>{ticket.screeningDate}</p>
                      <p className="text-sm text-muted-foreground">{ticket.screeningTime}</p>
                      <p className="text-sm text-muted-foreground">{ticket.venue}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getTypeBadgeVariant(ticket.ticketType)}>
                      {ticket.ticketType.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>${ticket.price}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(ticket.status)}
                      <Badge variant={getStatusBadgeVariant(ticket.status)}>
                        {ticket.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={ticket.status !== 'active'}
                        onClick={() => validateTicket(ticket.id)}
                      >
                        <QrCode className="h-4 w-4" />
                      </Button>
                      {ticket.status === 'active' && (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            // Implement cancel functionality
                          }}
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredTickets.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No tickets found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}