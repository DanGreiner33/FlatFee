/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0f1f23',
        slatebody: '#334048',
        petrol: '#0e6b6b',
        teal: { 600: '#0e8f8f', 500: '#16a6a6', 400: '#3bbfbf' },
        mist: '#eef4f4',
        sand: '#f7f5f0',
        line: '#dce5e5'
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      borderRadius: { xl2: '1.25rem' },
      boxShadow: { card: '0 1px 2px rgba(15,31,35,.04), 0 8px 24px rgba(15,31,35,.06)' }
    }
  },
  plugins: []
}
