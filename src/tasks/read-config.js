'use strict'

const Promise = require('bluebird')
const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

/**
 * Read swanky config file
 * @param {String} filePath - filePath to swanky config
 */
module.exports = function(filePath) {
  return new Promise(function(resolve) {
    let contents

    switch(path.extname(filePath)) {
    case '.json':
      contents = loadJSConfig(filePath);
      break;
    case '.js':
      contents = loadJSConfig(filePath);
      break;
    default:
      contents = loadYAMLConfig(filePath);
    }

    resolve(contents)
  })
}

function loadJSConfig(filePath) {
  /* eslint-disable global-require, import/no-dynamic-require  */
  return require(filePath);
  /* eslint-enable global-require, import/no-dynamic-require */
}

function loadYAMLConfig(filePath) {
  return yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));
}
