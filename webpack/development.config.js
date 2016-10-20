const path = require('path');
const _ = require('lodash');
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const baseConfig = require('./base.config');
const NODE_PORT = process.env.NODE_PORT || 9000;
const localAddress = 'http://localhost:' + NODE_PORT;

module.exports = _.assign({}, baseConfig.commons, {
  devtool: 'sourcemap',
  entry: [
    'webpack-dev-server/client?' + localAddress,
    'webpack/hot/only-dev-server',
    './src/index',
  ],
  output: {
    path: __dirname,
    filename: 'index.js',
    publicPath: localAddress + '/',
  },
  plugins: baseConfig.plugins.concat([
    new HotModuleReplacementPlugin(),
    new DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
      },
    }),
  ]),
});
