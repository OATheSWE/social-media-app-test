

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,tsx,ts,jsx}", "./src/**/*.{js,tsx,ts,jsx}"],
  darkMode: 'class', // Enable dark mode using class strategy
  theme: {
      colors: {
        accent2: '#006175',
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
  plugins: [],
};
