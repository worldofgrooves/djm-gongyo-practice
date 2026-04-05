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
        ink: {
          DEFAULT: "#1a1612",
          soft: "#4a4440",
          muted: "#8a8078",
        },
        paper: {
          DEFAULT: "#f7f3ee",
          warm: "#ede8e1",
          deep: "#e2dbd2",
        },
        gold: {
          DEFAULT: "#b8926a",
          light: "#d4aa82",
          pale: "#f0e4d4",
        },
        lotus: {
          DEFAULT: "#c4849a",
          pale: "#f5eaee",
        },
        selected: {
          bg: "#fdf6ee",
          border: "#b8926a",
        },
        playing: {
          bg: "#fff9f0",
        },
      },
      fontFamily: {
        serif: ["Crimson Pro", "serif"],
        sans: ["DM Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
