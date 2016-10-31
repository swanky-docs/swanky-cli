const utils = require('../lib/utils')
const confirmOverwrite = require('../lib/confirm-overwrite')

module.exports = function(file, config, overwrite, fs, cb) {
  function writeFile() {
    fs.copy(
      file.src,
      utils.destinationPath(config.basePath, file.dest)
    )

    cb()
  }

  if(!fs.exists(utils.destinationPath(config.basePath, file.dest)) || overwrite) {
    writeFile()
  } else {
    confirmOverwrite(file.dest, function(shouldOverwrite) {
      if (shouldOverwrite) {
        writeFile()
      } else {
        cb()
      }
    })
  }
}
