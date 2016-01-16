'use strict'
require('./app') //i18n configuration
const config = require('./config')
const jimbo = require('jimbo')

let server = new jimbo.Server()

server.connection({
  channel: 'sitegate-mailer',
  url: config.get('amqpURI'),
})

server.register([
  {
    register: require('./app/send-email'),
    options: config.get('mailer.options'),
  },
  {
    register: require('./app/send-email'),
    options: {
      app: config.get('app'),
      from: config.get('from'),
    },
  },
], err => {
  if (err) throw err

  server.start(() => console.log('Service started'))
})
