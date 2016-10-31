const utils = require('../lib/utils')

module.exports = function(file, config, fs, cb) {
  fs.delete(utils.destinationPath(config.basePath, file.dest));

  cb();
}
