/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading:    ['"Cinzel"', 'serif'],
        decorative: ['"Cinzel Decorative"', 'serif'],
        lore:       ['"IM Fell English"', 'serif'],
        sans:       ['"Cinzel"', 'system-ui', 'serif'],
      },
      colors: {
        night:     '#14110d',   // deep brown-black background
        parchment: '#e8dcc0',   // aged paper
        'parchment-dark': '#d8c9a3',
        ink:       '#2a2118',    // sepia ink
        gold:      '#c9a227',
        'gold-dim': '#9a7c1e',
      },
      boxShadow: {
        panel: '-12px 0 40px -10px rgba(0,0,0,0.6)',
      },
    },
  },
  plugins: [],
}
