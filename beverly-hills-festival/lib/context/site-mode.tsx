'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export type SiteMode = 'public' | 'admin';

interface SiteModeContextType {
  mode: SiteMode;
  setMode: (mode: SiteMode) => void;
  isAdminMode: boolean;
  // Legacy support
  siteMode: SiteMode;
  setSiteMode: (mode: SiteMode) => void;
  isAdmin: boolean;
  isFilmmaker: boolean;
  isFestival: boolean;
}

const SiteModeContext = createContext<SiteModeContextType | undefined>(undefined);

interface SiteModeProviderProps {
  children: ReactNode;
  initialMode?: SiteMode;
  defaultMode?: SiteMode;
}

export function SiteModeProvider({ children, initialMode, defaultMode = 'public' }: SiteModeProviderProps) {
  const pathname = usePathname();
  const router = useRouter();
  
  // Initialize from localStorage or props
  const [mode, setModeState] = useState<SiteMode>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('siteMode');
      if (stored === 'admin' || stored === 'public') {
        return stored;
      }
    }
    return initialMode || defaultMode;
  });

  // Save to localStorage when mode changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('siteMode', mode);
    }
  }, [mode]);

  const setMode = (newMode: SiteMode) => {
    setModeState(newMode);
  };

  const value = {
    mode,
    setMode,
    isAdminMode: mode === 'admin',
    // Legacy support
    siteMode: mode,
    setSiteMode: setMode,
    isAdmin: mode === 'admin',
    isFilmmaker: false,
    isFestival: mode === 'public'
  };

  return (
    <SiteModeContext.Provider value={value}>
      {children}
    </SiteModeContext.Provider>
  );
}

export function useSiteMode() {
  const context = useContext(SiteModeContext);
  if (context === undefined) {
    throw new Error('useSiteMode must be used within a SiteModeProvider');
  }
  return context;
}

// HOC for protecting routes based on site mode
export function withSiteMode(Component: React.ComponentType<any>, allowedModes: SiteMode[]) {
  return function ProtectedComponent(props: any) {
    const { siteMode } = useSiteMode();
    const router = useRouter();

    useEffect(() => {
      if (!allowedModes.includes(siteMode)) {
        router.push('/');
      }
    }, [siteMode, router]);

    if (!allowedModes.includes(siteMode)) {
      return null;
    }

    return <Component {...props} />;
  };
}