const chalk = require('chalk')
const path = require('path')
const generatorVersion = require('fs-extra').readJsonSync(path.join(__dirname, '/../../package.json')).version

const swanky =
  chalk.red.bold('\n╓╣╣╣╣╣╣╣╗ ╠╣╣╣       ╠╣╣╣ ╓╣╣╣╣╣╣╣╗ ╞╣╣╣  ╣╣╣ ╞╣╣╣  ╓╣╣╣╝╚╣╣╣╗     ╣╣╣╝') +
  chalk.blue.bold('\n╠╣╣╣ ╠╣╣╣ ╠╣╣╣       ╠╣╣╣ ╠╣╣╣ ╠╣╣╣ ╞╣╣╣╕ ╣╣╣ ╞╣╣╣ ╓╣╣╣    ╚╣╣╣╗╓╞╣╣╝') +
  chalk.white.bold('\n╠╣╣╣      ╠╣╣╣       ╠╣╣╣ ╠╣╣╣ ╠╣╣╣ ╞╣╣╣╣╗╣╣╣ ╞╣╣╣╓╣╣╣       ╚╣╣╣╣╝') +
  chalk.white.bold('\n└╝╣╣╣╣╣╣╗ ╠╣╣╣       ╠╣╣╣ ╠╣╣╣╣╣╣╣╣ ╞╣╣╣╣╣╣╣╣ ╞╣╣╣╣╣╣╗        ╞╣╣╣') +
  chalk.white.bold('\n     ╠╣╣╣ ╠╣╣╣  ╠╣╣  ╠╣╣╣ ╠╣╣╣ ╠╣╣╣ ╞╣╣╣╚╣╣╣╣ ╞╣╣╣╚╣╣╣╗       ╞╣╣╣') +
  chalk.blue.bold('\n╠╣╣╣ ╠╣╣╣ ╠╣╣╣  ╠╣╣  ╠╣╣╣ ╠╣╣╣ ╠╣╣╣ ╞╣╣╣ ╘╣╣╣ ╞╣╣╣ ╚╣╣╣╗      ╞╣╣╣') +
  chalk.red.bold('\n╘╣╣╣╣╣╣╣╝ ╘╣╣╣╣╣╝╘╣╣╣╣╣╣╝ ╠╣╣╣ ╠╣╣╣ ╞╣╣╣  ╣╣╣ ╞╣╣╣  ╚╣╣╣╗     ╞╣╣╣');

const docs =
  chalk.red.bold('\n╠╣╣╣╣╣╣╣╗ ╓╣╣╣╣╣╣╣╗ ╓╣╣╣╣╣╣╣╗ ╓╣╣╣╣╣╣╣╗') + chalk.white.bold(' swanky-cli v' + generatorVersion) +
  chalk.blue.bold('\n╠╣╣╣ ╠╣╣╣ ╠╣╣╣ ╠╣╣╣ ╠╣╣╣ ╠╣╣╣ ╠╣╣╣ ╠╣╣╣') +
  chalk.white.bold('\n╠╣╣╣ ╠╣╣╣ ╠╣╣╣ ╠╣╣╣ ╠╣╣╣ ╠╣╣╣ ╠╣╣╣') +
  chalk.white.bold('\n╠╣╣╣ ╣╣╣╣ ╠╣╣╣ ╣╣╣╣ ╠╣╣╣      └╝╣╣╣╣╣╣╗') +
  chalk.white.bold('\n╠╣╣╣ ╣╣╣╣ ╠╣╣╣ ╣╣╣╣ ╠╣╣╣ ╠╣╣╣      ╠╣╣╣') +
  chalk.blue.bold('\n╠╣╣╣ ╠╣╣╣ ╠╣╣╣ ╣╣╣╣ ╠╣╣╣ ╠╣╣╣ ╠╣╣╣ ╠╣╣╣') +
  chalk.red.bold('\n╠╣╣╣╣╣╣╣╝ ╘╣╣╣╣╣╣╣╝ ╘╣╣╣╣╣╣╣╝ ╘╣╣╣╣╣╣╣╝ ') +
  '\n';

module.exports = function() {
  if (process.env.NODE_ENV !== 'test') {
    console.log(swanky);
    console.log(docs);
  }
}
