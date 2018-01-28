var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve('./src/'),
      path.resolve('./node_modules'),
    ]
  },
  devtool: 'eval-source-map',
  stats: {
    colors: true
  },
};
