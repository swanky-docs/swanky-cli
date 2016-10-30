const utils = require('../lib/utils')
const extend = require('deep-extend')

module.exports = function(config, fs, cb) {
  let file = fs.readJSON(utils.destinationPath(config.src), {})

  extend(file, config.obj)

  fs.writeJSON(utils.destinationPath(config.src), file)

  cb();
}
