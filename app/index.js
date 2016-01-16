'use strict'
const i18n = require('i18next')
const path = require('path')

// Registering i18n
i18n.init({
  fallbackLng: 'en',
  resGetPath: path.resolve(__dirname, '..') + '/locales/__lng__/__ns__.json',
})
