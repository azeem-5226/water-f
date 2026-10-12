/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#123B5D',
          dark: '#0A2338',
          light: '#1D5380',
          50: '#F0F6FA',
          100: '#D9E8F2',
          900: '#071827',
        },
        accent: {
          DEFAULT: '#087E8B',
          hover: '#06646F',
          light: '#E0F4F7',
          muted: '#119DA4',
        },
        pageBg: {
          DEFAULT: '#E8F7FA',
          subtle: '#F0FAF8',
          darker: '#DCF2F6',
        },
        cardBg: '#FFFFFF',
        bookBtn: {
          DEFAULT: '#F4B942',
          hover: '#E3A730',
          active: '#CE9322',
          text: '#123B5D',
        },
        textMuted: '#4B6D84',
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 8px 30px rgba(18, 59, 93, 0.08)',
        'card-hover': '0 16px 40px rgba(18, 59, 93, 0.14)',
        'gold': '0 8px 24px rgba(244, 185, 66, 0.4)',
        'gold-hover': '0 12px 32px rgba(244, 185, 66, 0.55)',
      }
    },
  },
  plugins: [],
}
