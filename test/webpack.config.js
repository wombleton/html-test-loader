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
  htmlTests: {
    '[type="text"]': '[placeholder]',
    '[ng-click]': '[analytics-on]',
    'a': function (element) {
      return element.text();
    },
    'a[href]': {
      test: function (element) {
        return element.text();
      },
      message: 'Element needs to have text'
    }
  },
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
