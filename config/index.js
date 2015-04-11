'use strict';

var util = require('util');
var convict = require('convict');

var config = convict({
  env: {
    doc: 'The applicaton environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  amqp: {
    login: {
      doc: 'AMQP login.',
      default: 'guest'
    },
    password: {
      doc: 'AMQP password.',
      default: 'guest'
    },
    address: {
      doc: 'AMQP address.',
      default: 'localhost',
      env: 'RABBITMQ_PORT_5672_TCP_ADDR'
    },
    port: {
      doc: 'AMQP port.',
      format: 'port',
      default: '5672',
      env: 'RABBITMQ_PORT_5672_TCP_PORT'
    }
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
config.loadFile(__dirname + '/env/' + env + '.json');

// Adding the calculated values
config.load({
  amqpUrl: util.format('amqp://%s:%s@%s:%s',
                         config.get('amqp.login'),
                         config.get('amqp.password'),
                         config.get('amqp.address'),
                         config.get('amqp.port'))
});

// perform validation
config.validate();

module.exports = config;