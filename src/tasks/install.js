'use strict'

const Promise = require('bluebird')
const R = require('ramda')
const commandExists = require('command-exists')
const spawn = require('cross-spawn')
const ora = require('ora')
const chalk = require('chalk')

/**
 * Install Dependencies
 * Determine appropriate node package manager NPM | Yarn
 * @param config
 */
module.exports = function(options) {
  return new Promise((resolve) => {

    let installCommand = 'npm' // default
    const spinner = ora('installing packages')
    const baseInstallOptions = { stdio: 'pipe', encoding: 'utf-8' }
    options = options ? R.merge(baseInstallOptions, options) : options

    commandExists('yarn', function (err, exists) {
      if (exists && !err) {
        installCommand = 'yarn'
      }

      if(err) {
        resolve('Could not install dependencies. Please run `npm i`.')
      }

      spinner.start()
      const cmd = spawn(installCommand, ['install'], options)

      // Clean up Yarn stdout output
      if(installCommand === 'yarn') {
        cmd.stdout.on('data', function (data) {
          const str = data.toString().replace(/\n/g, '')
          spinner.text = str
        })
      }

      cmd.stdout.on('data', (data) => {
        console.log(`${data}`);
      });

      cmd.stderr.on('data', (data) => {
        console.error(`${data}`);
      });

      cmd.on('close', () => {
        spinner.stopAndPersist(chalk.green('✓'))
        resolve('All packages installed successfully with ' + installCommand)
      });

    })
  })
}
