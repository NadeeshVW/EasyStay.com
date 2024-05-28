/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.js', './src/**/*.jsx', './src/**/*.ts', './src/**/*.tsx'], //errors-->split them away
  theme: {
    extend: {},
    container: {
      padding:{    //apply ppadding to those screen which are medium
        md: "10rem",
      },
    }
  },
  plugins: [],
}

