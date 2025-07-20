'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type SiteMode = 'guest' | 'filmmaker' | 'sponsor'

interface SiteContextType {
  mode: SiteMode
  setMode: (mode: SiteMode) => void
  isLoggedIn: boolean
  setIsLoggedIn: (value: boolean) => void
  userProfile: any
  setUserProfile: (profile: any) => void
}

const SiteContext = createContext<SiteContextType | undefined>(undefined)

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<SiteMode>('guest')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userProfile, setUserProfile] = useState(null)

  // Load mode from localStorage on mount
  useEffect(() => {
    const savedMode = localStorage.getItem('siteMode') as SiteMode
    if (savedMode && ['guest', 'filmmaker', 'sponsor'].includes(savedMode)) {
      setMode(savedMode)
    }
  }, [])

  // Save mode to localStorage when it changes
  const handleSetMode = (newMode: SiteMode) => {
    setMode(newMode)
    localStorage.setItem('siteMode', newMode)
  }

  return (
    <SiteContext.Provider value={{
      mode,
      setMode: handleSetMode,
      isLoggedIn,
      setIsLoggedIn,
      userProfile,
      setUserProfile
    }}>
      {children}
    </SiteContext.Provider>
  )
}

export function useSite() {
  const context = useContext(SiteContext)
  if (context === undefined) {
    throw new Error('useSite must be used within a SiteProvider')
  }
  return context
}