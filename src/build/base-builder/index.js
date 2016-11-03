const async = require('async')
const chalk = require('chalk')
const extend = require('deep-extend')
const ora = require('ora')
const utils = require('../../lib/utils')
const logger = require('../../lib/logger')
const confirmOverwrite = require('../../lib/confirm-overwrite')

/**
 * Base Builder
 * @param {Object} config - user setup configuration
 * @param {Object} fs - in memory file system
 * @constructor
 */
function BaseBuilder(config, fs) {
  this.config = config
  this.fs = fs
  this.utils = utils
  this.logger = logger
  this.buildConfig = {}
  this.templateDirectory = ''
  this.spinner = ora('')
}

BaseBuilder.prototype.startSpinner = function(msg) {
  if(process.env.NODE_ENV !== 'test') {
    this.spinner.text = msg
    this.spinner.start()
  }
}

BaseBuilder.prototype.stopSpinner = function() {
  if(process.env.NODE_ENV !== 'test') {
    this.spinner.stopAndPersist(chalk.green('✓'))
  }
}

/**
 * Remove Filed
 * @param callback
 */
BaseBuilder.prototype.removeFiles = function(callback) {
  async.eachLimit(this.buildConfig.remove, 1, (file, cb) => {
    this.removeFile(file, cb)
  }, callback)
}

/**
 * Write Templates
 * @param {Boolean} overwrite - should overwrite file or prompt user
 * @param {Function} callback
 */
BaseBuilder.prototype.writeTemplates = function(overwrite, callback) {
  async.eachLimit(this.buildConfig.templates, 1, (file, cb) => {
    this.writeTemplate(file, overwrite, cb)
  }, callback)
}

/**
 * Write Files
 * @param {Boolean} overwrite - should overwrite file or prompt user
 * @param {Function} callback
 */
BaseBuilder.prototype.writeFiles = function(overwrite, callback) {
  async.eachLimit(this.buildConfig.files, 1, (file, cb) => {
    this.writeFile(file, overwrite, cb)
  }, callback)
}

/**
 * Extend Files
 * @param callback
 */
BaseBuilder.prototype.extendFiles = function(callback) {
  async.eachLimit(this.buildConfig.extends, 1, (file, cb) => {
    this.extendFile(file, cb)
  }, callback)
}

/**
 * Extend File
 * @param file
 * @param cb
 */
BaseBuilder.prototype.extendFile = function(file, cb) {
  this.fs.writeJSON(utils.destinationPath(this.config.basePath, file.src),
    extend(this.fs.readJSON(utils.destinationPath(this.config.basePath, file.src), {}), file.obj))
  cb();
}

/**
 * Write File
 * @param file
 * @param overwrite
 * @param cb
 */
BaseBuilder.prototype.writeFile = function(file, overwrite, cb) {
  const writeFile = () => {
    this.fs.copy(
      utils.templatePath(this.templateDirectory, file.src),
      utils.destinationPath(this.config.basePath, file.dest)
    )
    cb()
  }

  const filePath = utils.destinationPath(this.config.basePath, file.dest)

  if(!this.fs.exists(filePath) || overwrite) {
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

/**
 * Write Template
 * @param template
 * @param overwrite
 * @param cb
 */
BaseBuilder.prototype.writeTemplate = function(template, overwrite, cb) {

  const writeTemplate = () => {
    this.fs.copyTpl(
      utils.templatePath(this.templateDirectory, template.src),
      utils.destinationPath(this.config.basePath, template.dest),
      this.config
    )
    cb()
  }

  const templatePath = utils.destinationPath(this.config.basePath, template.dest)

  if(!this.fs.exists(templatePath) || overwrite) {
    writeTemplate()
  } else {
    confirmOverwrite(template.dest, (shouldOverwrite) => {
      if (shouldOverwrite) {
        writeTemplate()
      } else {
        cb()
      }
    })
  }
}

/**
 * Remove File
 * @param file
 * @param cb
 */
BaseBuilder.prototype.removeFile = function(file, cb) {
  this.fs.delete(utils.destinationPath(this.config.basePath, file.dest));
  cb();
}

module.exports = BaseBuilder