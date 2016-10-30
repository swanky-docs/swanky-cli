const utils = require('../lib/utils')
const confirmOverwrite = require('../lib/confirm-overwrite')

module.exports = function(file, config, overwrite, fs, cb) {
  function writeFile() {
    fs.copy(
      file.src,
      utils.destinationPath(file.dest)
    )

    cb()
  }

  if(!fs.exists(utils.destinationPath(file.dest)) || overwrite) {
    writeFile()
  } else {
    confirmOverwrite(file.dest, function(overwrite) {
      if (overwrite) {
        writeFile()
      } else {
        cb()
      }
    })
  }
}
