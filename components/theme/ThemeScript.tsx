'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function ThemeScript(): null {
  const pathname = usePathname()

  useEffect(() => {
    // Re-apply theme on route change (including language changes)
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark')
    } else if (savedTheme === 'system' || !savedTheme) {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      document.documentElement.classList.toggle('dark', isDark)
    }
  }, [pathname])

  return null
}
