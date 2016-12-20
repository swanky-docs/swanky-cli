'use strict'

const inquirer = require('inquirer')

/**
 * Inquirer helper method to prompt user
 * @param {Array} questions
 * @param {Promise}
 */
module.exports = function(questions) {
  return inquirer.prompt(questions).then((answers) => answers)
}
