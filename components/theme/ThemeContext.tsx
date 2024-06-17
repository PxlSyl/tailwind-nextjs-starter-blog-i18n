'use client'

import React, { createContext, useState, useContext, useEffect } from 'react'

interface ThemeContextProps {
  theme: string
  setTheme: (theme: string) => void
  mounted: boolean
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<string>('system')
  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'system'
    setTheme(savedTheme)
    setMounted(true)
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', theme)
    if (
      theme === 'dark' ||
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, mounted }}>{children}</ThemeContext.Provider>
  )
}

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
