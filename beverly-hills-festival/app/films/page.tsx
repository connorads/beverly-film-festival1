'use client';

import { useState } from 'react';
import { useFilms } from '@/lib/hooks/useFilms';
import { FilmCard } from '@/components/FilmCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Filter } from 'lucide-react';
import type { FilmStatus } from '@/lib/types';

export default function FilmsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  
  const { films, isLoading, error, refetch } = useFilms({
    params: {
      query: searchQuery || undefined,
      genre: selectedGenre !== 'all' ? selectedGenre : undefined,
      status: selectedStatus !== 'all' ? selectedStatus as FilmStatus : undefined,
      page: 1,
      limit: 20,
    },
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    refetch();
  };

  return (
    <div className="container py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Films</h1>
          <p className="text-muted-foreground mt-2">
            Discover amazing films at the Beverly Hills Film Festival
          </p>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search films..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit">Search</Button>
          </form>

          <div className="flex gap-2 flex-wrap">
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genres</SelectItem>
                <SelectItem value="drama">Drama</SelectItem>
                <SelectItem value="comedy">Comedy</SelectItem>
                <SelectItem value="action">Action</SelectItem>
                <SelectItem value="documentary">Documentary</SelectItem>
                <SelectItem value="animation">Animation</SelectItem>
                <SelectItem value="thriller">Thriller</SelectItem>
                <SelectItem value="horror">Horror</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="now_showing">Now Showing</SelectItem>
                <SelectItem value="coming_soon">Coming Soon</SelectItem>
                <SelectItem value="featured">Featured</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={() => refetch()}>
              Refresh
            </Button>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Films Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-[2/3] w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : films.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No films found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {films.map((film) => (
              <FilmCard
                key={film.id}
                id={film.id}
                title={film.title}
                director={film.directorId}
                genre={film.genres || []}
                duration={film.runtime}
                rating={0}
                posterUrl={''}
                synopsis={film.synopsis}
                isFeature={film.status === 'scheduled'}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}