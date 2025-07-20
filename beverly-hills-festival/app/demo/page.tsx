'use client'

import { Layout } from '@/components/Layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { 
  Film, 
  Users, 
  Sparkles, 
  Key, 
  ArrowRight, 
  CheckCircle,
  Info,
  Code,
  Zap,
  Shield,
  Globe
} from 'lucide-react'
import Link from 'next/link'
import { useSiteMode } from '@/lib/context/site-mode'

export default function DemoPage() {
  const { mode, setMode } = useSiteMode()

  const credentials = {
    admin: {
      email: 'admin@beverlyhillsfilmfestival.com',
      password: 'admin123',
      role: 'Festival Administrator',
      access: ['Full dashboard access', 'Film management', 'User management', 'Analytics', 'Settings']
    },
    filmmaker: {
      email: 'filmmaker@example.com',
      password: 'film123',
      role: 'Filmmaker',
      access: ['Film submission', 'Screening schedule', 'Analytics', 'Networking', 'Messages']
    },
    sponsor: {
      email: 'sponsor@paramount.com',
      password: 'sponsor123',
      role: 'Sponsor',
      access: ['Sponsorship dashboard', 'Brand metrics', 'Event management', 'Benefits tracking']
    }
  }

  const features = [
    {
      icon: <Zap className="h-5 w-5" />,
      title: 'Dual-Mode Architecture',
      description: 'Seamlessly switch between public and admin views with a single click'
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: 'Role-Based Access',
      description: 'Three distinct portals with tailored features for each user type'
    },
    {
      icon: <Globe className="h-5 w-5" />,
      title: 'Responsive Design',
      description: 'Beautiful experience across all devices and screen sizes'
    },
    {
      icon: <Code className="h-5 w-5" />,
      title: 'Modern Tech Stack',
      description: 'Built with Next.js 14, TypeScript, and Tailwind CSS'
    }
  ]

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Beverly Hills Film Festival Demo</h1>
            <p className="text-xl opacity-90 max-w-3xl">
              Experience our innovative multi-portal platform designed to serve filmmakers, 
              sponsors, and festival-goers with tailored experiences.
            </p>
          </div>
        </div>

        {/* Quick Mode Switcher */}
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Quick Mode Switch
              </CardTitle>
              <CardDescription>
                Currently viewing: <Badge variant="secondary">{mode === 'admin' ? 'Admin Portal' : 'Public Site'}</Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant={mode === 'public' ? 'default' : 'outline'}
                  onClick={() => setMode('public')}
                >
                  <Film className="mr-2 h-4 w-4" />
                  Public Festival Site
                </Button>
                <Button 
                  variant={mode === 'admin' ? 'default' : 'outline'}
                  onClick={() => setMode('admin')}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Admin Portal
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Test Credentials */}
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6">Test Credentials</h2>
          <Tabs defaultValue="admin" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="admin">Admin Portal</TabsTrigger>
              <TabsTrigger value="filmmaker">Filmmaker Portal</TabsTrigger>
              <TabsTrigger value="sponsor">Sponsor Portal</TabsTrigger>
            </TabsList>

            <TabsContent value="admin">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5" />
                    Festival Administrator Access
                  </CardTitle>
                  <CardDescription>{credentials.admin.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertTitle>Login Credentials</AlertTitle>
                      <AlertDescription>
                        <div className="mt-2 font-mono text-sm">
                          <p>Email: {credentials.admin.email}</p>
                          <p>Password: {credentials.admin.password}</p>
                        </div>
                      </AlertDescription>
                    </Alert>
                    <div>
                      <h4 className="font-semibold mb-2">Access Includes:</h4>
                      <ul className="space-y-1">
                        {credentials.admin.access.map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button asChild className="w-full">
                      <Link href="/admin">
                        Go to Admin Portal
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="filmmaker">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5" />
                    Filmmaker Portal Access
                  </CardTitle>
                  <CardDescription>{credentials.filmmaker.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertTitle>Login Credentials</AlertTitle>
                      <AlertDescription>
                        <div className="mt-2 font-mono text-sm">
                          <p>Email: {credentials.filmmaker.email}</p>
                          <p>Password: {credentials.filmmaker.password}</p>
                        </div>
                      </AlertDescription>
                    </Alert>
                    <div>
                      <h4 className="font-semibold mb-2">Access Includes:</h4>
                      <ul className="space-y-1">
                        {credentials.filmmaker.access.map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button asChild className="w-full">
                      <Link href="/filmmaker">
                        Go to Filmmaker Portal
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sponsor">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5" />
                    Sponsor Portal Access
                  </CardTitle>
                  <CardDescription>{credentials.sponsor.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertTitle>Login Credentials</AlertTitle>
                      <AlertDescription>
                        <div className="mt-2 font-mono text-sm">
                          <p>Email: {credentials.sponsor.email}</p>
                          <p>Password: {credentials.sponsor.password}</p>
                        </div>
                      </AlertDescription>
                    </Alert>
                    <div>
                      <h4 className="font-semibold mb-2">Access Includes:</h4>
                      <ul className="space-y-1">
                        {credentials.sponsor.access.map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button asChild className="w-full">
                      <Link href="/sponsor">
                        Go to Sponsor Portal
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Key Features */}
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {feature.icon}
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Testing Instructions */}
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardHeader>
              <CardTitle>Testing Instructions</CardTitle>
              <CardDescription>Follow these steps to explore the full platform</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                    1
                  </span>
                  <div>
                    <h4 className="font-semibold">Explore Public Site</h4>
                    <p className="text-sm text-muted-foreground">
                      Start by browsing the public festival site. Check out films, schedules, and ticket options.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                    2
                  </span>
                  <div>
                    <h4 className="font-semibold">Switch to Admin Mode</h4>
                    <p className="text-sm text-muted-foreground">
                      Use the mode switcher to access the admin portal and explore management features.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                    3
                  </span>
                  <div>
                    <h4 className="font-semibold">Test Each Portal</h4>
                    <p className="text-sm text-muted-foreground">
                      Use the provided credentials to log into each specialized portal and explore their unique features.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                    4
                  </span>
                  <div>
                    <h4 className="font-semibold">Check Responsive Design</h4>
                    <p className="text-sm text-muted-foreground">
                      Resize your browser or use mobile device emulation to see the responsive layout in action.
                    </p>
                  </div>
                </li>
              </ol>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="container mx-auto px-4 py-12">
          <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
            <CardContent className="text-center py-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="mb-6 opacity-90">
                This is just a glimpse of what the Beverly Hills Film Festival platform can do.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/">Back to Home</Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}