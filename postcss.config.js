const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
module.exports = {
  plugins: {
    // require('tailwindcss'),
    // require('autoprefixer'),
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
  },
}
