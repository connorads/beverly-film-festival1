'use client'

import Image from 'next/image'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, MapPin, Ticket, QrCode, Download } from 'lucide-react'
import { useTicketQRCode } from '@/lib/hooks/useTickets'

interface TicketDisplayProps {
  id: string
  filmTitle: string
  screeningDate: string
  screeningTime: string
  venue: string
  seatNumber?: string
  ticketType: 'standard' | 'vip' | 'premium'
  price: number
  status: 'available' | 'reserved' | 'purchased'
  onPurchase?: () => void
  onDownload?: () => void
}

export function TicketDisplay({
  id,
  filmTitle,
  screeningDate,
  screeningTime,
  venue,
  seatNumber,
  ticketType,
  price,
  status,
  onPurchase,
  onDownload
}: TicketDisplayProps) {
  const qrCodeUrl = useTicketQRCode(status === 'purchased' ? id : '');
  const getTicketTypeColor = () => {
    switch (ticketType) {
      case 'vip':
        return 'bg-amber-500'
      case 'premium':
        return 'bg-purple-600'
      default:
        return 'bg-primary'
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case 'purchased':
        return 'default'
      case 'reserved':
        return 'secondary'
      default:
        return 'outline'
    }
  }

  return (
    <Card className="overflow-hidden">
      <div className={`h-2 ${getTicketTypeColor()}`} />
      
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{filmTitle}</CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <Ticket className="h-4 w-4" />
              Ticket #{id}
            </CardDescription>
          </div>
          <Badge variant={getStatusColor()}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{screeningDate}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{screeningTime}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{venue}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="text-sm">
              <span className="text-muted-foreground">Type:</span>
              <Badge variant="secondary" className="ml-2">
                {ticketType.toUpperCase()}
              </Badge>
            </div>
            {seatNumber && (
              <div className="text-sm">
                <span className="text-muted-foreground">Seat:</span>
                <span className="ml-2 font-medium">{seatNumber}</span>
              </div>
            )}
            <div className="text-sm">
              <span className="text-muted-foreground">Price:</span>
              <span className="ml-2 font-medium">${price}</span>
            </div>
          </div>
        </div>

        {qrCodeUrl && status === 'purchased' && (
          <div className="flex justify-center p-4 bg-muted rounded-lg">
            <div className="text-center space-y-2">
              <div className="relative w-32 h-32 mx-auto">
                <Image
                  src={qrCodeUrl}
                  alt="Ticket QR Code"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-xs text-muted-foreground">Scan at venue</p>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter>
        {status === 'available' && (
          <Button className="w-full" onClick={onPurchase}>Purchase Ticket</Button>
        )}
        {status === 'reserved' && (
          <Button className="w-full" variant="secondary" onClick={onPurchase}>Complete Purchase</Button>
        )}
        {status === 'purchased' && (
          <Button className="w-full" variant="outline" onClick={onDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}