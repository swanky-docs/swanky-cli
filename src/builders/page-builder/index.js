'use strict'

const Promise = require('bluebird')
const BaseBuilder = require('../base-builder')

/**
 * Page Builder
 * @param {Object} config - user setup configuration
 * @param {Object} fs - in memory file system
 * @constructor
 */
function PageBuilder(config, buildConfig, fs) {
  // super
  BaseBuilder.call(this, config, buildConfig, fs)

  this.build = function () {
    return this.writeTemplates(false)
      .then(() => {
        if (buildConfig.yaml) {
          return this.writeYamlFiles(true)
        } else {
          return this.writeJSONFiles(true)
        }
      })
      .then(() => {
        if (buildConfig.extend) {
          return this.extendFiles()
        } else {
          return Promise.resolve()
        }
      })
  }
}

// Sub-class using BaseBuilder
PageBuilder.prototype = Object.create(BaseBuilder.prototype)

module.exports = PageBuilder