const HubSpotAutoUploadPlugin = require('@hubspot/webpack-cms-plugins/HubSpotAutoUploadPlugin');
/* PostCSS and HubL get along thanks to the work of BJ Szyjakowski. 
Learn more: https://www.npmjs.com/package/@spingroup/postcss-hubl
*/
const HublClean = require('@spingroup/postcss-hubl/hubl-clean');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const entryPlus = require('webpack-entry-plus');
const glob = require('glob');

const entryFiles = [
  {
    entryFiles: glob.sync('./src/modules/**/*/module.js'),
    outputName(item) {
      return item.replace('./src/', '').replace('.js', '');
    },
  },
  {
    entryFiles: ['./src/index.js'],
    outputName(item) {
      return item.replace('./src/', 'js/').replace('index.js', 'main');
    },
  },
];

module.exports = ({ account, autoupload }) => ({
  entry: entryPlus(entryFiles),
  output: {
    filename: '[name].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HublClean(),
    new HubSpotAutoUploadPlugin({
      account,
      autoupload,
      src: 'dist',
      dest: 'CMS Theme Boilerplate',
    }),
    new MiniCssExtractPlugin({
      filename: ({ chunk }) => {
        if (chunk.name == 'js/main') {
          return 'css/styles.css';
        } else {
          return `${chunk.name}.css`;
        }
      },
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/theme.json', to: 'theme.json' },
        { from: 'src/fields.json', to: 'fields.json' },
        { from: 'src/images', to: 'images' },
        { from: 'src/modules', to: 'modules' },
        { from: 'src/sections', to: 'sections' },
        { from: 'src/templates', to: 'templates' },
        { from: 'src/css', to: 'css' },
      ],
    }),
  ],
});
