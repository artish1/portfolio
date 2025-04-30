import { Theme, useTheme } from "@/theme/ThemeContext";

type ThemeTailwindVariants = {
  background: string;
  text: string;
}

const themes: Record<Theme, ThemeTailwindVariants> = {
  light: {
    background: 'bg-white',
    text: 'text-black',
  },
  dark: {
    background: 'bg-black',
    text: 'text-white',
  },
};

const useTailwindThemes = () => {
  const { theme } = useTheme();

  const currentTheme = themes[theme];

  return currentTheme;
}

export default useTailwindThemes;