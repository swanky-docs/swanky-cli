const fs = require('fs')
const path = require('path')

module.exports = {
  getCurrentDirectoryBase: function () {
    return path.basename(process.cwd())
  },
  directoryExists: function (filePath) {
    try {
      return fs.statSync(filePath).isDirectory();
    } catch (err) {
      return false
    }
  },
  templatePath: function(dirname, fileName) {
    return path.join(dirname, 'templates', fileName)
  },
  destinationPath: function(fileName) {
    return path.join(process.cwd(), fileName)
  }
}
