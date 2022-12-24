/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#01959F",
      },
      fontFamily: {
        sans: ["Nunito Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
