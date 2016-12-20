'use strict'

const _ = require('lodash')
const path = require('path')
const getSwankyBuildConfig = require('../../tasks/get-swanky-build-config')

module.exports = function(answers, config) {
  let buildConfig = {}
  let snippetName = _.kebabCase(answers.name)

  // Add an entry point for snippets if one doe snot exist
  if (!config.snippets) {
    config.snippets = answers.snippetsDirectory.replace(process.cwd() + '/', '')
    _.merge(buildConfig, getSwankyBuildConfig(answers.configPath, config))
  }

  buildConfig.file = [
    {
      src: path.join(__dirname, '__templates__/default/index.js'),
      dest: path.join(process.cwd(), config.snippets, snippetName, 'index.js')
    },
    {
      src: path.join(__dirname, '__templates__/default/style.styl'),
      dest: path.join(process.cwd(), config.snippets, snippetName, 'style.styl')
    },
    {
      src: path.join(__dirname, '__templates__/default/template.html'),
      dest: path.join(process.cwd(), config.snippets, snippetName, 'template.html')
    },
    {
      src: path.join(__dirname, '__templates__/default/images/snippet-template.svg'),
      dest: path.join(process.cwd(), config.snippets, snippetName, 'images/snippet-template.svg')
    }
  ]


  return buildConfig
}