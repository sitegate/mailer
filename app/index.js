'use strict';

var i18n = require('i18next');
var path = require('path');

// Registering i18n
i18n.init({
  fallbackLng: 'en',
  resGetPath: path.resolve(__dirname, '..') + '/locales/__lng__/__ns__.json'
});

module.exports = function(opts) {
  opts = opts || {};

  return {
    send: require('./send-email')(opts)
  };
};
