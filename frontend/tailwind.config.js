/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var'],
      },
      backgroundImage: {
        'body-background': "url('/public/img/burnbookbg.jpg')"
      },
      height: {
        'full-screen': '100vh',
      },
    },
  },
  // plugins: [
  //   require('@tailwindcss/forms'),
  // ],
};