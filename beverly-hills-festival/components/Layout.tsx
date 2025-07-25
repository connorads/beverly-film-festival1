'use client'

import { Navigation } from './Navigation'
import { cn } from '@/lib/utils'

interface LayoutProps {
  children: React.ReactNode
  className?: string
}

export function Layout({ children, className }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className={cn('container mx-auto px-4 py-8', className)}>
        {children}
      </main>
    </div>
  )
}