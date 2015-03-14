'use strict';

var bo = require('bograch');
var AmqpProvider = require('bograch-amqp');
var config = require('./config/config');
var i18n = require('i18next');

// Registering i18n
i18n.init({
  fallbackLng: 'en'
});

// Initialize Bograch
bo.use(new AmqpProvider({
  amqpURL: config.amqpURL
}));

var worker = bo.worker('amqp');

var routes = require('./app/routes');
routes(worker);

console.log('Mailer microservice started');