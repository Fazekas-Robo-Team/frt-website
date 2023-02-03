/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}', './src/**/*.md'],
  theme: {
    extend: {
      dropShadow: {
        'xl-purple-br': '10px 10px 0px #9461FF',
        'xl-purple-tr': '10px -10px 0px #9461FF',
        'md-purple-tr': '5px -5px 0px #9461FF',
      },
    },
    colors: {
      'primary': '#9461FF',
      'gray': '#323232',
      'light-blue': '#E8F4FF',
      'light-green': '#8CF0A8',
      'light-purple': '#F1EBFF',
      'light-orange': '#FFEBDC',
      'green': '#A0FF27',
      'teal': '#1CFFD6',
      'yellow': '#FFE600',
      'black': '#000000',
      'white': '#FFFFFF',
    },
  },
  plugins: [],
}
