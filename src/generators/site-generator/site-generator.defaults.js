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
      name: 'NgDocs (Angular flavoured JSDocs)',
      value: 'swanky-processor-ngdocs'
    }
  ],
  THEMES: [
    {
      name: 'Default',
      value: 'swanky-docs/swanky-theme'
    }
  ],
  SWANKY_PROCESSOR_NGDOCS: {
    NAME: 'swanky-processor-ngdocs',
    VERSION: '2.2.3'
  }
}
