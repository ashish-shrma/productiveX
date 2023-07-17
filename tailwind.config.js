/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: {
        "DEFAULT": "4px 4px 0px #000000",
        "error": "4px 4px 0px #B3261E",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"), // Add the forms plugin
    require("@tailwindcss/typography"), // Add the typography plugin
    require("@tailwindcss/aspect-ratio"), // Add the aspect-ratio plugin
    plugin(function ({ addComponents }) {
      // Add the custom components
      const taskCard = {
        ".task-card": {
          // Create a .task-card class
          "@apply relative border-2 border-black shadow px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg appearance-none dark:border-gray-600 focus:outline-none focus:ring-0": {}, // Apply the common styles for the task cards
        },
      };
      

      addComponents(taskCard); // Add the task card component
    }),
  ],
};
