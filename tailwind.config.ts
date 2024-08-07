import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#fcf8f3",
        white: "#fff",
        black: "#000",
        lightGray: "#A6A6A6",
        primeGreen: "#D8F055",
        lemonGreen: "#EBE19C",
        purple: "#8870FF",
        lightBlue: "#A2CDFF",
        darkBlue: "#328DFF",
        lightRed: "#F25B5C",
        lightOrange: "#FFB278",
        darkPink: "#FC9985",
        lightPink: "#E3C1D4",
        grayishPink: "#AC7C88",
        lightGreen: "#BDDEBC",
        green: "#20BF55",
        maroon: "#CF0000",
        darkYellow: "#FF9400",
        gray: "#e2dfda",
        placeholder: "#6c6c6c",
        darkGray: "#b6b6b6",
        yellow: "#FFE248",
        grayStar: "#e4e4e4",
        coffee: "#f3efea",
        darkCream: "#E8DDD0",
      },
      boxShadow: {
        primaryShadow: "3px 3px 0px 0px #000",
      },
    },
    screens: {
      sm: "600px",
      md: "900px",
      lg: "1200px",
      xl: "1536px",
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
export default config;
