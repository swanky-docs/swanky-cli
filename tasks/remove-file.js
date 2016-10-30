const utils = require('../lib/utils')

module.exports = function(file, fs, cb) {
  fs.delete(utils.destinationPath(file.dest));

  cb();
}
