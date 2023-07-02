/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
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
      },
      colors: {
        'fg-color': {
          default: 'var(--fg-color)',
          0: 'var(--fg-color-0)',
          1: 'var(--fg-color-1)',
          2: 'var(--fg-color-2)',
          3: 'var(--fg-color-3)',
          4: 'var(--fg-color-4)',
          5: 'var(--fg-color-5)',
          6: 'var(--fg-color-6)',
          icon: 'var(--fg-color-icon)'
        },
        'bg-color': {
          default: 'var(--bg-color)',
          0: 'var(--bg-color-0)',
          1: 'var(--bg-color-1)',
          2: 'var(--bg-color-2)'
        },
        notion: {
          red: 'var(--notion-red)',
          pink: 'var(--notion-pink)',
          blue: 'var(--notion-blue)',
          purple: 'var(--notion-purple)',
          teal: 'var(--notion-teal)',
          yellow: 'var(--notion-yellow)',
          orange: 'var(--notion-orange)',
          brown: 'var(--notion-brown)',
          gray: 'var(--notion-gray)',
          red_background: 'var(--notion-red_background)',
          pink_background: 'var(--notion-pink_background)',
          blue_background: 'var(--notion-blue_background)',
          purple_background: 'var(--notion-purple_background)',
          teal_background: 'var(--notion-teal_background)',
          yellow_background: 'var(--notion-yellow_background)',
          orange_background: 'var(--notion-orange_background)',
          brown_background: 'var(--notion-brown_background)',
          gray_background: 'var(--notion-gray_background)',
          red_background_co: 'var(--notion-red_background_co)',
          pink_background_co: 'var(--notion-pink_background_co)',
          blue_background_co: 'var(--notion-blue_background_co)',
          purple_background_co: 'var(--notion-purple_background_co)',
          teal_background_co: 'var(--notion-teal_background_co)',
          yellow_background_co: 'var(--notion-yellow_background_co)',
          orange_background_co: 'var(--notion-orange_background_co)',
          brown_background_co: 'var(--notion-brown_background_co)',
          gray_background_co: 'var(--notion-gray_background_co)'
        }
      }
    }
  },
  plugins: []
}
