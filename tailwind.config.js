/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F4EEFF',
          100: '#E7D9FF',
          200: '#CFB3FF',
          300: '#B387FA',
          400: '#8B5CF6',
          500: '#6D28D9',
          600: '#5821B6',
          700: '#421A8E',
          800: '#2A1166',
          900: '#1A0844',
          950: '#10052B',
        },
        accent: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#FFC107',
          600: '#E0A406',
          700: '#B58202',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        soft: '0 6px 20px -4px rgba(109, 40, 217, 0.25)',
        card: '0 10px 30px -12px rgba(26, 8, 68, 0.18)',
        phone: '0 30px 80px -20px rgba(26, 8, 68, 0.4), 0 10px 30px -10px rgba(26, 8, 68, 0.25)',
        glow: '0 0 0 4px rgba(255, 193, 7, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.35s ease-out',
        'pulse-soft': 'pulseSoft 2.4s ease-in-out infinite',
        marquee: 'marquee 18s linear infinite',

        /* Onboarding & rich UI animations */
        float: 'float 3.2s ease-in-out infinite',
        'float-slow': 'float 5s ease-in-out infinite',
        'float-fast': 'float 2.2s ease-in-out infinite',
        'float-reverse': 'floatReverse 3.6s ease-in-out infinite',
        'bounce-in': 'bounceIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) backwards',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) backwards',
        'pop-in': 'pop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) backwards',
        'slide-in-left': 'slideInLeft 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) backwards',
        'slide-in-right': 'slideInRight 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) backwards',
        'slide-in-up': 'slideInUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) backwards',
        'slide-in-down': 'slideInDown 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) backwards',
        'spin-slow': 'spin 14s linear infinite',
        'spin-reverse': 'spinReverse 20s linear infinite',
        wiggle: 'wiggle 2.6s ease-in-out infinite',
        glow: 'glow 2.4s ease-in-out infinite',
        'gradient-shift': 'gradientShift 12s ease infinite',
        breathe: 'breathe 4s ease-in-out infinite',
        twinkle: 'twinkle 2.2s ease-in-out infinite',
        tada: 'tada 1.4s ease-in-out infinite',
        shine: 'shine 3.5s ease-in-out infinite',
        'orbit-slow': 'orbit 16s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(12px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.6 },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },

        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(10px)' },
        },
        bounceIn: {
          '0%': { opacity: 0, transform: 'scale(0.3)' },
          '55%': { opacity: 1, transform: 'scale(1.08)' },
          '75%': { transform: 'scale(0.96)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        scaleIn: {
          '0%': { opacity: 0, transform: 'scale(0.6)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        pop: {
          '0%': { opacity: 0, transform: 'scale(0)' },
          '60%': { opacity: 1, transform: 'scale(1.15)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        slideInLeft: {
          '0%': { opacity: 0, transform: 'translateX(-40px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: 0, transform: 'translateX(40px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        slideInUp: {
          '0%': { opacity: 0, transform: 'translateY(40px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideInDown: {
          '0%': { opacity: 0, transform: 'translateY(-40px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        spinReverse: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(4deg)' },
        },
        glow: {
          '0%, 100%': {
            boxShadow:
              '0 0 18px rgba(255, 193, 7, 0.45), 0 0 36px rgba(255, 193, 7, 0.18)',
          },
          '50%': {
            boxShadow:
              '0 0 30px rgba(255, 193, 7, 0.85), 0 0 60px rgba(255, 193, 7, 0.4)',
          },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.06)' },
        },
        twinkle: {
          '0%, 100%': { opacity: 0.25, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.25)' },
        },
        tada: {
          '0%, 100%': { transform: 'scale(1) rotate(0)' },
          '10%, 20%': { transform: 'scale(0.94) rotate(-4deg)' },
          '30%, 50%, 70%, 90%': { transform: 'scale(1.08) rotate(4deg)' },
          '40%, 60%, 80%': { transform: 'scale(1.08) rotate(-4deg)' },
        },
        shine: {
          '0%': { transform: 'translateX(-150%) skewX(-12deg)' },
          '60%, 100%': { transform: 'translateX(250%) skewX(-12deg)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(70px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(70px) rotate(-360deg)' },
        },
      },
    },
  },
  plugins: [],
};
