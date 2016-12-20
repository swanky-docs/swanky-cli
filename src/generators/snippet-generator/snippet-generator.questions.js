'use strict'

const readConfig = require('../../tasks/read-config')
const path = require('path')


module.exports = [
  {
    name: 'snippetsDirectory',
    type: 'input',
    message: 'Location to create snippets:',
    default: getSnippetsDirectory,
    when: snippetsEntryDoesNotExists
  }
]

/**
 * Check if snippets entry exists in swanky config file
 * @param {Object} answers
 * @return {Boolean}
 */
function snippetsEntryDoesNotExists(answers) {
  return readConfig(answers.configPath).then(function (contents) {
    return !contents.snippets
  })
}

/**
 * Get default snippets directory if no snippet entry exists
 * @param {Object} answers
 * @return {String} = absolute path to snippets
 */
function getSnippetsDirectory(answers) {
  return readConfig(answers.configPath).then(function (contents) {
    // Default location
    return path.join(process.cwd(), contents.src, 'snippets')
  })
}