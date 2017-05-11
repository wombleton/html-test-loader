'use strict';

var config = {
  context: __dirname,
  entry: {
    bundle: './index.js'
  },
  output: {
    path: __dirname,
    filename: 'build.js'
  },
  stats: {
    colors: true,
    reasons: true, // verbose errors
    chunks: false  // clean summary output
  },
  htmlTests: [
    { finder: '[type="text"]', test: '[placeholder]' },
    { finder: '[ng-click]', test: '[analytics-on]' },
    {
      finder: 'a',
      test: function hasText (element) {
        return element.text().trim();
      }
    },
    {
      finder: 'a',
      test: function (element) {
        return element.text().trim();
      },
      message: 'Element needs to have text'
    }
  ],
  module: {
    preLoaders: [
      {
        exclude: /(node_modules|bower_components)/,
        test: /\.html$/,
        loader: '../?htmlTests'
      }
    ],
    loaders: [
      {
        exclude: /(node_modules|bower_components)/,
        test: /\.html$/,
        loader: 'html'
      }
    ]
  }
};

module.exports = config;
