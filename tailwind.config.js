module.exports = {
  mode: 'jit',
  content: ['./app/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'], // remove unused styles in production
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        main: {
          1: '#fefae0',
          2: '#faedcd',
          3: '#d4a373',
          4: '#e9edc9',
          5: '#ccd5ae',
        },
        decorative: {
          primary: '#f5d7b1',
          secondary: '#ceab8e',
          light: '#d2d3cb',

          dark1: '#252525',
          accent1: '#4d6071',
          accent2: '#442f24',
          accent3: '#6B8F71',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
