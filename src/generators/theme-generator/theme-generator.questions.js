'use strict'

const readConfig = require('../../tasks/read-config')
const DEFAULTS = require('./theme-generator.defaults')
const path = require('path')

module.exports = [
  {
    type: 'list',
    name: 'themeTemplate',
    message: 'Theme:',
    choices: DEFAULTS.THEMES,
    default: 'swanky-docs/swanky-theme'
  },
  {
    name: 'themeDirectory',
    type: 'input',
    message: 'Location to create theme:',
    default: getThemeDirectory
  },
  {
    name: 'makeDefault',
    type: 'confirm',
    message: 'Make this the default theme:',
    default: true
  }
]

/**
 * Get default themes directory if no theme entry exists
 * @param {Object} answers
 * @return {Promise} - absolute path to theme
 */
function getThemeDirectory(answers) {
  return readConfig(answers.configPath).then((contents) => {
    if (contents.theme) {
      const themeFolder = path.dirname(contents.theme)

      return path.join(process.cwd(), themeFolder)
    }

    // Default location
    return path.join(process.cwd(), contents.src, 'themes')
  })
}