'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

interface ThemeContextType {
  theme: 'light' | 'dark' | 'cyber'
  toggleTheme: () => void
  setTheme: (theme: 'light' | 'dark' | 'cyber') => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<'light' | 'dark' | 'cyber'>('cyber')

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('ecomify-theme') as 'light' | 'dark' | 'cyber'
    if (savedTheme) {
      setThemeState(savedTheme)
    }
  }, [])

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('ecomify-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setThemeState(prev => {
      switch (prev) {
        case 'light':
          return 'dark'
        case 'dark':
          return 'cyber'
        case 'cyber':
          return 'light'
        default:
          return 'cyber'
      }
    })
  }

  const setTheme = (newTheme: 'light' | 'dark' | 'cyber') => {
    setThemeState(newTheme)
  }

  const value = {
    theme,
    toggleTheme,
    setTheme,
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

