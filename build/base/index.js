const async = require('async')
const writeTemplate = require('../../tasks/write-template')
const writeFile = require('../../tasks/write-file')

module.exports = function(config, fs, callback) {
  const templateConfig = require('./template-config.js')(config)

  // -----------------------------------------------------
  // Templates
  // -----------------------------------------------------
  async.series([
    // Write templates
    function(callback) {
      async.eachLimit(templateConfig.templates, 1, function(template, cb) {
        writeTemplate(__dirname, template, config, false, fs, cb)
      }, callback)
    },
    // Write files
    function(callback) {
      async.eachLimit(templateConfig.files, 1, function(file, cb) {
        writeFile(__dirname, file, config, false, fs, cb)
      }, callback)
    }
  ], callback)

}
