'use strict'

const _ = require('lodash')
const Promise = require('bluebird')
const fs = require('fs')
const path = require('path')
const findConfig = require('../../tasks/find-config')
const DEFAULTS = require('./base-generator.defaults.js')

module.exports = function (type) {
  const base = [
    {
      name: 'type',
      type: 'list',
      message: 'Generator type:',
      choices: DEFAULTS.GENERATOR_TEMPLATE_TYPES
    }
  ]

  const extended = [
    {
      name: 'name',
      type: 'input',
      message: `${_.startCase(type)} name:`,
      default: `My awesome ${_.startCase(type)} name`
    },
    {
      name: 'configPath',
      type: 'input',
      message: 'Swanky config file location',
      when: function () {
        return type !== 'site' // this won't exist yet
      },
      default: function () {
        return findConfig(DEFAULTS.SWANKY_CONFIG).then(function (result) {
          return result
        }).catch(function () {
          return path.join(process.cwd(), 'swanky.config.yaml')
        })
      },
      validate: function (input) {
        return new Promise(function (resolve) {
          if (fs.existsSync(input)) {
            resolve(true)
          } else {
            resolve('invalid config location. please re-enter.')
          }
        })
      }
    }
  ]

  const again = [
    {
      name: 'askAgain',
      type: 'confirm',
      message: `Create another ${type}:`,
      default: false,
      when: function () {
        return type !== 'site'
      }
    }
  ]

  return {
    base: base,
    extended: extended,
    again: again
  }
}