'use strict'

const Promise = require('bluebird')
const memFs = require('mem-fs')
const editor = require('mem-fs-editor')

// In Memory File System
const store = memFs.create()
const fs = editor.create(store)

// Builders
const ThemeBuilder = require('../../builders/theme-builder')

// Tasks
const readConfig = require('../../tasks/read-config')
const install = require('../../tasks/install')

// Utils
const logger = require('../../utils/logger')

// Config
const buildConfigGenerator = require('./theme-generator.config.js')

/**
 * Read config file and start orchestration of the build
 * @param {Array} answers
 * @returns {Promise}
 */
module.exports = function (answers) {
  return readConfig(answers.configPath)
    .then((result) => {
      return run(answers, result)
    })
}

/**
 * Run the build
 * @param {Array} answers
 * @param {Object} config - Swanky config file contents
 */
function run(answers, config) {
  const buildConfig = buildConfigGenerator(answers, config)
  const themeBuilder = new ThemeBuilder(answers, buildConfig, fs)

  return themeBuilder.build()
    .then(commitFiles, handleError)
    .then(() => install())
    .finally(() => {
      logger.success(`new theme created successfully\n`)
    })
}

/**
 * Write the files to disk
 */
function commitFiles() {
  return new Promise((resolve) => {
    fs.commit(() => {
      resolve()
    })
  })
}

/**
 * Handle errors
 */
function handleError() {
  logger.warning(`warning: theme not created\n`)
}

