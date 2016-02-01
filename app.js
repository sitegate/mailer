'use strict'
require('./app') //i18n configuration
const config = require('./config')
const jimbo = require('jimbo')

let server = jimbo()

server.connection({
  channel: 'sitegate-mailer',
  amqpURL: config.get('amqpURI'),
})

server.register([
  {
    register: require('./app/smtp-transport'),
    options: config.get('mailer.options'),
  },
  {
    register: require('./app/send-email'),
    options: {
      app: config.get('app'),
      from: config.get('from'),
    },
  },
])
.then(() => server.start(() => console.log('Service started')))
.catch(err => {throw err})
