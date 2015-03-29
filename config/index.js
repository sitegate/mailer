'use strict';

var convict = require('convict');

var config = convict({
  env: {
    doc: 'The applicaton environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  amqpURL: {
    doc: 'AMQP endpoint.',
    default: 'amqp://guest:guest@localhost:5672',
    env: 'AMQP_URL'
  },
  mailer: {
    from: {
      default: '',
      env: 'MAILER_FROM'
    },
    options: {
      service: {
        default: '',
        env: 'MAILER_SERVICE_PROVIDER'
      },
      auth: {
        user: {
          default: '',
          env: 'MAILER_EMAIL_ID'
        },
        pass: {
          default: '',
          env: 'MAILER_PASSWORD'
        }
      }
    }
  }
});

// load environment dependent configuration
var env = config.get('env');
config.loadFile('./config/env/' + env + '.json');

// perform validation
config.validate();

module.exports = config;