const chalk = require('chalk')
const format = require('util').format

const prefix = '» swanky-cli'
const sep = chalk.gray('·')

/**
 * Log a `message` to the console.
 *
 * @param {String} message
 */

exports.head = function () {
  if (process.env.NODE_ENV !== 'test') {
    const msg = format.apply(format, arguments)
    console.log(chalk.grey('--------------------------------------------------------------------'))
    console.log(chalk.yellow(prefix), sep, msg)
    console.log(chalk.grey('--------------------------------------------------------------------\n'))
  }
}

/**
 * Log a `message` to the console.
 *
 * @param {String} message
 */

exports.log = function () {
  if (process.env.NODE_ENV !== 'test') {
    const msg = format.apply(format, arguments)
    console.log(msg)
  }
}

/**
 * Log a `message` to the console.
 *
 * @param {String} message
 */

exports.warning = function () {
  if (process.env.NODE_ENV !== 'test') {
    const msg = format.apply(format, arguments)
    console.log(chalk.red(prefix), sep, msg)
  }
}

/**
 * Log an error `message` to the console and exit.
 *
 * @param {String} message
 */

exports.fatal = function (message) {
  if (message instanceof Error) {
    message = message.message.trim()
  }
  const msg = format.apply(format, arguments)
  console.error(chalk.red(prefix), sep, msg)
}


/**
 * Log a `message` to the console.
 *
 * @param {String} message
 */

exports.success = function () {
  const msg = format.apply(format, arguments)
  console.log(chalk.green(prefix), sep, msg)
}