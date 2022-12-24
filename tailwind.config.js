/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#01959F",
        secondary: "#FA9810",
        danger: "#E11428",
        success: "#43936C",

        "default-black": "#404040",
        "strong-black": "#333333",

        "primary-light": "#4DB5BC",
        "secondary-light": "#FEEABC",
        "danger-light": "#F5B1B7",
        "success-light": "#B8DBCA",

        "primary-surface": "#F7FEFF",
        "secondary-surface": "#FFFCF5",
        "danger-surface": "#FFFAFA",
        "success-surface": "#F8FBF9",
      },
      fontFamily: {
        sans: ["Nunito Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
