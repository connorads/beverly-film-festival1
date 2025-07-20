'use client'

import { Layout } from '@/components/Layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Film, Users, Sparkles, Shield } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function PortalSelectionPage() {
  const router = useRouter()

  const portals = [
    {
      title: 'Ticket Buyer Portal',
      description: 'Purchase tickets, view schedules, and manage your festival experience',
      icon: Film,
      href: '/login',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900',
    },
    {
      title: 'Filmmaker Portal',
      description: 'Submit films, manage screenings, and connect with industry professionals',
      icon: Users,
      href: '/filmmaker/login',
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900',
    },
    {
      title: 'Sponsor Portal',
      description: 'Manage sponsorships, view analytics, and maximize your festival impact',
      icon: Sparkles,
      href: '/sponsor/login',
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900',
    },
    {
      title: 'Admin Portal',
      description: 'Festival administration, content management, and analytics',
      icon: Shield,
      href: '/admin/login',
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-100 dark:bg-red-900',
    },
  ]

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Portal</h1>
          <p className="text-xl text-muted-foreground">
            Select the appropriate portal to access your account
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portals.map((portal) => {
            const Icon = portal.icon
            return (
              <Card 
                key={portal.href} 
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => router.push(portal.href)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={`h-12 w-12 ${portal.bgColor} rounded-lg flex items-center justify-center`}>
                      <Icon className={`h-6 w-6 ${portal.color}`} />
                    </div>
                  </div>
                  <CardTitle className="mt-4">{portal.title}</CardTitle>
                  <CardDescription>{portal.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    Access {portal.title}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Need help choosing? Contact support at{' '}
            <a href="mailto:support@beverlyhillsfilmfestival.com" className="text-primary hover:underline">
              support@beverlyhillsfilmfestival.com
            </a>
          </p>
        </div>
      </div>
    </Layout>
  )
}