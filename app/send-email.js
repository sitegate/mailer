'use strict';

const debug = require('debug')('sitegate-mailer');
const i18n = require('i18next');
const Q = require('q');
const emailTemplates = Q.denodeify(require('email-templates'));
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
const path = require('path');
const templatesDir = path.join(__dirname, '../templates');

module.exports = function(ms) {
  let config = ms.config;

  return function(opts, cb) {
    emailTemplates(templatesDir)
      .then(function(template) {
        opts.locals = opts.locals || {};
        opts.locals.t = i18n.t;
        opts.locals.app = config.app;

        return Q.nfcall(template, opts.templateName, opts.locals);
      })
      .then(function(html, text) {
        let smtpTransport = nodemailer
          .createTransport(mg(config.mailer.options));
        let mailOptions = {
          to: opts.to,
          from: config.mailer.from,
          subject: opts.subject || i18n.t('email.subject.' + opts.templateName),
          html: html,
          text: text
        };

        return Q.nfcall(smtpTransport.sendMail.bind(smtpTransport), mailOptions);
      })
      .then(info => cb(null, info.response))
      .catch(function(err) {
        debug('Error during sending email to ' + opts.to);
        debug(err);
        cb(err, null);
      });
  };
};
