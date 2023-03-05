/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      boxShadow: {
        "DEFAULT": "4px 4px 0px #000000",
        "error": "4px 4px 0px #B3261E",
      }
    },
  },
  plugins: [],
}
