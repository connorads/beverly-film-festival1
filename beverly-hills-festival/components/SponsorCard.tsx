import Image from 'next/image'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Award } from 'lucide-react'

interface SponsorCardProps {
  id: string
  name: string
  tier: 'platinum' | 'gold' | 'silver' | 'bronze'
  logoUrl?: string
  description?: string
  website?: string
  benefits?: string[]
}

export function SponsorCard({
  id,
  name,
  tier,
  logoUrl,
  description,
  website,
  benefits
}: SponsorCardProps) {
  const getTierColor = () => {
    switch (tier) {
      case 'platinum':
        return 'bg-gradient-to-r from-slate-400 to-slate-600'
      case 'gold':
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600'
      case 'silver':
        return 'bg-gradient-to-r from-gray-300 to-gray-500'
      case 'bronze':
        return 'bg-gradient-to-r from-orange-400 to-orange-600'
      default:
        return 'bg-primary'
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className={`h-2 ${getTierColor()}`} />
      
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 relative h-24 w-full max-w-[200px]">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={`${name} logo`}
              fill
              className="object-contain"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-muted rounded">
              <Award className="h-12 w-12 text-muted-foreground" />
            </div>
          )}
        </div>
        <CardTitle className="text-xl">{name}</CardTitle>
        <Badge className={`${getTierColor()} text-white`}>
          {tier.charAt(0).toUpperCase() + tier.slice(1)} Sponsor
        </Badge>
      </CardHeader>

      {(description || benefits) && (
        <CardContent className="space-y-3">
          {description && (
            <CardDescription>{description}</CardDescription>
          )}
          
          {benefits && benefits.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2">Sponsorship Benefits:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                {benefits.slice(0, 3).map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span className="line-clamp-1">{benefit}</span>
                  </li>
                ))}
                {benefits.length > 3 && (
                  <li className="text-xs text-muted-foreground/70">
                    +{benefits.length - 3} more benefits
                  </li>
                )}
              </ul>
            </div>
          )}
        </CardContent>
      )}

      {website && (
        <CardFooter>
          <Button variant="outline" className="w-full" asChild>
            <a href={website} target="_blank" rel="noopener noreferrer">
              Visit Website
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}