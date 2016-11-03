const commandExists = require('command-exists')
const spawn = require('cross-spawn')

/**
 * Install Dependencies
 * @param config
 * @param callback
 */
module.exports = function(config, callback) {
  if (process.env.NODE_ENV !== 'test') {
    commandExists('yarn', function (err, exists) {
      if (!err && exists) {
        spawn('yarn', ['install'], { stdio: 'inherit' }).on('exit', callback)
      } else {
        spawn('npm', ['install'], { stdio: 'inherit' }).on('exit', callback)
      }
    })
  } else {
    callback()
  }
}
