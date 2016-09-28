const WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
  commons: {
    module: {
      loaders: [
        {
          test: /\.js$/,
          loaders: ['react-hot'],
        }, {
          test: /\.js$/,
          loader: 'babel',
          query: {
            cacheDirectory: '/tmp/',
            presets: ['stage-0', 'es2015', 'react'],
            plugins: ['add-module-exports', 'transform-class-properties'],
          },
        }, {
          test: /(\.scss|\.css)$/,
          exclude: /node_modules/,
          loaders: ['style', 'css', 'sass'],
        },
      ],
    },
    resolve: {
      extensions: ['', '.scss', '.js', '.json', '.jade', '.png'],
      modulesDirectories: [
        'node_modules',
      ],
    },
  },
  plugins: [
    new WebpackNotifierPlugin({
      title: 'Image Editor',
    }),
  ],
};
