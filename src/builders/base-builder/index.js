'use strict'

const Promise = require('bluebird')
const yaml = require('js-yaml')
const chalk = require('chalk')
const deepExtend = require('deep-extend')
const ora = require('ora')
const utils = require('../../utils/paths')
const logger = require('../../utils/logger')
const confirm = require('../../tasks/confirm')

/**
 * Base Builder
 * @param {Object} config - user setup configuration
 * @param {Object} fs - in memory file system
 * @constructor
 */
function BaseBuilder(config, buildConfig, fs) {
  this.fs = fs
  this.utils = utils
  this.logger = logger
  this.config = config
  this.buildConfig = buildConfig
  this.templateDirectory = ''
  this.spinner = ora('')
}

/**
 * Start progress spinner
 */
BaseBuilder.prototype.startSpinner = function(msg) {
  this.spinner.text = msg
  this.spinner.start()
}

/**
 * Stop progress spinner
 */
BaseBuilder.prototype.stopSpinner = function() {
  this.spinner.stopAndPersist(chalk.green('✓'))
}

/**
 * Remove Files
 * @returns {Promise}
 */
BaseBuilder.prototype.removeFiles = function() {
  return Promise.map(this.buildConfig.remove,
    (file) => this.removeFile(file), { concurrency: 1 })
}

/**
 * Write Templates
 * @param {Boolean} overwrite - should overwrite file or prompt user
 * @returns {Promise}
 */
BaseBuilder.prototype.writeTemplates = function(overwrite) {
  return Promise.map(this.buildConfig.template,
    (template) => this.writeTemplate(template, overwrite), { concurrency: 1 })
}

/**
 * Write Files
 * @param {Boolean} overwrite - should overwrite file or prompt user
 * @returns {Promise}
 */
BaseBuilder.prototype.writeFiles = function(overwrite) {
  return Promise.map(this.buildConfig.file,
    (file) => this.writeFile(file, overwrite), { concurrency: 1 })
}

/**
 * Write Yaml Files
 * @param {Boolean} overwrite - should overwrite file or prompt user
 * @returns {Promise}
 */
BaseBuilder.prototype.writeYamlFiles = function(overwrite) {
  return Promise.map(this.buildConfig.yaml,
    (extend) => this.writeYamlFile(extend, overwrite), { concurrency: 1 })
}

/**
 * Write contents of JSON file
 * @param {Boolean} overwrite - should overwrite file or prompt user
 * @returns {Promise}
 */
BaseBuilder.prototype.writeJSONFiles = function(overwrite) {
  return Promise.map(this.buildConfig.json,
    (file) => this.writeJSONFile(file, overwrite), { concurrency: 1 })
}

/**
 * Extend Files
 * @returns {Promise}
 */
BaseBuilder.prototype.extendFiles = function() {
  return Promise.map(this.buildConfig.extend,
    (extend) => this.extendFile(extend), { concurrency: 1 })
}

/**
 * Extend File
 * @param extend - object to extend
 * @returns {Promise}
 */
BaseBuilder.prototype.extendFile = function(extend) {
  return new Promise((resolve) => {
    resolve(this.fs.writeJSON(extend.src,
      deepExtend(this.fs.readJSON(extend.src), extend.obj)))
  })
}

/**
 * Write File
 * @param file
 * @param overwrite
 * @returns {Promise}
 */
BaseBuilder.prototype.writeFile = function(file, overwrite) {
  return new Promise((resolve, reject) => {

    const writeFile = () => {
      resolve(this.fs.copy(
        file.src,
        file.dest
      ))
    }

    if (!this.fs.exists(file.dest) || overwrite) {
      writeFile()
    } else {
      confirm(chalk.red(file.dest + ' already exists.') + ' Would you like to overwrite?')
        .then((shouldOverwrite) => {
          if (shouldOverwrite) {
            writeFile()
          } else {
            reject()
          }
        })
    }
  })
}

/**
 * Write Template
 * @param template
 * @param overwrite
 * @returns {Promise}
 */
BaseBuilder.prototype.writeTemplate = function(template, overwrite) {
  return new Promise((resolve, reject) => {

    const writeTemplate = () => {
      resolve(this.fs.copyTpl(
        template.src,
        template.dest,
        this.config
      ))
    }

    if(!this.fs.exists(template.dest) || overwrite) {
      writeTemplate()
    } else {
      confirm(chalk.red(template.dest + ' already exists.') + ' Would you like to overwrite?')
        .then((answers) => {
          if (answers.confirm) {
            writeTemplate()
          } else {
            reject()
          }
        })
    }
  })
}

/**
 * Write YAML File
 * @param file
 * @param overwrite
 * @returns {Promise}
 */
BaseBuilder.prototype.writeYamlFile = function(file, overwrite) {
  return new Promise((resolve, reject) => {

    const writeYamlFile = () => {
      this.fs.write(
        file.dest,
        yaml.safeDump(file.contents)
      )
      resolve()
    }

    if(!this.fs.exists(file.dest) || overwrite) {
      writeYamlFile()
    } else {
      confirm(chalk.red(file.dest + ' already exists.') + ' Would you like to overwrite?')
        .then((answers) => {
          if (answers.confirm) {
            writeYamlFile()
          } else {
            reject()
          }
        })
    }
  })
}

/**
 * Write JSON File
 * @param file
 * @param overwrite
 * @returns {Promise}
 */
BaseBuilder.prototype.writeJSONFile = function(file, overwrite) {
  return new Promise((resolve, reject) => {

    const writeJSONFile = () => {
      resolve(this.fs.write(
        file.dest,
        file.contents
      ))
    }

    if(!this.fs.exists(file.dest) || overwrite) {
      writeJSONFile()
    } else {
      confirm(chalk.red(file.dest + ' already exists.') + ' Would you like to overwrite?')
        .then((answers) => {
          if (answers.confirm) {
            writeJSONFile()
          } else {
            reject()
          }
        })
    }
  })
}

/**
 * Remove File
 * @param file
 * @returns {Promise}
 */
BaseBuilder.prototype.removeFile = function(file) {
  return new Promise((resolve) => {
    resolve(this.fs.delete(utils.destinationPath(this.config.basePath, file.dest)))
  })
}

module.exports = BaseBuilder