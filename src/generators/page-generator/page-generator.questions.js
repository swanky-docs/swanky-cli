'use strict'

const readConfig = require('../../tasks/read-config')
const DEFAULTS = require('./page-generator.defaults')

module.exports = [
  {
    name: 'hasParent',
    type: 'confirm',
    message: 'Add to existing page:',
    default: true,
    when: hasPages
  },
  {
    name: 'parent',
    type: 'list',
    message: 'Select parent page:',
    default: null,
    choices: getPages,
    when: function (answers) {
      return answers.hasParent
    }
  },
  {
    type: 'list',
    name: 'preprocessor',
    message: 'Preprocessor:',
    choices: DEFAULTS.PREPROCESSORS,
    default: null
  }
]

/**
 * Determine if config has pages defined
 * @param answers
 * @return {Promise} true | false
 */
function hasPages(answers) {
  return getPages(answers).then(function (pages) {
    return !!pages.length
  })
}

/**
 * Get pages from swanky config file
 * @param {Object} answers
 * @return {Promise} pages
 */
function getPages(answers) {
  return readConfig(answers.configPath).then(function (contents) {
    if (contents.sections) {
      return contents.sections.map((section) => section.title)
    } else {
      return []
    }
  })
}