/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        'wood-dark': '#5D4037',
        'ivory': '#FAF8F5',
        'gold-accent': '#FFC107',
        'stone': '#8D6E63',
        'cream': '#FFF8E1',
      },
      fontFamily: {
        'playfair': ['"Playfair Display"', 'serif'],
        'noto': ['"Noto Sans SC"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
