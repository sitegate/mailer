'use strict';

var Server = require('uva-amqp').Server;
var config = require('./config');
var i18n = require('i18next');

// Registering i18n
i18n.init({
  fallbackLng: 'en'
});

var server = new Server({
  channel: 'mailer',
  url: config.get('amqpUrl')
});

var routes = require('./app/routes');
routes(server);

console.log('Mailer microservice started');
