'use strict'

const DEFAULTS = require('./site-generator.defaults')

module.exports = [
  {
    type: 'input',
    name: 'src',
    message: 'Documentation SOURCE directory:',
    default: DEFAULTS.SOURCE
  },
  {
    type: 'input',
    name: 'output',
    message: 'Documentation OUTPUT directory:',
    default: DEFAULTS.OUTPUT
  },
  {
    type: 'input',
    name: 'author',
    message: 'Author:'
  },
  {
    type: 'list',
    name: 'themeTemplate',
    message: 'Theme:',
    choices: DEFAULTS.THEMES,
    default: 'swanky-docs/swanky-theme'
  },
  {
    type: 'checkbox',
    name: 'preprocessors',
    message: 'Preprocessors:',
    choices: DEFAULTS.PREPROCESSORS,
    default: null
  }
]