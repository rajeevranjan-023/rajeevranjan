import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'

const ThemeContext = createContext(null)

const STORAGE_KEY = 'rr-theme'

function getStoredTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

function setStoredTheme(value) {
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {
    /* localStorage unavailable — theme still works for this session via React state */
  }
}

/**
 * ThemeProvider — single source of truth for light/dark mode.
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => getStoredTheme() || 'light')

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark')
    } else {
      root.removeAttribute('data-theme')
    }
    setStoredTheme(theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }, [])

  // derived values every component needs — computed once per theme change
  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
      isDark: theme === 'dark',
      logoSrc: theme === 'dark' ? '/images/dark_logo.png' : '/images/light_logo.png',
      logoLabel: theme === 'dark' ? 'RR // DARK' : 'RR // LIGHT',
      themeIconClass: theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon',
    }),
    [theme, toggleTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return ctx
}
