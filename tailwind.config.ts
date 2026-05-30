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
        weddingGold: {
          light: "#FDF8EE",
          DEFAULT: "#C5A059",
          dark: "#8C6A36",
        },
        weddingWhite: "#FAFAFA",
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Lato", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
