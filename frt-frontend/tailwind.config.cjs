/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}', './src/**/*.md'],
  theme: {
    extend: {
      dropShadow: {
        'xl-purple-br': '10px 10px 0px #9461FF',
        'xl-black-br': '10px 10px 0px #000000',
        'xl-purple-tr': '10px -10px 0px #9461FF',
        'md-purple-br': '5px 5px 0px #9461FF',
        'md-black-br': '5px 5px 0px #000000',
        'md-purple-tr': '5px -5px 0px #9461FF',

      },
      translate: {
        '5px': '5px',
        '10px': '10px',
      },
    },
    colors: {
      'primary': '#9461FF',
      'gray': '#323232',
      'light-blue': '#E8F4FF',
      'light-green': '#E2FFEA',
      'light-purple': '#F1EBFF',
      'light-orange': '#FFEBDC',
      'medium-green': '#8CF0A8',
      'green': '#A0FF27',
      'teal': '#1CFFD6',
      'yellow': '#FFE600',
      'black': '#000000',
      'white': '#FFFFFF',
    },
  },
  plugins: [],
}
