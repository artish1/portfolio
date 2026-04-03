module.exports = {
  mode: 'jit',
  content: ['./app/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        surface: {
          bg: '#0A0A0A',
          card: '#141414',
          'card-hover': '#1A1A1A',
        },
        accent: {
          DEFAULT: '#C8A47E',
          light: '#D4B896',
          dark: '#A8845E',
          muted: 'rgba(200, 164, 126, 0.08)',
        },
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        scroll: 'scroll 30s linear infinite',
        'scroll-reverse': 'scroll 30s linear infinite reverse',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
