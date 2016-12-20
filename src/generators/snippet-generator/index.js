'use strict'

const Promise = require('bluebird')
const memFs = require('mem-fs')
const editor = require('mem-fs-editor')

// In Memory File System
const store = memFs.create()
const fs = editor.create(store)

// Builders
const SnippetBuilder = require('../../builders/snippet-builder/index')

// Tasks
const readConfig = require('../../tasks/read-config')

// Utils
const logger = require('../../utils/logger')

// Config
const buildConfigGenerator = require('./snippet-generator.config')

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
  const snippetBuilder = new SnippetBuilder(answers, buildConfig, fs)

  return snippetBuilder.build()
    .then(commitFiles, handleError)
    .finally(() => {
      logger.success(`New snippet created successfully.\n`)
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
  logger.warning(`Warning: snippet not created\n`)
}

