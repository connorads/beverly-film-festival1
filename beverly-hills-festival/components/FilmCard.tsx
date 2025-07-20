import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, MapPin, Star } from 'lucide-react'

interface FilmCardProps {
  id: string
  title: string
  director: string
  genre: string[]
  duration: number
  rating?: number
  posterUrl?: string
  synopsis?: string
  screeningTime?: string
  venue?: string
  isFeature?: boolean
}

export function FilmCard({
  id,
  title,
  director,
  genre,
  duration,
  rating,
  posterUrl,
  synopsis,
  screeningTime,
  venue,
  isFeature = false
}: FilmCardProps) {
  return (
    <Card className={`overflow-hidden transition-all hover:shadow-lg ${isFeature ? 'col-span-2 row-span-2' : ''}`}>
      <div className="relative aspect-[2/3] overflow-hidden">
        {posterUrl ? (
          <Image
            src={posterUrl}
            alt={`${title} poster`}
            fill
            className="object-cover"
            sizes={isFeature ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 33vw'}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-muted">
            <span className="text-muted-foreground">No poster available</span>
          </div>
        )}
        {rating && (
          <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-background/80 px-2 py-1 backdrop-blur">
            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
        )}
      </div>
      
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="line-clamp-1">{title}</CardTitle>
            <CardDescription>Directed by {director}</CardDescription>
          </div>
        </div>
        <div className="flex gap-1 flex-wrap mt-2">
          {genre.map((g) => (
            <Badge key={g} variant="secondary" className="text-xs">
              {g}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardContent className="space-y-2">
        {synopsis && (
          <p className="text-sm text-muted-foreground line-clamp-2">{synopsis}</p>
        )}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{duration} min</span>
          </div>
          {screeningTime && (
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{screeningTime}</span>
            </div>
          )}
          {venue && (
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{venue}</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/films/${id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}