const defaults = require('../../lib/defaults')

module.exports = function() {
  return {
    [defaults.SWANKY_PROCESSOR_NGDOCS.NAME]: {
      src: 'package.json',
      obj: {
        devDependencies: {
          [defaults.SWANKY_PROCESSOR_NGDOCS.NAME]: defaults.SWANKY_PROCESSOR_NGDOCS.VERSION
        }
      }
    },
    [defaults.SWANKY_PROCESSOR_JSDOCS.NAME]: {
      src: 'package.json',
      obj: {
        devDependencies: {
          [defaults.SWANKY_PROCESSOR_JSDOCS.NAME]: defaults.SWANKY_PROCESSOR_JSDOCS.VERSION
        }
      }
    }
  }
}
