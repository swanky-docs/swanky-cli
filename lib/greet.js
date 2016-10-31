const chalk = require('chalk')

const swanky =
  chalk.red.bold('\n╓╣╣╣╣╣╣╣╗ ╣╣╣╣       ╣╣╣╣ ╓╣╣╣╣╣╣╣╗ ╞╣╣╣  ╣╣╣ ╞╣╣╣  ╓╣╣╣ ╚╣╣╣╗     ╣╣╣╝') +
  chalk.blue.bold('\n╣╣╣╣ ╠╣╣╣ ╣╣╣╣       ╣╣╣╣ ╣╣╣╣ ╠╣╣╣ ╞╣╣╣╣ ╣╣╣ ╞╣╣╣ ╓╣╣╣    ╚╣╣╣╗╓╞╣╣╝') +
  chalk.white.bold('\n╣╣╣╣      ╣╣╣╣       ╣╣╣╣ ╣╣╣╣ ╠╣╣╣ ╞╣╣╣╣╗╣╣╣ ╞╣╣╣╓╣╣╣       ╚╣╣╣╣╝') +
  chalk.white.bold('\n└╝╣╣╣╣╣╣╗ ╣╣╣╣       ╣╣╣╣ ╣╣╣╣╣╣╣╣╣ ╞╣╣╣╣╣╣╣╣ ╞╣╣╣╣╣╣╗        ╞╣╣╣') +
  chalk.white.bold('\n     ╠╣╣╣ ╣╣╣╣  ╣╣╣  ╣╣╣╣ ╣╣╣╣ ╠╣╣╣ ╞╣╣╣╚╣╣╣╣ ╞╣╣╣╚╣╣╣╗       ╞╣╣╣') +
  chalk.blue.bold('\n╣╣╣╣ ╠╣╣╣ ╣╣╣╣  ╣╣╣  ╣╣╣╣ ╣╣╣╣ ╠╣╣╣ ╞╣╣╣ ╣╣╣╣ ╞╣╣╣ ╚╣╣╣╗      ╞╣╣╣') +
  chalk.red.bold('\n└╝╣╣╣╣╣╝  └╝╣╣╣╣╣╝└╣╣╣╣╣╝ ╣╣╣╣ ╠╣╣╣ ╞╣╣╣ ╘╣╣╣ ╞╣╣╣  ╚╣╣╣╗     ╞╣╣╣');

const docs =
  chalk.red.bold('\n╣╣╣╣╣╣╣╣╗ ╓╣╣╣╣╣╣╣╗ ╓╣╣╣╣╣╣╣╗ ╓╣╣╣╣╣╣╣╗') +
  chalk.blue.bold('\n╣╣╣╣ ╠╣╣╣ ╣╣╣╣ ╠╣╣╣ ╣╣╣╣ ╠╣╣╣ ╣╣╣╣ ╠╣╣╣') +
  chalk.white.bold('\n╣╣╣╣ ╠╣╣╣ ╣╣╣╣ ╠╣╣╣ ╣╣╣╣ ╠╣╣╣ ╣╣╣╣') +
  chalk.white.bold('\n╣╣╣╣ ╣╣╣╣ ╣╣╣╣ ╣╣╣╣ ╣╣╣╣      └╝╣╣╣╣╣╣╗') +
  chalk.white.bold('\n╣╣╣╣ ╣╣╣╣ ╣╣╣╣ ╣╣╣╣ ╣╣╣╣ ╠╣╣╣      ╠╣╣╣') +
  chalk.blue.bold('\n╣╣╣╣ ╠╣╣╣ ╣╣╣╣ ╣╣╣╣ ╣╣╣╣ ╠╣╣╣ ╣╣╣╣ ╠╣╣╣') +
  chalk.red.bold('\n╣╣╣╣╣╣╣╣╝ └╝╣╣╣╣╣╝  └╝╣╣╣╣╣╝   ╝╣╣╣╣╣╝ ') +
  '\n';

module.exports = function() {
  if (process.env.NODE_ENV !== 'test') {
    console.log(swanky);
    console.log(docs);
  }
}
