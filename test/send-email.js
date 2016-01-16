'use strict'
const expect = require('chai').expect
const sendEmail = require('../app/send-email')
const jimbo = require('jimbo')
const plugiator = require('plugiator')
require('../app/index') //i18n configuration

describe('sendEmail', function() {
  it('should send email verification email', function() {
    let server = new jimbo.Server()
    return server.register([
      {
        register: plugiator.create('smtp-transport', (server, opts) => {
          server.expose({
            sendMail(mailopts, cb) {
              expect(mailopts).to.exist
              expect(mailopts.to).to.exist
              expect(mailopts.from).to.exist
              expect(mailopts.subject).to.exist
              expect(mailopts.html).to.exist
              cb()
            },
          })
        }),
      },
      {
        register: sendEmail,
        options: {
          from: 'no-reply@bla.com',
          app: {
            title: 'Foo',
            host: 'foo.com',
          },
        },
      },
    ])
    .then(() => {
      return server.methods.sendEmail({
        templateName: 'email-verification-email',
        to: 'sherlock@gmail.com',
        locals: {
          username: 'booo',
          token: 'cwoq0-ejfvn3u43',
        },
      })
    })
  })
})
