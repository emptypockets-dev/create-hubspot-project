const HublParser = require('@spingroup/postcss-hubl/hubl-parse');

module.exports = {
  parser: HublParser,
  plugins: {
    precss: {},
    tailwindcss: {},
  },
};

/* PostCSS and HubL get along thanks to the work of BJ Szyjakowski. 
Learn more: https://www.npmjs.com/package/@spingroup/postcss-hubl
*/

/* About PreCSS: https://github.com/csstools/precss */
/* 
PreCSS is powered by the following plugins (in this order):
  postcss-extend-rule
  postcss-advanced-variables
  postcss-preset-env
  postcss-atroot
  postcss-property-lookup
  postcss-nested
*/
