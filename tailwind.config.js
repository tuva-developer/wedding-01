/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        burg: {
          DEFAULT: '#5C0A18',
          light: '#7B1025',
          mid: '#8B1A2A',
        },
        cream: {
          DEFAULT: '#FAF6E8',
          dark: '#EFE5CA',
          deeper: '#E4D5B0',
        },
        gold: '#C4974A',
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", 'Georgia', 'serif'],
        script: ["'Great Vibes'", 'cursive'],
        body: ["'Montserrat'", 'sans-serif'],
      },
    },
  },
  plugins: [],
}
