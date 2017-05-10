'use strict';

var cheerio = require('cheerio');
var forEach = require('lodash.foreach');
var isFunction = require('lodash.isfunction');
var format = require('util').format;
var path = require('path');

module.exports = function (source) {
  this.cacheable();

  var warnings = [];
  var key = this.query.substring(1) || 'htmlTest';

  var filename = path.relative(this.options.context, this.resourcePath);
  var $ = cheerio('<div>' + source + '</div>');

  var config = this.options[key] || {};

  forEach(config, function (assertion, test) {
    var nodes = $.find(test);

    forEach(nodes, function (node) {
      var $node = cheerio(node);
      // If our assertation is a function run it or elese look for the assertation to be on the node as normal
      if (isFunction(assertion)) {
        if (!assertion($node)) {
          warnings.push(format('%s from %s failed the: \'%s\' assertion.', $node.toString(), filename, assertion.toString()));
        }
      } else {
        if (!$node.is(assertion)) {
          warnings.push(format('%s from %s failed the \'%s\' assertion.', $node.toString(), filename, assertion));
        }
      }
    });
  });

  if (warnings.length) {
    this.emitWarning(warnings.join('\n'));
  }

  return source;
};
