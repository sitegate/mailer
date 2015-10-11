'use strict';

module.exports = function(opts) {
  opts = opts || {};

  return {
    send: require('./send-email')(opts)
  };
};
