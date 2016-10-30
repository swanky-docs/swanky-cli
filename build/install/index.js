const commandExists = require('command-exists')
const spawn = require('cross-spawn')

module.exports = function(config, callback) {
  commandExists('yarn', function(err, commandExists) {
    if(commandExists) {
      spawn('yarn', ['install'], { stdio: 'inherit' }).on('exit', callback)
    } else {
      spawn('npm', ['install'], { stdio: 'inherit' }).on('exit', callback)
    }
  })
}
