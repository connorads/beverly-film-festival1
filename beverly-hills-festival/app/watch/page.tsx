'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Play, Clock, Award, Film, Info, ExternalLink } from 'lucide-react'

// Mock data for films - in production, this would come from an API
const films = {
  winners: [
    {
      id: 1,
      title: 'The Last Chapter',
      director: 'Maria Rodriguez',
      duration: '102 min',
      category: 'Grand Jury Prize',
      synopsis: 'A moving story about family, loss, and redemption set in rural Spain.',
      trailerUrl: '#',
      stillImage: '/api/placeholder/800/450'
    },
    {
      id: 2,
      title: 'Echoes of Tomorrow',
      director: 'James Chen',
      duration: '95 min',
      category: 'Best Feature',
      synopsis: 'A science fiction drama exploring the consequences of time travel.',
      trailerUrl: '#',
      stillImage: '/api/placeholder/800/450'
    },
    {
      id: 3,
      title: 'Voices Unheard',
      director: 'Sarah Williams',
      duration: '88 min',
      category: 'Best Documentary',
      synopsis: 'An eye-opening look at indigenous communities fighting for their land.',
      trailerUrl: '#',
      stillImage: '/api/placeholder/800/450'
    }
  ],
  features: [
    {
      id: 4,
      title: 'Night Falls on Tokyo',
      director: 'Akira Tanaka',
      duration: '110 min',
      genre: 'Drama',
      synopsis: 'A neon-noir thriller set in the underground world of Tokyo.',
      trailerUrl: '#',
      stillImage: '/api/placeholder/800/450'
    },
    {
      id: 5,
      title: 'Arctic Dreams',
      director: 'Elena Volkov',
      duration: '98 min',
      genre: 'Adventure',
      synopsis: 'A visually stunning journey through the melting Arctic landscape.',
      trailerUrl: '#',
      stillImage: '/api/placeholder/800/450'
    },
    {
      id: 6,
      title: 'Finding Home',
      director: 'Lisa Anderson',
      duration: '92 min',
      genre: 'Drama',
      synopsis: 'A heartwarming story of refugees building new lives in America.',
      trailerUrl: '#',
      stillImage: '/api/placeholder/800/450'
    }
  ],
  shorts: [
    {
      id: 7,
      title: 'The Red Bicycle',
      director: 'Pierre Dubois',
      duration: '18 min',
      category: 'Best Short',
      synopsis: 'A whimsical tale of a bicycle that changes lives across Paris.',
      trailerUrl: '#',
      stillImage: '/api/placeholder/800/450'
    },
    {
      id: 8,
      title: 'First Light',
      director: 'Alex Martinez',
      duration: '22 min',
      category: 'Best Student Film',
      synopsis: 'A coming-of-age story set against the California sunrise.',
      trailerUrl: '#',
      stillImage: '/api/placeholder/800/450'
    },
    {
      id: 9,
      title: 'Midnight in Marseille',
      director: 'Sophie Blanc',
      duration: '25 min',
      category: 'Emerging Filmmaker',
      synopsis: 'A mysterious encounter changes two strangers forever.',
      trailerUrl: '#',
      stillImage: '/api/placeholder/800/450'
    }
  ]
}

export default function WatchPage() {
  const [selectedFilm, setSelectedFilm] = useState<any>(null)

  const FilmCard = ({ film }: { film: any }) => (
    <Card className="group cursor-pointer overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative aspect-video overflow-hidden bg-muted">
        <img
          src={film.stillImage}
          alt={film.title}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="mb-1 text-lg font-bold text-white">{film.title}</h3>
            <p className="text-sm text-white/80">Directed by {film.director}</p>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="lg"
            className="gap-2"
            onClick={() => setSelectedFilm(film)}
          >
            <Play className="h-5 w-5" />
            Watch Trailer
          </Button>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{film.duration}</span>
          </div>
          {film.category && (
            <Badge variant="secondary">
              <Award className="mr-1 h-3 w-3" />
              {film.category}
            </Badge>
          )}
          {film.genre && (
            <Badge variant="outline">{film.genre}</Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{film.synopsis}</p>
      </CardContent>
    </Card>
  )

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-primary/10 p-4">
              <Film className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight">
            Watch Festival Films
          </h1>
          <p className="text-xl text-muted-foreground">
            Trailers and clips from Beverly Hills Film Festival 2024
          </p>
        </div>

        {/* Film Categories */}
        <Tabs defaultValue="winners" className="mb-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="winners">Award Winners</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="shorts">Shorts</TabsTrigger>
          </TabsList>

          <TabsContent value="winners" className="mt-8">
            <div className="mb-6">
              <h2 className="mb-2 text-2xl font-bold">Award-Winning Films</h2>
              <p className="text-muted-foreground">
                Watch trailers from our 2024 festival winners
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {films.winners.map((film) => (
                <FilmCard key={film.id} film={film} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="features" className="mt-8">
            <div className="mb-6">
              <h2 className="mb-2 text-2xl font-bold">Feature Films</h2>
              <p className="text-muted-foreground">
                Full-length films from around the world
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {films.features.map((film) => (
                <FilmCard key={film.id} film={film} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="shorts" className="mt-8">
            <div className="mb-6">
              <h2 className="mb-2 text-2xl font-bold">Short Films</h2>
              <p className="text-muted-foreground">
                Powerful stories in under 30 minutes
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {films.shorts.map((film) => (
                <FilmCard key={film.id} film={film} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Video Player Modal */}
        {selectedFilm && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedFilm(null)}
          >
            <div 
              className="w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="overflow-hidden">
                <div className="relative aspect-video bg-black">
                  {/* In production, this would be an actual video player */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-white">Video player would go here</p>
                  </div>
                  <Button
                    className="absolute right-4 top-4"
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedFilm(null)}
                  >
                    ×
                  </Button>
                </div>
                <CardContent className="p-6">
                  <h3 className="mb-2 text-2xl font-bold">{selectedFilm.title}</h3>
                  <p className="mb-4 text-muted-foreground">
                    Directed by {selectedFilm.director} • {selectedFilm.duration}
                  </p>
                  <p className="mb-4">{selectedFilm.synopsis}</p>
                  <Button asChild>
                    <a href="#" className="gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Learn More About This Film
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Additional Content */}
        <Card className="mt-12 bg-muted/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              About Festival Films
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              These trailers represent just a selection of the incredible films showcased at the Beverly Hills Film Festival 2024. 
              Many of our featured films have gone on to secure distribution deals and are now available on various streaming platforms and in theaters.
            </p>
            <p className="text-muted-foreground">
              For information about screening rights, distribution, or to connect with filmmakers, please contact us at{' '}
              <a href="mailto:films@bhfilmfest.com" className="text-primary underline">
                films@bhfilmfest.com
              </a>
            </p>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="mt-12 rounded-lg bg-primary/10 p-8 text-center">
          <h3 className="mb-2 text-2xl font-bold">Want to See Your Film Here?</h3>
          <p className="mb-6 text-muted-foreground">
            Submit your film for Beverly Hills Film Festival 2025
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild>
              <a href="/submit">Submit Your Film</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/winners">View All Winners</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}