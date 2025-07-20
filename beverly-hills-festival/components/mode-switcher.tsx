'use client'

import React from 'react'
import { Globe, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSiteMode } from '@/lib/context/site-mode'

interface ModeSwitcherProps {
  showBadge?: boolean
}

export function ModeSwitcher({ showBadge = false }: ModeSwitcherProps) {
  const { mode, setMode, isAdminMode } = useSiteMode()

  const handleToggle = () => {
    setMode(isAdminMode ? 'public' : 'admin')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleToggle()
    }
  }

  return (
    <div className="mode-switcher">
      <button
        role="button"
        aria-label={isAdminMode ? 'Admin Panel' : 'Public Site'}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className={cn(
          'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
          'hover:bg-gray-100 dark:hover:bg-gray-800',
          'focus:outline-none focus:ring-2 focus:ring-blue-500'
        )}
      >
        {isAdminMode ? (
          <Settings size={20} data-testid="settings-icon" />
        ) : (
          <Globe size={20} data-testid="globe-icon" />
        )}
        <span>{isAdminMode ? 'Admin Panel' : 'Public Site'}</span>
      </button>

      {showBadge && (
        <div
          className={cn(
            'badge mt-2 px-2 py-1 text-xs font-semibold rounded',
            isAdminMode ? 'badge-admin bg-red-100 text-red-800' : 'badge-public bg-blue-100 text-blue-800'
          )}
        >
          {isAdminMode ? 'ADMIN MODE' : 'PUBLIC MODE'}
        </div>
      )}
    </div>
  )
}