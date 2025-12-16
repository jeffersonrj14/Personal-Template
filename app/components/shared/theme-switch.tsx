'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ThemeProviderProps } from 'next-themes'
import { FaSun, FaMoon } from 'react-icons/fa6'
import { motion, AnimatePresence } from 'framer-motion'

const storageKey = 'theme-preference'

// ----------- ThemeProvider -----------
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration mismatch
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>
  }

  return (
    <NextThemesProvider attribute='class' defaultTheme='system' enableSystem {...props}>
      {children}
    </NextThemesProvider>
  )
}

// ----------- ThemeSwitch -----------
export function ThemeSwitch() {
  const { setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [currentTheme, setCurrentTheme] = React.useState<'light' | 'dark'>('light')

  // --- Get user/system preference ---
  const getColorPreference = (): 'light' | 'dark' => {
    if (typeof window !== 'undefined') {
      const storedPreference = localStorage.getItem(storageKey)
      if (storedPreference) return storedPreference as 'light' | 'dark'
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'light'
  }

  // --- Apply theme visually ---
  const reflectPreference = React.useCallback(
    (theme: 'light' | 'dark') => {
      document.documentElement.classList.remove('bg-light', 'bg-dark')
      document.documentElement.classList.add(`bg-${theme}`)
      setCurrentTheme(theme)
      setTheme(theme)
    },
    [setTheme]
  )

  // --- Initialize theme on mount ---
  React.useEffect(() => {
    setMounted(true)
    const initTheme = getColorPreference()
    reflectPreference(initTheme)

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      const newTheme = mediaQuery.matches ? 'dark' : 'light'
      if (!localStorage.getItem(storageKey)) {
        reflectPreference(newTheme)
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [reflectPreference])

  // --- Toggle manually ---
  const toggleTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light'
    localStorage.setItem(storageKey, newTheme)
    reflectPreference(newTheme)
  }

  // Avoid flicker before hydration
  if (!mounted) {
    return <FaSun className='h-4 w-4 text-[#1c1c1c]' aria-hidden='true' />
  }

  return (
    <button
      id='theme-toggle'
      aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}
      onClick={toggleTheme}
      className='flex items-center justify-center cursor-pointer transition-opacity duration-200 hover:opacity-90'
    >
      <AnimatePresence mode='wait' initial={false}>
        {currentTheme === 'dark' ? (
          <motion.div
            key='moon'
            initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
            transition={{ duration: 0.1 }}
          >
            <FaMoon className='h-4 w-4 text-[#D4D4D4]' />
          </motion.div>
        ) : (
          <motion.div
            key='sun'
            initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
            transition={{ duration: 0.1 }}
          >
            <FaSun className='h-4 w-4 text-[#1c1c1c]' />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  )
}
