/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        plum: {
          DEFAULT: "#4A2C5A",
          deep: "#2d1838",
        },
        lilac: {
          DEFAULT: "#c9a0dc",
          soft: "#e6d4f2",
          deep: "#8b5aa7",
          rich: "#7a4b96",
        },
        cream: {
          DEFAULT: "#fbf8f4",
          warm: "#f3ece3",
        },
        ink: {
          DEFAULT: "#4a3358",
          muted: "#7d6a88",
        },
        silver: "#e8e0f0",
      },
      fontFamily: {
        sans: ["system-ui", "sans-serif"],
        script: ["Great Vibes", "cursive"],
        serif: ["Playfair Display", "serif"],
        body: ["Cormorant Garamond", "serif"],
      },
      animation: {
        "pulse-line": "pulse-line 2.4s ease-in-out infinite",
        "light-burst": "light-burst 1.8s ease-out forwards",
        "ray-spin": "ray-spin 12s linear infinite",
      },
      keyframes: {
        "pulse-line": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        "light-burst": {
          "0%": { transform: "translate(-50%, -50%) scale(0)", opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { transform: "translate(-50%, -50%) scale(1)", opacity: "0" },
        },
        "ray-spin": {
          "0%": { transform: "translate(-50%, -50%) rotate(0deg)" },
          "100%": { transform: "translate(-50%, -50%) rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};
