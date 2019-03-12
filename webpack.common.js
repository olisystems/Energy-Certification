const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    main: './src/js/index.js',
    certification: './src/js/certification.js',
    bgm: './src/js/bgm.js',
    explorer: './src/js/explorer.js'
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
    }),
    new HtmlWebpackPlugin({
      template: './src/explorer.html',
      filename: 'explorer.html',
      chunks: ['explorer']
    })
  ],
  output: {
    filename: './js/[name].bundle.js',
    path: path.resolve(__dirname, './app')
  }
};
