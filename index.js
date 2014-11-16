/*
 * Copyright (C) 2014 Scott Beck, all rights reserved
 *
 * Licensed under the MIT license
 *
 */
// # Plugin Base
(function () {
  'use strict';
  var _ = require('lodash');
  var util = require('util');
  var EventEmitter = require('events').EventEmitter;
  var debug = require('debug')('code-annotate:plugin-base');

  function Base(loader) {
    EventEmitter.call(this);
    if (!this.defaultOptions) this.defaultOptions = {};
    _.merge(this.defaultOptions, this.constructor.defaultOptions);
  }
  Base.defaultOptions = {};
  util.inherits(Base, EventEmitter);
  Base.prototype.load = function (callback) {
    callback(null, this);
  };

  module.exports.load = function (anno, loader, callback) {
    var plugin = new module.exports.Plugin(loader);
    plugin.load(callback);
  };
  module.exports.extend = function (ext) {
    _.extend(module.exports, ext);
    if (ext.Plugin)
      util.inherits(ext.Plugin, Base);
    return module.exports;
  };
})();
