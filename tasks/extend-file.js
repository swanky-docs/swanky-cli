const utils = require('../lib/utils')
const extend = require('deep-extend')

module.exports = function(config, fs, cb) {

  fs.writeJSON(utils.destinationPath(config.src),
    extend(fs.readJSON(utils.destinationPath(config.src), {}), config.obj))

  cb();
}
