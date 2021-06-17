module.exports = {
  purge: [
    './storage/framework/views/*.php',
    './resources/**/*.blade.php',
    './resources/**/*.js',
    './resources/**/*.vue',
    './resources/**/*.svelte',

  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
        colors:{
            primary: "#D2F3F3",
            teal: "#F3A3FF"
        },
        fontFamily: {
            display: ['Oduda']
        }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
