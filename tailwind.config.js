/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
      },
      transitionProperty: {
        height: "height",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
    variants: {
      extend: {
        height: ["hover", "focus"],
      },
    },
  },
  plugins: [],
};