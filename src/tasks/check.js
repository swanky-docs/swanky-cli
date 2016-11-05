const request = require('request')
const semver = require('semver')
const chalk = require('chalk')
const packageConfig = require('../../package.json')
const logger = require('../lib/logger')

module.exports = function (done) {
  // Parse version number from strings such as 'v4.2.0' or `>=4.0.0'
  function parseVersionNumber (versionString) {
    return parseFloat(versionString.replace(/[^\d\.]/g, ''))
  }

  // Ensure minimum supported node version is used
  const minNodeVersion = parseVersionNumber(packageConfig.engines.node)
  const currentNodeVersion = parseVersionNumber(process.version)

  if (minNodeVersion > currentNodeVersion) {
    return console.log(chalk.red(
      '  You must upgrade node to >=' + minNodeVersion + '.x to use swanky-cli'
    ))
  }

  request({
    url: 'https://registry.npmjs.org/swanky-cli',
    timeout: 1000
  }, function (err, res, body) {
    if (!err && res.statusCode === 200) {
      const latestVersion = JSON.parse(body)['dist-tags'].latest
      const localVersion = packageConfig.version

      if (semver.lt(localVersion, latestVersion)) {
        logger.head('A newer version of swanky-cli is available.')
        console.log('latest:    ' + chalk.green(latestVersion))
        console.log('installed: ' + chalk.red(localVersion))
      }
    }
    done()
  })
}