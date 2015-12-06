# html-test-loader
Webpack loader to run tests on html templates.

## Usage

Include `html-tests` in the `preLoaders` block and configure the `htmlTests` property of the config:

    ...
    htmlTests: {
      '[type="text"]': '[placeholder]',
      '[ng-click]': '[analytics-on]'
    },
    module: {
      preLoaders: [
        {
          exclude: /(node_modules|bower_components)/,
          test: /\.html$/,
          loader: 'html-test?htmlTests'
        }
      ]
      ...
    }

## Test

Expected result:

    $> npm test

    Hash: 251176082a3b92c1b89a
    Version: webpack 1.12.9
    Time: 254ms
       Asset     Size  Chunks             Chunk Names
    build.js  1.58 kB       0  [emitted]  bundle
       [0] ./index.js 25 bytes {0} [built]
        + 1 hidden modules

    WARNING in ./index.html
    <input type="text"> from index.html failed the '[placeholder]' assertion.
    <button ng-click="foo()">
    </button> from index.html failed the '[analytics-on]' assertion.
