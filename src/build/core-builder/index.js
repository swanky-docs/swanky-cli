const async = require('async')
const path = require('path')
const BaseBuilder = require('../base-builder')
const buildConfig = require('./build-config.js')

/**
 * Core Builder
 * @param {Object} config - user setup configuration
 * @param {Object} fs - in memory file system
 * @constructor
 */
function CoreBuilder(config, fs) {
  // super
  BaseBuilder.call(this, config, fs)

  this.buildConfig = buildConfig(config)
  this.templateDirectory = path.join(__dirname, 'templates')

  this.build = function(callback) {
    async.series([
      (cb) => this.writeTemplates(false, cb),
      (cb) => this.writeFiles(false, cb)
    ], () => {
      this.startSpinner('copying core files')
      this.stopSpinner()
      callback()
    })
  }
}

// Sub-class using BaseBuilder
CoreBuilder.prototype = Object.create(BaseBuilder.prototype)

module.exports = CoreBuilder