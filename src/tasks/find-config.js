'use strict'

const Promise = require('bluebird')
const walk = require('walk')
const fs = require('fs')
const path = require('path')
const ora = require('ora')
const spinner = ora('searching for swanky config.')
const DEFAULTS = require('./../defaults')

/**
 * Find swanky config file
 * @param {String} basePath - root folder to start search from
 * @param {String} defaultConfigPath - location of configuration file
 */
module.exports = function(basePath, defaultConfigPath) {
  return new Promise(function(resolve, reject) {
    spinner.start()

    // 1. First look in root directory for the default (swanky.config.yaml)
    if (fs.existsSync(defaultConfigPath)) {
      spinner.stop()
      resolve(defaultConfigPath)
    } else {
      // 2. Search all files in project directory
      const walker = walk.walk(basePath, { followLinks: false })

      walker.on('file', function (root, stat, next) {
        if (stat.name.indexOf(DEFAULTS.SWANKY_CONFIG_FILE_NAME) > -1) {
          spinner.stop()
          resolve(path.join(root, stat.name))
        } else {
          next()
        }
      })

      walker.on('end', function () {
        spinner.stop()
        reject('no swanky config file found.')
      })
    }

  })
}