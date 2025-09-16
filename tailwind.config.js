/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,md,mdx}',
    './components/**/*.{js,ts,jsx,tsx,md,mdx}',
    './layouts/**/*.{js,ts,jsx,tsx,md,mdx}',
    './data/**/*.{js,ts,jsx,tsx,md,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
