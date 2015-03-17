'use strict';

var sendEmail = require('./send-email');

module.exports = function (worker) {
  worker.addMethods({
    send: sendEmail
  });
};