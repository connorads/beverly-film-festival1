'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/context/auth';
import { ModeSwitcher } from '@/components/mode-switcher';
import Link from 'next/link';
import { 
  Film, 
  Ticket, 
  Calendar, 
  MapPin, 
  Trophy, 
  Image, 
  Users, 
  Home,
  LogOut,
  BarChart
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  
  // Check if we're on the login page
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    // Don't redirect if we're already on the login page
    if (!isLoginPage && !isLoading && (!isAuthenticated || user?.role !== 'admin')) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, isLoading, user, router, isLoginPage]);

  // If we're on the login page, just render children without the admin layout
  if (isLoginPage) {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== 'admin') {
    return null;
  }

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: Home },
    { name: 'Films', href: '/admin/films', icon: Film },
    { name: 'Tickets', href: '/admin/tickets', icon: Ticket },
    { name: 'Film Blocks', href: '/admin/blocks', icon: Calendar },
    { name: 'Venues', href: '/admin/venues', icon: MapPin },
    { name: 'Winners', href: '/admin/winners', icon: Trophy },
    { name: 'Gallery', href: '/admin/gallery', icon: Image },
    { name: 'Sponsors', href: '/admin/sponsors', icon: Users },
    { name: 'Reports', href: '/admin/reports', icon: BarChart },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <div className="fixed inset-y-0 left-0 z-50 w-64 bg-card shadow-lg">
          <div className="flex h-full flex-col">
            {/* Logo */}
            <div className="flex h-16 items-center px-6 border-b">
              <h2 className="text-xl font-bold">Admin Portal</h2>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 px-3 py-4">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* User section */}
            <div className="border-t p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
                <button
                  onClick={logout}
                  className="p-2 rounded-lg hover:bg-accent transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
              <ModeSwitcher />
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="pl-64 flex-1">
          <main className="p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}