'use strict'

require('./app') //i18n configuration
const jimbo = require('jimbo')

let server = new jimbo.Server()

server.connection({
  channel: 'sitegate-mailer',
  url: 'amqp://guest:guest@localhost:5672',
})

server.register([
  {
    register: require('./app/send-email'),
  },
], err => {
  if (err) throw err

  server.start(() => console.log('Service started'))
})
