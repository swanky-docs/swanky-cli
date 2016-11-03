const async = require('async')
const path = require('path')
const BaseBuilder = require('../base-builder')
const buildConfig = require('./build-config.js')

/**
 * ProcessorsBuilder
 * @param {Object} config - user setup configuration
 * @param {Object} fs - in memory file system
 * @constructor
 */
function ProcessorsBuilder(config, fs) {
  // super
  BaseBuilder.call(this, config, fs)

  this.buildConfig = {
    extends: buildConfig(config)
  }

  this.templateDirectory = path.join(__dirname, 'templates')

  this.build = function(callback) {
    this.startSpinner('adding processors')

    async.series([
      (cb) => this.extendFiles(cb)
    ], () => {
      this.stopSpinner()
      callback()
    })
  }
}

// Sub-class using BaseBuilder
ProcessorsBuilder.prototype = Object.create(BaseBuilder.prototype)

module.exports = ProcessorsBuilder