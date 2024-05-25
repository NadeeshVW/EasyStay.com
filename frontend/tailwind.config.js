/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.js', './src/**/*.jsx', './src/**/*.ts', './src/**/*.tsx'], //errors-->split them away
  theme: {
    extend: {},
    container: {
      padding:{
        md: "10rem",
      },
    }
  },
  plugins: [],
}

