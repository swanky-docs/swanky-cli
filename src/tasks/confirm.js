'use strict'

const inquirer = require('inquirer')

/**
 * Simple helper to prompt user for confirmation before performing action
 * @param {String} msg
 * @param {Promise} callback
 */
module.exports = function(msg) {
  return inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: msg,
      default: false
    }
  ])
}
