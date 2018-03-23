'use strict'

const Promise = require('bluebird')
const download = require('download-git-repo')
const rm = require('rimraf').sync
const BaseBuilder = require('../base-builder')

/**
 * ThemeBuilder
 * @param {Object} config - user setup configuration
 * @param {Object} fs - in memory file system
 * @constructor
 */
function ThemeBuilder(config, buildConfig, fs) {
  // super
  BaseBuilder.call(this, config, buildConfig, fs)

  this.build = function () {
    return this.downloadAndGenerate()
      .then(() => {
        return this.writeFiles(false)
      })
      // Last step update swanky config
      .then(() => {
        if (buildConfig.yaml) {
          return this.writeYamlFiles(true)
        } else if (buildConfig.json) {
          return this.writeJSONFiles(true)
        }

        return Promise.resolve()
      })
  }
}

// Sub-class using BaseBuilder
ThemeBuilder.prototype = Object.create(BaseBuilder.prototype)

/**
 * Download a generate theme from a template repo.
 */
ThemeBuilder.prototype.downloadAndGenerate = function() {
  return new Promise((resolve) => {
    // this.startSpinner('downloading theme template')

    download(this.buildConfig.themeTemplate, this.buildConfig.templateDirectory, { clone: false }, (err) => {
      // this.stopSpinner()

      // Cleanup temporary theme files on exit
      process.on('exit', () => {
        rm(this.buildConfig.templateDirectory)
      })

      if (err) {
        this.logger.fatal('Failed to download ' + this.config.theme + 'theme: ' + err.message.trim())
      }

      resolve()
    })
  })
}

module.exports = ThemeBuilder