'use client'

import { useState, useEffect } from 'react'
import {useTheme as _useTheme } from "next-themes"

export const useTheme = () => {
  const context = _useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return {...context, mounted}
}
