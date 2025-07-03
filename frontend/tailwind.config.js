/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          300: '#e0e7ff',
          500: '#4b43b7',
          600: '#5046e4'
        }
      }
    },
  },
  plugins: [],
}

