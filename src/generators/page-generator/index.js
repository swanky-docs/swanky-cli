'use strict'

const Promise = require('bluebird')
const memFs = require('mem-fs')
const editor = require('mem-fs-editor')

// In Memory File System
const store = memFs.create()
const fs = editor.create(store)

// Builders
const PageBuilder = require('../../builders/page-builder/index')

// Tasks
const readConfig = require('../../tasks/read-config')
const install = require('../../tasks/install')

// Utils
const logger = require('../../utils/logger')

// Config
const buildConfigGenerator = require('./page-generator.config')

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
  const pageBuilder = new PageBuilder(answers, buildConfig, fs)


  return pageBuilder.build()
    .then(commitFiles, handleError)
    .then(() => install())
    .finally(() => {
      logger.success(`New page created successfully.\n`)
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
  logger.warning(`Warning: page not created\n`)
}

