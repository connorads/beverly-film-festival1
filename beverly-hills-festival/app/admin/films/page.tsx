'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Search, 
  Filter, 
  CheckCircle, 
  XCircle, 
  Clock,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

interface Film {
  id: string;
  title: string;
  director: string;
  category: string;
  duration: number;
  submissionDate: string;
  status: 'pending' | 'approved' | 'rejected';
  synopsis: string;
  filmmakerEmail: string;
}

export default function AdminFilmsPage() {
  const [films, setFilms] = useState<Film[]>([]);
  const [filteredFilms, setFilteredFilms] = useState<Film[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFilms();
  }, []);

  useEffect(() => {
    filterFilms();
  }, [films, searchTerm, statusFilter, categoryFilter]);

  const fetchFilms = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/admin/films', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setFilms(data.films || []);
      }
    } catch (error) {
      console.error('Error fetching films:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterFilms = () => {
    let filtered = films;

    if (searchTerm) {
      filtered = filtered.filter(film =>
        film.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        film.director.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(film => film.status === statusFilter);
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(film => film.category === categoryFilter);
    }

    setFilteredFilms(filtered);
  };

  const updateFilmStatus = async (filmId: string, newStatus: 'approved' | 'rejected') => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/admin/films/${filmId}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setFilms(films.map(film =>
          film.id === filmId ? { ...film, status: newStatus } : film
        ));
      }
    } catch (error) {
      console.error('Error updating film status:', error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'approved':
        return 'default';
      case 'rejected':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const categories = ['Feature', 'Short', 'Documentary', 'Animation', 'Student'];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Film Management</h1>
        <p className="text-muted-foreground">
          Review and manage film submissions
        </p>
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
                placeholder="Search films..."
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
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {filteredFilms.length} films found
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Films Tabs */}
      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">
            Pending ({films.filter(f => f.status === 'pending').length})
          </TabsTrigger>
          <TabsTrigger value="approved">
            Approved ({films.filter(f => f.status === 'approved').length})
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected ({films.filter(f => f.status === 'rejected').length})
          </TabsTrigger>
          <TabsTrigger value="all">All Films</TabsTrigger>
        </TabsList>

        {['pending', 'approved', 'rejected', 'all'].map(tab => (
          <TabsContent key={tab} value={tab} className="space-y-4">
            <div className="grid gap-4">
              {filteredFilms
                .filter(film => tab === 'all' || film.status === tab)
                .map(film => (
                  <Card key={film.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            {getStatusIcon(film.status)}
                            <h3 className="text-lg font-semibold">{film.title}</h3>
                            <Badge variant={getStatusBadgeVariant(film.status)}>
                              {film.status}
                            </Badge>
                            <Badge variant="outline">{film.category}</Badge>
                          </div>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <p>Director: {film.director}</p>
                            <p>Duration: {film.duration} minutes</p>
                            <p>Submitted: {new Date(film.submissionDate).toLocaleDateString()}</p>
                            <p>Contact: {film.filmmakerEmail}</p>
                          </div>
                          <p className="text-sm mt-2">{film.synopsis}</p>
                        </div>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedFilm(film)}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>{film.title}</DialogTitle>
                                <DialogDescription>
                                  Film submission details
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Director</Label>
                                    <p className="text-sm">{film.director}</p>
                                  </div>
                                  <div>
                                    <Label>Category</Label>
                                    <p className="text-sm">{film.category}</p>
                                  </div>
                                  <div>
                                    <Label>Duration</Label>
                                    <p className="text-sm">{film.duration} minutes</p>
                                  </div>
                                  <div>
                                    <Label>Status</Label>
                                    <Badge variant={getStatusBadgeVariant(film.status)}>
                                      {film.status}
                                    </Badge>
                                  </div>
                                </div>
                                <div>
                                  <Label>Synopsis</Label>
                                  <p className="text-sm mt-1">{film.synopsis}</p>
                                </div>
                                <div>
                                  <Label>Filmmaker Contact</Label>
                                  <p className="text-sm mt-1">{film.filmmakerEmail}</p>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          {film.status === 'pending' && (
                            <>
                              <Button
                                size="sm"
                                variant="default"
                                onClick={() => updateFilmStatus(film.id, 'approved')}
                              >
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => updateFilmStatus(film.id, 'rejected')}
                              >
                                Reject
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

              {filteredFilms.filter(film => tab === 'all' || film.status === tab).length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <p className="text-muted-foreground">No films found</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}