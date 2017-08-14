'use strict';

const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NunjucksWebpackPlugin = require('nunjucks-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const extractSass = new ExtractTextPlugin({
  // filename: './css/[name].[contenthash].css',
  filename: './css/[name].css',
  disable: process.env.NODE_ENV === 'development'
});

module.exports = {
  entry: './src/index.js',
  output: {
    filename: './js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
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
            loader: 'postcss-loader', options: {
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
  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    contentBase: './dist',
    hot: false
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    extractSass,
    // https://github.com/jantimon/html-webpack-plugin
    // new HtmlWebpackPlugin({
      // filename: 'index.html',
      // template: './src/views/index.html'
    // }),
    new NunjucksWebpackPlugin({
      template: {
        from: './src/views/index/index.njk',
        to: 'index.html'
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    // https://www.npmjs.com/package/browser-sync-webpack-plugin
    // https://browsersync.io/docs
    new BrowserSyncPlugin({
      // browse to http://localhost:3000/ during development,
      host: 'localhost',
      port: 3000,
      files: ['src/views/**/*.njk'],
      // server: { baseDir: ['src/views', 'dist'] },
      proxy: 'http://localhost:8080/',
      open: true
    }, {reload: false})
  ]
};
