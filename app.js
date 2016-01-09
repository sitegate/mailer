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
  },
], err => {
  if (err) throw err

  server.start(() => console.log('Service started'))
})
