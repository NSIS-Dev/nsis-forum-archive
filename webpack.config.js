const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/app.jsx',
  output: {
    path: __dirname + '/assets',
    filename: 'js/app.js',
    publicPath: "/assets"
  },
  target: 'web',
  module: {
    loaders: [
    {
      test: /.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'react']
      }
    }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      {
        from: './node_modules/apache-server-configs/dist/.htaccess',
        to: './.htaccess'
      },
      {
        from: './node_modules/bootstrap/dist/css/bootstrap.min.css',
        to: './css/theme.css'
      },
      {
        from: './bower_components/SVG-Loaders/svg-loaders/oval.svg',
        to: './images/loader.svg'
      }
    ])
  ]
};