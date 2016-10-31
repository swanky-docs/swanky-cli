const utils = require('../lib/utils')
const extend = require('deep-extend')

module.exports = function(file, config, fs, cb) {

  fs.writeJSON(utils.destinationPath(config.basePath, file.src),
    extend(fs.readJSON(utils.destinationPath(config.basePath, file.src), {}), file.obj))

  cb();
}
