'use strict'
const nodemailer = require('nodemailer')
const mg = require('nodemailer-mailgun-transport')

module.exports = function(ms, opts) {
  let smtpTransport = nodemailer.createTransport(mg(opts));
  ms.expose(smtpTransport)
}

module.exports.attributes = {
  name: 'smtp-transport',
}
