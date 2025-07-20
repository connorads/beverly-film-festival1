'use client';

import { useAdminStats, useAdminFilms } from '@/lib/hooks/useAdmin';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Film, 
  Users, 
  Ticket, 
  DollarSign, 
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { stats, isLoading: statsLoading, refetch: refetchStats } = useAdminStats();
  const { films, isLoading: filmsLoading, updateFilmStatus } = useAdminFilms({ status: 'pending' });

  const handleFilmAction = async (filmId: string, status: 'approved' | 'rejected') => {
    try {
      await updateFilmStatus(filmId, status);
      // Optionally show a success toast
    } catch (error) {
      // Handle error - show error toast
      console.error('Failed to update film status:', error);
    }
  };

  return (
    <ProtectedRoute requiredRoles={['admin', 'festival_staff']}>
      <div className="container py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Festival management overview
            </p>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              refetchStats();
            }}
            disabled={statsLoading}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statsLoading ? (
            <>
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-[125px]" />
              ))}
            </>
          ) : stats ? (
            <>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Films</CardTitle>
                  <Film className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalFilms}</div>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Badge variant="secondary" className="text-xs">
                      {stats.pendingFilms} pending
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalUsers}</div>
                  <p className="text-xs text-muted-foreground">
                    Active festival participants
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tickets Sold</CardTitle>
                  <Ticket className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalTicketsSold}</div>
                  <p className="text-xs text-muted-foreground">
                    Across all screenings
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${stats.totalRevenue.toLocaleString()}
                  </div>
                  <div className="flex items-center text-xs text-green-600">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    +12% from last year
                  </div>
                </CardContent>
              </Card>
            </>
          ) : null}
        </div>

        {/* Pending Films Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Pending Film Submissions</h2>
          
          {filmsLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-24" />
              ))}
            </div>
          ) : films.length === 0 ? (
            <Card>
              <CardContent className="flex items-center justify-center py-8">
                <p className="text-muted-foreground">No pending films to review</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {films.map((film) => (
                <Card key={film.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle>{film.title}</CardTitle>
                        <CardDescription>
                          Directed by {film.directorId} • {film.runtime} min • {film.genres?.join(', ')}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary">
                        <Clock className="mr-1 h-3 w-3" />
                        Pending
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {film.synopsis}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => handleFilmAction(film.id, 'approved')}
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleFilmAction(film.id, 'rejected')}
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Reject
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.location.href = `/admin/films/${film.id}`}
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}