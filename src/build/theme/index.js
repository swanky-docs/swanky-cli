const async = require('async')
const download = require('download-git-repo')
const os = require('os')
const uid = require('uid')
const rm = require('rimraf').sync
const ora = require('ora')
const logger = require('../../lib/logger')
const writeThemeTemplate = require('../../tasks/write-theme-template')
const templateConfigBuilder = require('./template-config.js')

module.exports = function(config, fs, callback) {
  const tmp = os.tmpdir() + '/swanky-docs-theme-template-' + uid()
  const templateConfig = templateConfigBuilder(config, tmp)

  async.series([
    async.apply(downloadAndGenerate, config.theme, tmp),
    // Write theme templates
    async.apply(writeThemeTemplates, templateConfig.files, config, fs)
  ], callback)
}

/**
 * Download a generate from a template repo.
 *
 * @param {String} theme
 */

function downloadAndGenerate (theme, tmp, callback) {

  const spinner = ora('downloading theme template')

  if (process.env.NODE_ENV !== 'test') {
    spinner.start()
  }

  download('swanky-docs/swanky-theme', tmp, { clone: false }, function (err) {
    spinner.stop()

    process.on('exit', function () {
      rm(tmp)
    })

    if (err) {
      logger.fatal('Failed to download ' + theme + 'theme: ' + err.message.trim())
    }
    callback();
  })
}

function writeThemeTemplates(files, config, fs, callback) {
  async.eachLimit(files, 1, function(file, cb) {
    writeThemeTemplate(file, config, false, fs, cb)
  }, callback)
}