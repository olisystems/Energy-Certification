var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    main: './src/js/scripts/index.js',
    certification: './src/js/scripts/token.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './app/js')
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',

      })
    ],

  devServer: {
    contentBase: './app'
  },
};
