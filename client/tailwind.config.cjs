/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.html", "./src/**/*.ts", "./src/**/*.tsx"],
  theme: {
    screens: {
      sm: {max: "639px"},
    },
    extend: {},
  },
  plugins: [],
}
