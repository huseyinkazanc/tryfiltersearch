/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "420px",
      // => @media (min-width: 346px) { ... }
      md: "650px",
      // => @media (min-width: 768px) { ... }
      lg: "1300px",
      // => @media (min-width: 1010px) { ... }
      xl: "1920px",
      // => @media (min-width: 1280px) { ... }
    },
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
