/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  darkMode: "media",
  theme: {
    fontFamily: {
      sans: "'Poppins', sans-serif;",
      logo: " 'Rubik Vinyl', cursive;",
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
