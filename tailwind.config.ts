import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class', 'dark'],
  content: [
    './src/**/*.{ts,tsx,js,jsx}',
    './src/styles/*.css'
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
  },
  plugins: []
} satisfies Config;
