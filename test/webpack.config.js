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
    'a': function(element) {
      console.log(element.text())
      if (element.text()) {
        return true
      }
      return false;
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
