'use strict';

var sendEmail = require('./send-email');

module.exports = function (worker) {
  worker.on('mailer.send', function (mail, cb) {
    sendEmail(mail, cb);
  });
};