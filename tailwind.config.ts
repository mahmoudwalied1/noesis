import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        // Updated color palette from your image
        'galactic-blue': '#4A9FD8',
        'nebula-purple': '#8B5CF6',
        'stellar-aqua': '#22D3EE',
        'deep-space': '#0A0E27',
        'space-navy': '#1A1F3A',
        'plasma-glow': '#EC4899',
        'cosmic-dark': '#151B3B',
        'neon-cyan': '#06B6D4',
        'violet-deep': '#7C3AED',
        'pink-bright': '#F472B6',
      },
      spacing: {
        'safe': '16px',
        'section': '80px',
      },
      borderRadius: {
        'cosmic': '24px',
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(34, 211, 238, 0.5), 0 0 40px rgba(34, 211, 238, 0.3)',
        'neon-purple': '0 0 20px rgba(139, 92, 246, 0.5), 0 0 40px rgba(139, 92, 246, 0.3)',
        'neon-pink': '0 0 20px rgba(236, 72, 153, 0.5), 0 0 40px rgba(236, 72, 153, 0.3)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      backdropBlur: {
        'cosmic': '20px',
      },
    },
  },
  plugins: [],
} satisfies Config