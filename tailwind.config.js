

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,tsx,ts,jsx}", "./src/**/*.{js,tsx,ts,jsx}"],
  darkMode: 'class', // Enable dark mode using class strategy
  theme: {
    extend: {
      colors: {
        primary: '#006175',
        light: {
          background: '#ffffff',
          text: '#006175',
        },
        dark: {
          background: '#006175',
          text: '#ffffff',
        },
      },
      fontFamily: {
        sans: 'Poppins'
      },
      screens: { 
        lg: '992px'
      },
      listStyleType: {
        none: 'none',
        disc: 'disc',
        decimal: 'decimal',
      },
    },
  },
  plugins: [],
};
