/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
      dark: {
        100: '#223649',
        200: '#101A23',
      },
      light: {
        100: '#E9EDF1',
        200: '#637D96',
      },
      rotinize: {
        50: '#26D6E6',
        100: '#1DA5B2',
        200: '#017680',
      }
    }
    }
  },
  plugins: [],
}
