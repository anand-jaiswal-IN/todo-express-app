/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.pug"],
  theme: {
    extend: {
      colors: {
        "dark-bg": "#263A47",
        "light-bg": "#4A5B6A",
        "grey": "#728495",
        "dark-white": "#98A9BE",
        "light-white": "#B4C5DB",
        "error" : "red",
        "success" : "green"
      },
    },
  },
  plugins: [],
};
