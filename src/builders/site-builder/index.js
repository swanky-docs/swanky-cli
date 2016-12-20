'use strict'

const Promise = require('bluebird')
const download = require('download-git-repo')
const rm = require('rimraf').sync
const BaseBuilder = require('../base-builder')

/**
 * Site Builder
 * @param {Object} config - user setup configuration
 * @param {Object} fs - in memory file system
 * @constructor
 */
function SiteBuilder(config, buildConfig, fs) {
  // super
  BaseBuilder.call(this, config, buildConfig, fs)

  this.build = function () {
    return this.downloadAndGenerate()
      .then(() => {
        return this.writeTemplates(false)
      })
      .then(() => {
        return this.writeFiles(false)
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
SiteBuilder.prototype = Object.create(BaseBuilder.prototype)

/**
 * Download a generate theme from a template repo.
 */
SiteBuilder.prototype.downloadAndGenerate = function() {
  return new Promise((resolve) => {
    this.startSpinner('downloading theme template')

    download(this.buildConfig.themeTemplate, this.buildConfig.templateDirectory, { clone: false }, (err) => {
      this.stopSpinner()

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

module.exports = SiteBuilder
