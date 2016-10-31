const async = require('async')
const memFs = require('mem-fs')
const editor = require('mem-fs-editor')

// Lib
const logger = require('../lib/logger')
const goodbye = require('../lib/goodbye')

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
  function() {
    fs.commit(() => {
      logger.head('3. Installing dependenies. ✓')
      async.series([
        async.apply((callback) => {
          install(config, callback)
        })
      ], () => {
        console.log('')
        logger.head('4. Documentation generated successfully ✓')

        goodbye();
      })
    })
  });
}
