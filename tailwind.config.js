/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './client/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './client/components/**/*.{js,ts,jsx,tsx,mdx}',
    './client/layouts/**/*.{js,ts,jsx,tsx,mdx}'
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
