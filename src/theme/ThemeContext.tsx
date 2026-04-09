import { createContext, useContext, useState } from 'react'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export type Theme = 'dark'

const ThemeContext = createContext<ThemeContextType | null>(null)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme: Theme = 'dark'

  return <ThemeContext.Provider value={{ theme, setTheme: () => {} }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
