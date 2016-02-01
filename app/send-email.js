'use strict'
const joi = require('joi')
const debug = require('debug')('sitegate-mailer')
const i18n = require('i18next')
const Q = require('q')
const emailTemplates = Q.denodeify(require('email-templates'))
const path = require('path')
const templatesDir = path.join(__dirname, '../templates')

module.exports = function(ms, opts) {
  if (!opts.from) throw new Error('opts.from is required')

  let smtpTransport = ms.plugins.smtpTransport

  ms.method({
    name: 'sendEmail',
    config: {
      validate: {
        templateName: joi.string().required(),
        to: joi.string().required(),
        locals: joi.object(),
      },
    },
    handler(params) {
      return emailTemplates(templatesDir)
        .then(template => {
          params.locals = params.locals || {}
          params.locals.t = i18n.t
          params.locals.app = opts.app

          return Q.nfcall(template, params.templateName, params.locals);
        })
        .then((html, text) => {
          let mailOptions = {
            to: params.to,
            from: opts.from,
            subject: params.subject ||
              i18n.t('email.subject.' + params.templateName),
            html: html,
            text: text,
          }

          return Q.nfcall(
            smtpTransport.sendMail.bind(smtpTransport), mailOptions
          )
        })
    },
  })
}

module.exports.attributes = {
  name: 'send-email',
  dependencies: 'smtp-transport',
}
