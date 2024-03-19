/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      gridAutoColumns: {
        '2fr': 'minmax(0, 2fr)',
      }
    },
  },
  plugins: [],
}