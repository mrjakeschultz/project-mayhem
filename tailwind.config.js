/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
 
      colors: {
        pinkish: '#f66e9',
        blueish: `#646491`,
        yellowish: '#ffd768',
        light_blueish: '#c5cede',
        blackish: '#3a3a38',
      },
fontFamily: {
  poppins: "'Poppins', sans-serif",
}
    },
  },
}
