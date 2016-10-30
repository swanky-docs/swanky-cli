const async = require('async')
const chalk = require('chalk')
const memFs = require('mem-fs')
const editor = require('mem-fs-editor')

// Lib
const logger = require('../lib/logger')

// Build
const base = require('./base')
const theme = require('./theme')
const processors = require('./processors')
const demo = require('./demo')
const install = require('./install')

const store = memFs.create()
const fs = editor.create(store)

module.exports = function(config) {
  console.log('')
  logger.head('2. Building documentation. ✓')

  async.series([
    async.apply(base, config, fs),
    async.apply(theme, config, fs),
    async.apply(processors, config, fs),
    async.apply(demo, config, fs)
  ],
  function(err, results) {
    fs.commit(() => {
      logger.head('3. Installing dependenies. ✓')
      async.series([
        async.apply((callback) => {
          install(config, callback)
        })
      ], () => {
        console.log('')
        logger.head('4. Documentation generated successfully ✓')

        console.log('Congratulations on successfully creating your documentation site!')
        console.log('')
        console.log('Get started:')
        console.log('- run `npm start` to see your documentation site.')
        console.log('- visit ' +
        chalk.blue('https://swanky-docs.github.io/docs') + ' for usage and full documentation.')
      })
    })
  });
}
