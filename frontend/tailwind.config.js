/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var'],
      },
      backgroundImage: {
        'body-background': "url(‘../public/img/burnbookbg.jpg')",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};