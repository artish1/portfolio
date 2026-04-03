module.exports = {
  mode: 'jit',
  content: ['./app/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        surface: {
          bg: '#28231F',
          card: '#312B27',
          'card-hover': '#3A3430',
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
