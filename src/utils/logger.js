'use strict'

const chalk = require('chalk')
const format = require('util').format
const prefix = '» swanky-cli'
const sep = chalk.gray('·')

/**
 * Log a `message` to the console.
 * @param {String} message
 */
exports.head = function () {
  const msg = format.apply(format, arguments)
  console.log(chalk.grey('\n--------------------------------------------------------------------'))
  console.log(chalk.yellow(prefix), sep, chalk.bold.white(msg))
  console.log(chalk.grey('--------------------------------------------------------------------\n'))
}

/**
 * Log a `message` to the console.
 * @param {String} message
 */
exports.log = function () {
  const msg = format.apply(format, arguments)
  console.log(msg)
}

/**
 * Log a `message` to the console.
 * @param {String} message
 */
exports.warning = function () {
  const msg = format.apply(format, arguments)
  console.log(chalk.red(prefix), sep, msg)
}

/**
 * Log an error `message` to the console and exit.
 * @param {String} message
 */
exports.fatal = function () {
  const msg = format.apply(format, arguments)
  console.error(chalk.red(prefix), sep, msg)
}

/**
 * Log a `message` to the console.
 * @param {String} message
 */
exports.success = function () {
  const msg = format.apply(format, arguments)
  console.log(chalk.green('✔'), msg)
}
