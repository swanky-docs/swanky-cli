const path = require('path')

module.exports = {
  getCurrentDirectoryBase: function () {
    return path.basename(process.cwd())
  },
  templatePath: function(dirname, fileName) {
    return path.join(dirname, 'templates', fileName)
  },
  destinationPath: function(fileName) {
    return path.join(process.cwd(), fileName)
  }
}
