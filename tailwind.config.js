/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js" // add this line
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'),
    function ({ addBase }) {
      addBase({
        'h1': { fontSize: '2.5rem', lineHeight: '3rem' },  // Taille pour h1
        'h2': { fontSize: '2rem', lineHeight: '2.5rem' },   // Taille pour h2
        'h3': { fontSize: '1.75rem', lineHeight: '2.25rem' }, // Taille pour h3
        'h4': { fontSize: '1.5rem', lineHeight: '2rem' },    // Taille pour h4
        'h5': { fontSize: '1.25rem', lineHeight: '1.75rem' }, // Taille pour h5
        'h6': { fontSize: '1rem', lineHeight: '1.5rem' },    // Taille pour h6
      });
    }
  ],
}
