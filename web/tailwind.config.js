/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#111214',
          surface: '#16181A',
          card: '#1A1C1E',
          border: '#2E3236',
          borderHover: '#3F444A',
          subtext: '#9EA2A8',
        },
        blueprint: {
          cyan: '#00A3FF',
          grid: 'rgba(0, 163, 255, 0.15)',
        },
        accent: {
          sketch: '#EF4444',
          indigo: '#4f46e5',
          'indigo-light': '#6366f1',
          violet: '#7c3aed',
          'violet-light': '#8b5cf6',
        },
        brand: {
          950: '#111214',
          900: '#16181A',
          800: '#1A1C1E',
          700: '#2E3236',
        },
      },
      fontFamily: {
        headline: ['Anton', 'sans-serif'],
        cursive: ['Caveat', 'cursive'],
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        display: ['Anton', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      backgroundImage: {
        'blueprint-grid': 'linear-gradient(rgba(0, 163, 255, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 163, 255, 0.08) 1px, transparent 1px)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(16px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        scaleIn: { '0%': { opacity: '0', transform: 'scale(0.95)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
      },
    },
  },
  plugins: [],
};
