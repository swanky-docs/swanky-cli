'use strict'

module.exports = {
  NAME: 'Swanky Docs',
  SOURCE: 'src',
  OUTPUT: 'docs',
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
  THEMES: [
    {
      name: 'Default',
      value: 'swanky-docs/swanky-theme'
    }
  ],
  SWANKY_PROCESSOR_NGDOCS: {
    NAME: 'swanky-processor-jsdoc',
    VERSION: '1.1.2'
  }
}
