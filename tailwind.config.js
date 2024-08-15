/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif']
      },
      gridTemplateColumns: {
        '70/30': '70% 28%'
      },
      colors: {
        'custom-blue': '#6699CC',
        'custom-dark': '#0D1F2D',
        'custom-pink': '#FAE1DF',
        'custom-red': '#FF3C38',
        'custom-beige': '#E4C3AD'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
