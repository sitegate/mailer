'use strict';

var i18n = require('i18next');
var nodemailer = require('nodemailer');
var emailTemplates = require('email-templates');
var path = require('path');
var templatesDir = path.join(__dirname, '../templates');

module.exports = function(ms) {
  var config = ms.config;

  return function(opts, cb) {
    emailTemplates(templatesDir, function(err, template) {
      if (err) {
        return cb(err, null);
      }

      opts.locals = opts.locals || {};
      opts.locals.t = i18n.t;
      opts.locals.app = config.app;

      template(opts.templateName, opts.locals, function(err, html, text) {
        if (err) {
          return cb(err, null);
        }

        var smtpTransport = nodemailer.createTransport(config.mailer.options);
        var mailOptions = {
          to: opts.to,
          from: config.mailer.from,
          subject: opts.subject || i18n.t('email.subject.' + opts.templateName),
          html: html,
          text: text
        };

        smtpTransport.sendMail(mailOptions, function(err, info) {
          if (err) {
            return cb(err, null);
          }

          return cb(null, info.response);
        });
      });
    });
  };
};
