/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#ecfcff",
          100: "#cff7fe",
          200: "#a5effc",
          300: "#67e4f9",
          400: "#22d0ee",
          500: "#06b6d4",
          600: "#0899b2",
          700: "#0e7d90",
          800: "#156775",
          900: "#165863",
          950: "#083b44",
        },
      },
    },
  },
  plugins: [],
};
