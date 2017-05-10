'use strict';

var cheerio = require('cheerio');
var forEach = require('lodash.foreach');
var isFunction = require('lodash.isfunction');
var isObject = require('lodash.isobjectlike');
var format = require('util').format;
var path = require('path');

module.exports = function (source) {
  var self = this;
  self.cacheable();

  var warnings = [];
  var key = self.query.substring(1) || 'htmlTest';

  var filename = path.relative(self.options.context, self.resourcePath);
  var $ = cheerio('<div>' + source + '</div>');

  var config = self.options[key] || {};

  forEach(config, function (assertion, test) {
    var nodes = $.find(test);

    forEach(nodes, function (node) {
      var $node = cheerio(node);

      if (isObject(assertion)) { // object with `test` and `message` properties
        if (isFunction(assertion.test)) {
          if (!assertion.test($node)) {
            warnings.push(format('%s from %s failed: ', $node.toString(), filename, assertion.message));
          }
        } else {
          self.emitError('HTML test requires `test` property');
        }
      } else if (isFunction(assertion)) { // function test, receives cheero node
        if (!assertion($node)) {
          warnings.push(format('%s from %s failed the: \'%s\' assertion.', $node.toString(), filename, assertion.toString()));
        }
      } else { // assumed to be "is" test
        if (!$node.is(assertion)) {
          warnings.push(format('%s from %s failed the \'%s\' assertion.', $node.toString(), filename, assertion));
        }
      }
    });
  });

  if (warnings.length) {
    self.emitWarning(warnings.join('\n'));
  }

  return source;
};
