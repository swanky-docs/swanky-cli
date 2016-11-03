const async = require('async')
const memFs = require('mem-fs')
const editor = require('mem-fs-editor')

// Lib
const logger = require('../lib/logger')

// Builders
const CoreBuilder = require('./core-builder')
const ProcessorsBuilder = require('./processors-builder')
const ThemeBuilder = require('./theme-builder')
const DemoBuilder = require('./demo-builder')

// Tasks
const install = require('../tasks/install')

// In Memory File System
const store = memFs.create()
const fs = editor.create(store)

module.exports = function(config, onCompleteCallback) {
  logger.head('2. Building documentation.')

  // Add base path to config
  config.basePath = config.basePath ? config.basePath : process.cwd()

  const coreBuilder = new CoreBuilder(config, fs)
  const themeBuilder = new ThemeBuilder(config, fs)
  const processorsBuilder = new ProcessorsBuilder(config, fs)
  const demoBuilder = new DemoBuilder(config, fs)

  async.series([
    function(callback) {
      coreBuilder.build(callback)
    },
    function(callback) {
      themeBuilder.build(callback)
    },
    function(callback) {
      if(config.processors.length) {
        processorsBuilder.build(callback)
      } else {
        callback()
      }
    },
    function(callback) {
      if(config.demo) {
        demoBuilder.build(callback)
      } else {
        callback()
      }
    }
  ],
  function() {
    fs.commit(function () {
      logger.head('3. Installing dependencies.')

      async.series([
        function (callback) {
          install(config, callback)
        }
      ], function () {
        onCompleteCallback()
      })
    })
  })
}
