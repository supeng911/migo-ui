/* eslint-disable no-var */
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  externals: [nodeExternals()],
  module: {
    loaders: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { modules: true, importLoaders: 1 } },
          'postcss-loader'
        ]
      },
      // {
      //   test: /\.css$/,
      //   loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?modules&importLoaders=1&localIdentName=draftJsMentionPlugin__[local]__[hash:base64:5]!postcss-loader' }),
      // },
    ],
  },
  plugins: [
    new ExtractTextPlugin({ filename: `${path.parse(process.argv[2]).name}.css` }),
  ],
}



