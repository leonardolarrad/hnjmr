/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          1: '#a82654',
          2: '#fd8c69',
          3: '#fa9373'
        },
        dark: {
          1: '#0c0d0f',
          2: '#191b1f',
          3: '#22252a',
          4: '#17191d'
        },
        light: {
          1: '#f3f2f0',
          2: '#ebeae7',
          3: '#e6e4e0',
          4: '#e6e4e0'
        }
      },
    },
  },
  plugins: [],
}
