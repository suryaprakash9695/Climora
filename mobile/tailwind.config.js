/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        climora: {
          dark: '#020617',
          violet: '#8b5cf6',
          cyan: '#06b6d4',
        },
      },
    },
  },
  plugins: [],
};
