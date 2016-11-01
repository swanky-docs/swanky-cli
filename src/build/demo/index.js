const async = require('async')
const extendFile = require('../../tasks/extend-file')
const removeFile = require('../../tasks/remove-file')
const writeTemplate = require('../../tasks/write-template')
const writeFile = require('../../tasks/write-file')
const templateConfigBuilder = require('./template-config.js')

module.exports = function(config, fs, callback) {
  const templateConfig = templateConfigBuilder(config)

  if(!config.demo) {
    callback()
  } else {

    // -----------------------------------------------------
    // Templates
    // -----------------------------------------------------
    async.series([
      // Remove files
      async.apply(removeFiles, templateConfig.remove, config, fs),
      // Write templates
      async.apply(writeTemplates, templateConfig.templates, config, fs),
      // Write files
      async.apply(writeFiles, templateConfig.files, config, fs),
      // Extend files
      async.apply(extendFiles, templateConfig.extends, config, fs)
    ], callback)
  }
}

function removeFiles(files, config, fs, callback) {
  async.eachLimit(files, 1, function(file, cb) {
    removeFile(file, config, fs, cb)
  }, callback)
}

function writeTemplates(templates, config, fs, callback) {
  async.eachLimit(templates, 1, function(template, cb) {
    writeTemplate(__dirname, template, config, true, fs, cb)
  }, callback)
}

function writeFiles(files, config, fs, callback) {
  async.eachLimit(files, 1, function(file, cb) {
    writeFile(__dirname, file, config, true, fs, cb)
  }, callback)
}

function extendFiles(files, config, fs, callback) {
  async.eachLimit(files, 1, function(file, cb) {
    extendFile(file, config, fs, cb)
  }, callback)
}