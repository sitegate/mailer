'use strict';

module.exports = function (server) {
  server.addMethods({
    send: require('./send-email')
  });
};