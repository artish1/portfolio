import { Theme, useTheme } from '@/theme/ThemeContext'

type ThemeTailwindVariants = {
  background: string
  text: string
  backgroundLight?: string
  backgroundAccent?: string
  textAccent?: string
}

const themes: Record<Theme, ThemeTailwindVariants> = {
  light: {
    background: 'bg-white',
    text: 'text-black',
    backgroundLight: 'bg-[#F5F5F5]',
    backgroundAccent: 'bg-black',
    textAccent: 'text-white',
  },
  dark: {
    background: 'bg-surface-bg',
    backgroundAccent: 'bg-accent',
    backgroundLight: 'bg-surface-card',
    text: 'text-[#EEEEEE]',
    textAccent: 'text-surface-bg',
  },
}

const useTailwindThemes = () => {
  const { theme } = useTheme()

  const currentTheme = themes[theme]

  return currentTheme
}

export default useTailwindThemes
