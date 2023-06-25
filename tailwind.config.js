/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './front/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './front/components/**/*.{js,ts,jsx,tsx,mdx}',
    './front/layouts/**/*.{js,ts,jsx,tsx,mdx}'
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
