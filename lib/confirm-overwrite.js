const chalk = require('chalk')
const inquirer = require('inquirer')

const questions = function(filename) {
  return [
    {
      type: 'confirm',
      name: 'overwrite',
      message: chalk.red(filename + ' already exists.') + ' Would you like to overwrite?',
      default: false
    }
  ]
}

module.exports = function(filename, callback) {
  inquirer.prompt(questions(filename)).then(function(answers) {
    callback(answers.overwrite)
  })
}
