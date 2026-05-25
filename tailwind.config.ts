import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f4faf9',
          100: '#e8f4f2',
          200: '#cfe9e6',
          300: '#a8d8d2',
          400: '#7ebec5',
          500: '#5fa8b0',
          600: '#4a8a92',
          700: '#3f7178',
          800: '#375c62',
          900: '#314e53',
        },
        earth: {
          50: '#faf6f1',
          100: '#f3ebe0',
          200: '#e6d4bc',
          300: '#d4b896',
          400: '#c19a72',
          500: '#a9804a',
          600: '#92673d',
          700: '#785233',
          800: '#62442e',
          900: '#513a28',
        },
      },
      fontFamily: {
        sans: ['"Open Sans"', 'system-ui', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
