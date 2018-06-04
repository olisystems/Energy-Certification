var path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: {
    home: './app/js/scripts/index.js',
    certification: './app/js/scripts/token.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './app/js')
  }
};
