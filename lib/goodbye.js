const chalk = require('chalk')

module.exports = function() {
  console.log('Congratulations on successfully creating your documentation site!')
  console.log('')
  console.log('Get started:')
  console.log('- run `npm start` to see your documentation site.')
  console.log('- visit ' + chalk.blue('https://swanky-docs.github.io/docs') + ' for usage and full documentation.')
}
