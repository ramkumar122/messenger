/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4D7CFE",
        secondary: "#00C9A7",
        surface: "#F5F5F5",
        background: "#FFFFFF",
        textPrimary: "#1E1E1E",
        textSecondary: "#6E6E6E",
      },
      borderRadius: {
        lg: "12px",
      },
      animation: {
        pop: "pop 0.15s ease-out",
        slideIn: "slideIn 0.2s ease-out",
        blob: "blob 15s infinite ease-in-out",
        gradient: "gradient 12s ease infinite",
      },
      animationDelay: {
        2000: "2s",
        4000: "4s",
      },
      keyframes: {
        pop: {
          "0%": { transform: "scale(0.85)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateX(20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        blob: {
          "0%,100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(20px, -30px) scale(1.05)" },
          "66%": { transform: "translate(-15px, 15px) scale(0.95)" },
        },
        gradient: {
          "0%,100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
      },
    },
  },
  plugins: [],
};