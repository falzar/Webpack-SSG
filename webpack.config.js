'use strict';

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const extractSass = new ExtractTextPlugin({
  // filename: '[name].[contenthash].css',
  filename: './css/[name].css',
  disable: process.env.NODE_ENV === 'development'
});

module.exports = {
  entry: './src/index.js',
  output: {
    filename: './js/bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [{
            loader: 'css-loader', options: {
              sourceMap: true
            }
          }, {
            loader: 'sass-loader', options: {
              sourceMap: true
            }
          }],
          // use style-loader in development
          fallback: 'style-loader'
        })
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'file-loader',
          {
            // https://github.com/tcoopman/image-webpack-loader
            loader: 'image-webpack-loader',
            query: {
              progressive: true,
              optimizationLevel: 7,
              interlaced: false,
              pngquant: {
                quality: '65-90',
                speed: 4
              }
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    extractSass
  ]
};
