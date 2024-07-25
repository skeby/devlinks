import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "hsla(var(--primary))",
        "primary-hover": "hsla(var(--primary-hover))",
        "primary-light": "hsla(var(--primary-light))",

        grey: "hsla(var(--grey))",
        "grey-light": "hsla(var(--grey-light))",
        "grey-dark": "hsla(var(--grey-dark))",

        border: "hsla(var(--border))",
        white: "hsla(var(--white))",
        red: "hsla(var(--red))",
      },
    },
    fontFamily: {
      sans: ["Instrument sans", "sans-serif"],
    },
  },
  plugins: [],
};
export default config;
