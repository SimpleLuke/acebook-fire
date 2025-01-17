/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {

        sans: ['Inter var'],
      },
      backgroundImage: {
      "body-background": "url('../public/img/burnbookbg.jpg')",
        'body-background2': "url('/public/img/burnbookbg2.jpg')"
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
