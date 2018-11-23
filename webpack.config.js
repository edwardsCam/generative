var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass-loader'
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve('src'),
      path.resolve('node_modules'),
    ]
  },
  devtool: 'eval-source-map',
  stats: {
    colors: true
  },
  devServer: {
    hot: true,
    inline: true,
  },
};
