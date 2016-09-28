const path = require('path');
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const UglifyJSPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const baseConfig = require('./base.config');
const _ = require('lodash');

module.exports = _.assign({}, baseConfig.commons, {
  entry: _.assign({}, baseConfig.entry, {
    bundle: './src/js/imageeditor',
  }),
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'index.js',
  },
  plugins: baseConfig.plugins.concat([
    new CleanWebpackPlugin(['dist/*'], {
      root: path.resolve(__dirname, '..'),
    }),
    new UglifyJSPlugin({
      compress: {
        warnings: false,
      },
    }),
    new DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
  ]),
});
