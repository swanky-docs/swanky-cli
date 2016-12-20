'use strict'

const Promise = require('bluebird')
const request = require('request')
const semver = require('semver')
const chalk = require('chalk')
const packageConfig = require('../../package.json')
const logger = require('../utils/logger')

module.exports = function () {

  return new Promise((resolve) => {
    const config = {}

    // Parse version number from strings such as 'v4.2.0' or `>=4.0.0'
    function parseVersionNumber(versionString) {
      return parseFloat(versionString.replace(/[^\d.]/g, ''))
    }

    // Ensure minimum supported node version is used
    config.minNodeVersion = parseVersionNumber(packageConfig.engines.node)
    config.currentNodeVersion = parseVersionNumber(process.version)

    if (config.minNodeVersion > config.currentNodeVersion) {
      resolve(console.log(chalk.red('  You must upgrade node to >=' + config.minNodeVersion + '.x to use swanky-cli')))
    }

    request({
      url: 'https://registry.npmjs.org/swanky-cli',
      timeout: 1000
    }, function (err, res, body) {
      if (!err && res.statusCode === 200) {
        config.latestVersion = JSON.parse(body)['dist-tags'].latest
        config.localVersion = packageConfig.version

        if (semver.lt(config.localVersion, config.latestVersion)) {
          logger.head('A newer version of swanky-cli is available.')
          console.log('» latest:    ' + chalk.green(config.latestVersion))
          console.log('» installed: ' + chalk.red(config.localVersion))
        }
      }

      resolve(config)
    })
  })
}