import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/*.hbs', './views/**/*.hbs', "./node_modules/flowbite/**/*.js"],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'white': colors.white,
      'blue': colors.blue,
      'purple': colors.purple,
      'pink': colors.pink,
      'orange': colors.orange,
      'green': colors.green,
      'yellow': colors.yellow,
      'lime': colors.lime,
      'neutral': colors.neutral,
      'violet': colors.violet,
      'gray': colors.gray
    },
    fontFamily: {
      sans: ['ui-sans-serif', 'system-ui'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    }
  },
  plugins: [
    require('flowbite/plugin')
  ]
};