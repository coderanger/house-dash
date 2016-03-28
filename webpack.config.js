var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var isProd = process.env.NODE_ENV === 'production';

module.exports = {
  context: __dirname + '/src',
  entry: [
    'webpack-hot-middleware/client',
    '../bower_components/normalize-css/normalize.css',
    '../bower_components/font-awesome/scss/font-awesome.scss',
    '../bower_components/weather-icons/sass/weather-icons.scss',
    './index.js',
  ],

  output: {
    filename: 'app.js',
    path: __dirname + '/dist',
    publicPath: '/assets/',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules|bower_components/,
        loader: 'babel',
      },
      {
        test: /\.css$/,
        loader: isProd ?
          ExtractTextPlugin.extract('style', 'css?sourceMap') :
          'style!css?sourceMap',
      },
      {
        test: /\.scss$/,
        loader: isProd ?
          ExtractTextPlugin.extract('style', 'css?sourceMap!sass?sourceMap') :
          'style!css?sourceMap!sass?sourceMap',
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=100000&minetype=application/font-woff',
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file',
      },
    ],
  },

  devtool: '#source-map',

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ].concat(isProd ? [new ExtractTextPlugin('app.css')] : []),
}
