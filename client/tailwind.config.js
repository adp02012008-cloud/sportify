/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'sw-dark': '#0a0a0f',
        'sw-card': '#14141e',
        'sw-card-hover': '#1e1e2d',
        'sw-cyan': '#06b6d4',
        'sw-blue': '#3b82f6',
        'sw-purple': '#8b5cf6',
        'sw-pink': '#ec4899',
        'sw-green': '#10b981',
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'sans-serif'],
      },
      animation: {
        'equalizer': 'equalizerBounce 1.2s ease-in-out infinite',
      },
      keyframes: {
        equalizerBounce: {
          '0%, 100%': { height: '4px' },
          '50%': { height: '18px' },
        }
      }
    },
  },
  plugins: [],
}
