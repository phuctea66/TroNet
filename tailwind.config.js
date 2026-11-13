/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#700404',
          'primary-hover': '#580303',
          'primary-light': '#FDF2F2',
          'primary-subtle': '#F8D7D7',
          secondary: '#FFF012',
          'secondary-hover': '#EBDC0B',
          'secondary-light': '#FFFDE0',
          ivory: '#F4F7F9',
          surface: '#FFFFFF',
          border: '#E2E8F0',
          text: '#1E293B',
          muted: '#64748B'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(112, 4, 4, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 10px 25px -3px rgba(112, 4, 4, 0.12), 0 4px 10px -2px rgba(0, 0, 0, 0.06)',
      },
      borderRadius: {
        'DEFAULT': '0.5rem',
        'lg': '0.5rem',
      }
    },
  },
  plugins: [],
}
