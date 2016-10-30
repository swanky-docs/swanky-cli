const async = require('async')
const download = require('download-git-repo')
const os = require('os')
const uid = require('uid')
const rm = require('rimraf').sync
const ora = require('ora')
const utils = require('../../lib/utils')
const writeThemeTemplate = require('../../tasks/write-theme-template')

module.exports = function(config, fs, callback) {
  const tmp = os.tmpdir() + '/swanky-docs-theme-template-' + uid()
  const templateConfig = require('./template-config.js')(config, tmp)

  async.series([
    function(callback) {
      downloadAndGenerate(config.theme, tmp, callback)
    },
    function(callback) {
      async.eachLimit(templateConfig.files, 1, function(file, cb) {
        writeThemeTemplate(file, config, false, fs, cb)
      }, callback)
    }
  ], callback)
}

/**
 * Download a generate from a template repo.
 *
 * @param {String} theme
 */

function downloadAndGenerate (theme, tmp, callback) {

  const spinner = ora('downloading theme template')

  spinner.start()

  download('swanky-docs/swanky-theme', tmp, { clone: false }, function (err) {
    spinner.stop()

    process.on('exit', function () {
      rm(tmp)
    })

    if (err) logger.fatal('Failed to download ' + theme + 'theme: ' + err.message.trim())
    callback();
  })
}
