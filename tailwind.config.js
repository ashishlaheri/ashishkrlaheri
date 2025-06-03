/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary': '#6366f1',
        'secondary': '#4f46e5',
        'dark': '#0f172a',
        'darker': '#020617',
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
        'heading': ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          'from': { 'text-shadow': '0 0 10px #6366f1, 0 0 20px #6366f1, 0 0 30px #6366f1' },
          'to': { 'text-shadow': '0 0 20px #4f46e5, 0 0 30px #4f46e5, 0 0 40px #4f46e5' },
        }
      }
    },
  },
  plugins: [],
} 