/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        muli: ["Muli", "sans-serif"],
        roboto: ["Roboto Mono", "sans-serif"],
      },
      colors: {
        steelblue: "steelblue",
        soundBoard: "rgb(161, 100, 223)",
        counter: "#8e44ad",
        drinkbg: "#3494e4",
        drinkbordercol: "#144fc6",
      },
    },
  },
  plugins: [],
};
