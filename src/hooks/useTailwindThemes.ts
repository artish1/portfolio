import { Theme, useTheme } from "@/theme/ThemeContext";

type ThemeTailwindVariants = {
  background: string;
  text: string;
  backgroundLight?: string;
  backgroundAccent?: string;
  textAccent?: string;
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
    background: 'bg-black',
    backgroundAccent: 'bg-white',
    backgroundLight: 'bg-[#111111]',
    text: 'text-white',
    textAccent: 'text-black',
  },
};

const useTailwindThemes = () => {
  const { theme } = useTheme();

  const currentTheme = themes[theme];

  return currentTheme;
}

export default useTailwindThemes;