const async = require('async')
const path = require('path')
const download = require('download-git-repo')
const os = require('os')
const uid = require('uid')
const rm = require('rimraf').sync
const BaseBuilder = require('../base-builder')
const buildConfig = require('./build-config.js')

/**
 * ThemeBuilder
 * @param {Object} config - user setup configuration
 * @param {Object} fs - in memory file system
 * @constructor
 */
function ThemeBuilder(config, fs) {
  // super
  BaseBuilder.call(this, config, fs)

  // Temporary folder to save downloaded theme template to
  this.templateDirectory = path.join(os.tmpdir(), 'swanky-docs-theme-template-' + uid())

  this.buildConfig = buildConfig(config)

  this.build = function(callback) {
    async.series([
      (cb) => {
        this.downloadAndGenerate(cb)
      },
      (cb) => {
        this.writeFiles(true, cb)
      }
    ], callback)
  }
}

// Sub-class using BaseBuilder
ThemeBuilder.prototype = Object.create(BaseBuilder.prototype)

/**
 * Download a generate theme from a template repo.
 * @param callback
 */
ThemeBuilder.prototype.downloadAndGenerate = function(callback) {
  this.startSpinner('downloading theme template')

  download(this.config.theme, this.templateDirectory, { clone: false }, (err) => {
    this.stopSpinner()

    // Cleanup temporary files on exit
    process.on('exit', () => {
      rm(this.templateDirectory)
    })

    if (err) {
      this.logger.fatal('Failed to download ' + this.config.theme + 'theme: ' + err.message.trim())
    }

    callback()
  })
}

module.exports = ThemeBuilder