const async = require('async')
const writeTemplate = require('../../tasks/write-template')
const writeFile = require('../../tasks/write-file')
const templateConfigBuilder = require('./template-config.js')

module.exports = function(config, fs, callback) {
  const templateConfig = templateConfigBuilder(config)

  // -----------------------------------------------------
  // Templates
  // -----------------------------------------------------
  async.series([
    // Write templates
    async.apply(writeTemplates, templateConfig.templates, config, fs),
    // Write files
    async.apply(writeFiles, templateConfig.files, config, fs)
  ], callback)
}

function writeTemplates(templates, config, fs, callback) {
  async.eachLimit(templates, 1, function(template, cb) {
    writeTemplate(__dirname, template, config, false, fs, cb)
  }, callback)
}

function writeFiles(files, config, fs, callback) {
  async.eachLimit(files, 1, function(file, cb) {
    writeFile(__dirname, file, config, false, fs, cb)
  }, callback)
}
