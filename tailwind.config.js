/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Press Start 2P'"],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
