'use strict'

const Promise = require('bluebird')
const memFs = require('mem-fs')
const editor = require('mem-fs-editor')

// In Memory File System
const store = memFs.create()
const fs = editor.create(store)

// Builders
const SiteBuilder = require('../../builders/site-builder')

// Tasks
const install = require('../../tasks/install')

// Utils
const logger = require('../../utils/logger')

// Config
const buildConfigGenerator = require('./site-generator.config')

/**
 * Read config file and start orchestration of the build
 * @param {Object} answers
 * @param {String} basePath
 * @returns {Promise}
 */
module.exports = function(answers, basePath) {
  return run(answers, basePath)
}

/**
 * Run the build
 * @param {Object} answers
 * @param {String} basePath
 * @param {Object} config - Swanky config file contents
 */
function run(answers, basePath) {
  const buildConfig = buildConfigGenerator(answers, basePath)
  const siteBuilder = new SiteBuilder(answers, buildConfig, fs)

  return siteBuilder.build()
    .then(commitFiles, handleError)
    .then(() => install())
    .finally(() => {
      logger.success(`new site created successfully\n`)
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
function handleError(err) {
  console.log(err)
  logger.warning(`warning: site not created\n`)
}

