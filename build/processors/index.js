const async = require('async')
const extendFile = require('../../tasks/extend-file')
const templateConfigBuilder = require('./template-config.js')

module.exports = function(config, fs, callback) {
  const templateConfig = templateConfigBuilder();

  async.series([
    // Extend files
    async.apply(extendFiles, config.processors, templateConfig, fs)
  ], callback)
}

function extendFiles(processors, template, fs, callback) {
  async.eachLimit(processors, 1, function(processor, cb) {
    extendFile(template[processor], fs, cb)
  }, callback)
}