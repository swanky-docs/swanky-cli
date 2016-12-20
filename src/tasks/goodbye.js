'use strict'

const chalk = require('chalk')

module.exports = function() {
  console.log(chalk.green('✓ Congratulations on successfully creating your documentation site!\n'))
  console.log(chalk.bold.white('Get started:'))
  console.log('- run `npm start` to see your new Swanky documentation site.')
  console.log('- visit ' + chalk.blue('https://swanky-docs.github.io/docs') + ' for usage and full\n  documentation.\n')
  console.log(chalk.grey('--------------------------------------------------------------------\n'))
}
