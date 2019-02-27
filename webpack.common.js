const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    main: './src/js/scripts/index.js',
    certification: './src/js/scripts/token.js',
    bgm: './src/js/scripts/bgm.js'
  },
  plugins: [
    //new CleanWebpackPlugin('app', {} ),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      template: './src/certification.html',
      filename: 'certification.html',
      chunks: ['certification']
    }),
    new HtmlWebpackPlugin({
      template: './src/bgm.html',
      filename: 'bgm.html',
      chunks: ['bgm']
    })
  ],
  output: {
    filename: './js/[name].bundle.js',
    path: path.resolve(__dirname, './app')
  }
};