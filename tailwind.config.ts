import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        forest: {
          50: "#eff5f1",
          100: "#dce9df",
          200: "#bbd4c2",
          300: "#91b89d",
          400: "#689978",
          500: "#477c5b",
          600: "#356346",
          700: "#2b503a",
          800: "#244131",
          900: "#1d3529",
          950: "#102019",
        },
        sand: {
          50: "#fcfbf8",
          100: "#f6f4ed",
          200: "#ece9de",
          300: "#ded9c8",
        },
        lime: {
          300: "#d8f09a",
          400: "#c5e87a",
        },
        ink: "#1d2925",
        muted: "#718078",
      },
      boxShadow: {
        card: "0 24px 70px -36px rgba(27, 52, 40, 0.28)",
        soft: "0 10px 30px -18px rgba(27, 52, 40, 0.2)",
      },
      fontFamily: {
        sans: ["Arial", "Helvetica", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
