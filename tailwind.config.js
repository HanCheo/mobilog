/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './layouts/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      maxWidth: {
        1200: '1200px'
      },
      width: {
        1200: '1200px'
      }
    }
  },
  plugins: []
}
