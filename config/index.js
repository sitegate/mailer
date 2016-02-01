'use strict'
const util = require('util')
const fs = require('fs')
const yamlOrJSON = require('yaml-or-json')
const convict = require('convict')

let config = convict({
  env: {
    doc: 'The applicaton environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  from: {
    default: 'no-reply@example.com',
  },
  mailer: {
    options: {
      service: {
        default: '',
        env: 'MAILER_SERVICE_PROVIDER',
      },
      auth: {
        user: {
          default: '',
          env: 'MAILER_EMAIL_ID',
        },
        pass: {
          default: '',
          env: 'MAILER_PASSWORD',
        },
        api_key: {
          default: '',
          env: 'MAILER_API_KEY',
        },
        domain: {
          default: '',
          env: 'MAILER_DOMAIN',
        },
      },
    },
  },
  app: {
    default: 'sitegate',
  },
  amqp: {
    login: {
      doc: 'AMQP login.',
      default: 'guest',
    },
    password: {
      doc: 'AMQP password.',
      default: 'guest',
    },
    address: {
      doc: 'AMQP address.',
      default: 'localhost',
      env: 'RABBITMQ_PORT_5672_TCP_ADDR',
    },
    port: {
      doc: 'AMQP port.',
      format: 'port',
      default: '5672',
      env: 'RABBITMQ_PORT_5672_TCP_PORT',
    },
  },
});

// load environment dependent configuration
let env = config.get('env')
let filePath = __dirname + '/env/' + env
let configFile
try {
  configFile = yamlOrJSON(filePath) || {}
} catch (err) {
  configFile = {}
}

config.load(configFile)

// Adding the calculated values
config.load({
  amqpURI: util.format(
    'amqp://%s:%s@%s:%s',
    config.get('amqp.login'),
    config.get('amqp.password'),
    config.get('amqp.address'),
    config.get('amqp.port')
  ),
});

// perform validation
config.validate()

module.exports = config
