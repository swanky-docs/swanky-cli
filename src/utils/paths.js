'use strict'

const path = require('path')

module.exports = {
  getCurrentDirectoryBase: function () {
    return path.basename(process.cwd())
  },
  templatePath: function(dirname, fileName) {
    return path.join(dirname, fileName)
  },
  destinationPath: function(dirname, fileName) {
    return path.join(dirname, fileName)
  }
}
