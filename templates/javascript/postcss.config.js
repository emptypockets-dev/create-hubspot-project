const HublParser = require('@spingroup/postcss-hubl/hubl-parse');

module.exports = {
  parser: HublParser,
  plugins: {
    'postcss-extend-rule': {},
    'postcss-advanced-variables': {},
    'postcss-preset-env': {},
    'postcss-atroot': {},
    'postcss-property-lookup': {},
    'postcss-nested': {},
    tailwindcss: {},
  },
};

/* PostCSS and HubL get along thanks to the work of BJ Szyjakowski. 
Learn more: https://www.npmjs.com/package/@spingroup/postcss-hubl
*/
