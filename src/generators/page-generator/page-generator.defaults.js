'use strict'

module.exports = {
  PREPROCESSORS: [
    {
      name: 'None',
      value: null
    },
    {
      name: 'NgDocs (Angular flavoured JSDocs)',
      value: 'swanky-processor-ngdocs'
    }
  ],
  PACKAGES: {
    'swanky-processor-ngdocs': {
      version: '2.2.3'
    }
  },
  TEMPLATES: {
    'swanky-processor-ngdocs': {
      name: 'swanky-processor-ngdocs.js',
      extension: '.js'
    },
    default: {
      name: 'default.md',
      extension: '.md'
    }
  }
}
