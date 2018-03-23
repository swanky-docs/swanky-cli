'use strict'

const Promise = require('bluebird')
const R = require('ramda')
const commandExists = require('command-exists')
const spawn = require('cross-spawn')
const ora = require('ora')

/**
 * Install Dependencies
 * Determine appropriate node package manager NPM | Yarn
 * @param config
 */
module.exports = function(options) {
  return new Promise((resolve) => {

    let installCommand = 'npm' // default
    const spinner = ora('installing dependencies')
    const baseInstallOptions = { stdio: 'pipe', encoding: 'utf-8' }
    options = options ? R.merge(baseInstallOptions, options) : options

    commandExists('yarn', function (err, exists) {
      if (exists && !err) {
        installCommand = 'yarn'
      }

      if (err) {
        resolve('could not install dependencies. Please run `npm i`.')
      }

      spinner.start()
      const cmd = spawn(installCommand, ['install'], options)

      // Clean up Yarn stdout output
      if (installCommand === 'yarn') {
        cmd.stdout.on('data', function () {
          // const str = data.toString().replace(/\n/g, '')
        })
      }

      cmd.stdout.on('data', (data) => {
        spinner.start(`${data}`);
      });

      cmd.stderr.on('data', () => {
        // console.error(`${data}`);
      });

      cmd.on('close', () => {
        spinner.succeed('installing dependencies');
        resolve('all packages installed successfully with ' + installCommand)
      });

    })
  })
}
