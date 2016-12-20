'use strict'

const Promise = require('bluebird')
const BaseBuilder = require('../base-builder')

/**
 * Snippet Builder
 * @param {Object} config - user setup configuration
 * @param {Object} fs - in memory file system
 * @constructor
 */
function SnippetBuilder(config, buildConfig, fs) {
  // super
  BaseBuilder.call(this, config, buildConfig, fs)

  this.build = function () {
    return this.writeFiles(false)
      .then(() => {
        // console.log(buildConfig)
        if (buildConfig.yaml) {
          return this.writeYamlFiles(true)
        } else if (buildConfig.json) {
          return this.writeJSONFiles(true)
        } else {
          return Promise.resolve()
        }
      })
  }
}

// Sub-class using BaseBuilder
SnippetBuilder.prototype = Object.create(BaseBuilder.prototype)

module.exports = SnippetBuilder