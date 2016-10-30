const async = require('async')
const extendFile = require('../../tasks/extend-file')

module.exports = function(config, fs, callback) {
  const templateConfig = require('./template-config.js')()

  async.series([
    function(callback) {
      async.eachLimit(config.processors, 1, function(processor, cb) {
        extendFile(templateConfig[processor], fs, cb)
      }, callback)
    }
  ], callback)
}
