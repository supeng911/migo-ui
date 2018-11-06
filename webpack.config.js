/* eslint-disable no-var */
var path = require("path");
var webpack = require("webpack");

module.exports = {
  mode: 'production',
  // entry: './src/index.js',
  output: {
    path: path.resolve('lib'),
    filename: 'ReactMultiCrop.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        use: 'babel-loader'
      }
    ]
  }

}



