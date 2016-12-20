'use strict'

const path = require('path')

/**
 * Get build config for new swanky configuration
 * @param configPath
 * @param newSwankyConfig
 * @returns {Object}
 */
module.exports = function(configPath, newSwankyConfig) {
  switch(path.extname(configPath)) {
    case '.json':
      return getJSONConfig(configPath, newSwankyConfig)
    case '.js':
      return getJSConfig(configPath, newSwankyConfig)
    default:
      return getYAMLConfig(configPath, newSwankyConfig)
  }
}

function getJSConfig(configPath, newSwankyConfig) {
  return {
    json: [{
      dest: configPath,
      contents: 'module.exports = ' + JSON.stringify(newSwankyConfig, null, 2)
    }]
  }
}

function getJSONConfig(configPath, newSwankyConfig) {
  return {
    json: [{
      dest: configPath,
      contents: JSON.stringify(newSwankyConfig, null, 2)
    }]
  }
}

function getYAMLConfig(configPath, newSwankyConfig) {
  return {
    yaml: [{
      dest: configPath,
      contents: newSwankyConfig
    }]
  }
}
