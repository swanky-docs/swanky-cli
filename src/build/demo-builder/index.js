const async = require('async')
const path = require('path')
const BaseBuilder = require('../base-builder')
const buildConfig = require('./build-config.js')

/**
 * Demo Builder
 * @param {Object} config - user setup configuration
 * @param {Object} fs - in memory file system
 * @constructor
 */
function DemoBuilder(config, fs) {
  // super
  BaseBuilder.call(this, config, fs)

  this.buildConfig = buildConfig(config)
  this.templateDirectory = path.join(__dirname, 'templates')

  this.build = function(callback) {
    this.startSpinner('generating demo')

    async.series([
      (cb) => this.removeFiles(cb),
      (cb) => this.writeTemplates(true, cb),
      (cb) => this.writeFiles(true, cb),
      (cb) => this.extendFiles(cb)
    ], () => {
      this.stopSpinner()
      callback()
    })
  }
}

// Sub-class using BaseBuilder
DemoBuilder.prototype = Object.create(BaseBuilder.prototype)

module.exports = DemoBuilder