/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        'gradient-linear': 'linear-gradient(90deg, #FEC354, #fefae0)',
      },
      backgroundSize: {
        '200x100': '200% 100%',
      },
      backgroundPosition: {
        'top-start': '0% 0%',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        'leftArrow': {
          '0%, 100%': { transform: 'translateX(-25%)' },
          '50%': { transform: 'translateX(0)' },
        },
        'gradientChange': {
          from :{
            backgroundPosition: '0 0'
          },
          to: {
            backgroundPosition: '100% 0'
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'leftArrow':'leftArrow 1s infinite',
        'gradientChange': 'gradientChange 1.5s infinite linear alternate'
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
