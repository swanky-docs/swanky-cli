const async = require('async')
const extendFile = require('../../tasks/extend-file')
const removeFile = require('../../tasks/remove-file')
const writeTemplate = require('../../tasks/write-template')
const writeFile = require('../../tasks/write-file')

module.exports = function(config, fs, callback) {
  const templateConfig = require('./template-config.js')(config)

  if(!config.demo) {
    callback()
  } else {

    // -----------------------------------------------------
    // Templates
    // -----------------------------------------------------
    async.series([
      // Remove files
      function(callback) {
        async.eachLimit(templateConfig.remove, 1, function(file, cb) {
          removeFile(file, fs, cb)
        }, callback)
      },
      // Write templates
      function(callback) {
        async.eachLimit(templateConfig.templates, 1, function(template, cb) {
          writeTemplate(__dirname, template, config, true, fs, cb)
        }, callback)
      },
      // Write files
      function(callback) {
        async.eachLimit(templateConfig.files, 1, function(file, cb) {
          writeFile(__dirname, file, config, true, fs, cb)
        }, callback)
      },
      // Extend files
      function(callback) {
        async.eachLimit(templateConfig.extends, 1, function(extend, cb) {
          extendFile(extend, fs, cb)
        }, callback)
      }
    ], callback)
  }

}
