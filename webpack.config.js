var path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: './app/js/scripts/index.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, './app/js')
  }
};
