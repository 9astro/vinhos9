import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bordeaux: {
          50:  '#fdf2f4',
          100: '#fce7eb',
          200: '#f9d3da',
          300: '#f4aebb',
          400: '#ec7d94',
          500: '#e04e6e',
          600: '#cc2d52',
          700: '#ac2042',
          800: '#8B1A35',
          900: '#6B1228',
          950: '#3d0815',
        },
        gold: {
          300: '#f0d080',
          400: '#e8c050',
          500: '#C9A84C',
          600: '#b8942a',
          700: '#9a7820',
        },
        graphite: {
          50:  '#f6f6f7',
          100: '#e2e2e5',
          200: '#c5c5cb',
          300: '#a0a0a9',
          400: '#7d7d88',
          500: '#62626e',
          600: '#4d4d58',
          700: '#3d3d47',
          800: '#27272f',
          900: '#1a1a21',
          950: '#0f0f14',
        },
        cream: '#f8f4ef',
        'off-white': '#faf8f5',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-raleway)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      backgroundImage: {
        'gradient-bordeaux': 'linear-gradient(135deg, #3d0815 0%, #6B1228 50%, #8B1A35 100%)',
        'gradient-gold': 'linear-gradient(135deg, #9a7820 0%, #C9A84C 50%, #e8c050 100%)',
        'gradient-dark': 'linear-gradient(180deg, #0f0f14 0%, #1a1a21 100%)',
      },
      boxShadow: {
        'premium': '0 4px 24px rgba(0,0,0,0.18), 0 1px 4px rgba(0,0,0,0.12)',
        'card': '0 2px 16px rgba(0,0,0,0.12)',
        'gold': '0 0 20px rgba(201,168,76,0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
    },
  },
  plugins: [],
};

export default config;
