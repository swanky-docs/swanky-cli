const utils = require('../lib/utils')
const confirmOverwrite = require('../lib/confirm-overwrite')

module.exports = function(basePath, template, config, overwrite, fs, cb) {
  function writeTemplate() {
    fs.copyTpl(
      utils.templatePath(basePath, template.src),
      utils.destinationPath(config.basePath, template.dest),
      config
    )

    cb()
  }

  if(!fs.exists(utils.destinationPath(config.basePath, template.dest)) || overwrite) {
    writeTemplate()
  } else {
    confirmOverwrite(template.dest, function(shouldOverwrite) {
      if (shouldOverwrite) {
        writeTemplate()
      } else {
        cb()
      }
    })
  }
}
