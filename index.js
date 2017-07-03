'use strict';

var cheerio = require('cheerio');
var forEach = require('lodash.foreach');
var isFunction = require('lodash.isfunction');
var format = require('util').format;
var path = require('path');

module.exports = function (source) {
  var self = this;
  self.cacheable();

  var warnings = [];
  var key = self.query.substring(1) || 'htmlTest';

  var $ = cheerio('<div>' + source + '</div>');

  var config = self.options[key] || {};

  forEach(config, function (opts) {
    var test = opts.test;

    var nodes = $.find(opts.finder);

    forEach(nodes, function (node) {
      var $node = cheerio(node);

      if (isFunction(test)) { // function test, receives cheerio node
        if (!test($node)) {
          if (opts.message) {
            warnings.push(format('%s from %s failed \'%s\'', $node.toString(), self.resourcePath, opts.message));
          } else {
            warnings.push(format('%s from %s failed \'%s\'', $node.toString(), self.resourcePath, test.name !== 'test' ? test.name : test.toString()));
          }
        }
      } else {
        if (!$node.is(test)) {
          warnings.push(format('%s from %s failed the \'%s\' test.', $node.toString(), self.resourcePath, test));
        }
      }
    });
  });

  if (warnings.length) {
    self.emitWarning(warnings.join('\n'));
  }

  return source;
};
