'use strict';

var bo = require('bograch');
var amqpTransport = require('bograch-amqp');
var config = require('./config');
var i18n = require('i18next');

// Registering i18n
i18n.init({
  fallbackLng: 'en'
});

// Initialize Bograch
bo.use(amqpTransport);

var server = bo.server('amqp', {
  name: 'mailer',
  amqpURL: config.get('amqpUrl')
});

var routes = require('./app/routes');
routes(server);

server.start();

console.log('Mailer microservice started');