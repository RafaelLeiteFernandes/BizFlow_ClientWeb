module.exports = {
  mode: 'jit',
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors:{
        'dark-gray':'#1C2128',
        'dark-gray-0.5':'#444C56',
        'dark-gray-1': '#2D333B',
        'dark-gray-2':'#22272E',
        'dark-text':'#C5D1DE'
      },
      keyframes: {
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        'fade-in-down': 'fade-in-down 1s ease-out',
      },
    },
  },
  variants: {},
  plugins: [],
};
