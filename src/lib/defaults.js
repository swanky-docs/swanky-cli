module.exports = {
  NAME: 'Swanky Docs',
  SOURCE: 'src',
  OUTPUT: 'docs',
  PROCESSORS: [
    {
      name: 'JSDocs',
      value: 'js-docs'
    },
    {
      name: 'NgDocs (Angular flavoured JSDocs)',
      value: 'swanky-processor-ngdocs'
    }
  ],
  JS_FRAMEWORKS: [
    {
      name: 'None',
      value: null
    },
    {
      name: 'AngularJs 1.x',
      value: 'angular'
    },
    {
      name: 'VueJs 2.x',
      value: 'vue'
    }
  ],
  THEMES: [
    {
      name: 'Default',
      value: 'swanky-docs/swanky-theme'
    },
    {
      name: 'Simple',
      value: 'swanky-docs/swanky-theme'
    }
  ],
  ANGULAR_JS: {
    NAME: 'angular',
    VERSION: '^1.5.8'
  },
  SWANKY_PROCESSOR_NGDOCS: {
    NAME: 'swanky-processor-ngdocs',
    VERSION: '2.1.0'
  },
  SWANKY_PROCESSOR_JSDOCS: {
    NAME: 'swanky-processor-jsdocs',
    VERSION: '1.0.0'
  }
}
