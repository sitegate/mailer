'use strict';

var bo = require('bograch');
var AmqpTransporter = require('bograch-amqp');
var config = require('./config/config');
var i18n = require('i18next');

// Registering i18n
i18n.init({
  fallbackLng: 'en'
});

// Initialize Bograch
bo.use(new AmqpTransporter({
  amqpURL: config.amqpURL
}));

var server = bo.server('amqp', {
  name: 'mailer'
});

var routes = require('./app/routes');
routes(server);

console.log('Mailer microservice started');