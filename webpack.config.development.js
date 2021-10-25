const { merge } = require('webpack-merge');

const config = require('./webpack.config');

module.exports = merge(config, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    devMiddleware: {
      writeToDisk: true,
    },
  },
});
