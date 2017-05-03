'use strict'

module.exports = {
  PREPROCESSORS: [
    {
      name: 'None',
      value: null
    },
    {
      name: 'JSDoc',
      value: 'swanky-processor-jsdoc'
    }
  ],
  PACKAGES: {
    'swanky-processor-jsdoc': {
      version: '1.1.2'
    }
  },
  TEMPLATES: {
    'swanky-processor-jsdoc': {
      name: 'swanky-processor-jsdoc.js',
      extension: '.js'
    },
    default: {
      name: 'default.md',
      extension: '.md'
    }
  }
}
