import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, MapPin, Users } from 'lucide-react'

interface ScheduleEvent {
  id: string
  title: string
  type: 'screening' | 'panel' | 'workshop' | 'networking' | 'ceremony'
  date: string
  startTime: string
  endTime: string
  venue: string
  description?: string
  speakers?: string[]
  capacity?: number
  attendees?: number
}

interface ScheduleCardProps {
  event: ScheduleEvent
  onRegister?: (eventId: string) => void
}

export function ScheduleCard({ event, onRegister }: ScheduleCardProps) {
  const getEventTypeColor = () => {
    switch (event.type) {
      case 'screening':
        return 'bg-blue-500'
      case 'panel':
        return 'bg-green-500'
      case 'workshop':
        return 'bg-purple-500'
      case 'networking':
        return 'bg-orange-500'
      case 'ceremony':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  const isFull = !!(event.capacity && event.attendees && event.attendees >= event.capacity)

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className={`h-1 ${getEventTypeColor()}`} />
      
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{event.title}</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
              </Badge>
              {isFull && <Badge variant="destructive">Sold Out</Badge>}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {event.description && (
          <CardDescription>{event.description}</CardDescription>
        )}

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{event.startTime} - {event.endTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{event.venue}</span>
          </div>
          {event.capacity && (
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>
                {event.attendees || 0} / {event.capacity} attendees
              </span>
            </div>
          )}
        </div>

        {event.speakers && event.speakers.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-1">Speakers:</p>
            <div className="flex flex-wrap gap-1">
              {event.speakers.map((speaker, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {speaker}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {onRegister && (
          <Button
            className="w-full mt-4"
            onClick={() => onRegister(event.id)}
            disabled={isFull}
          >
            {isFull ? 'Event Full' : 'Register'}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}