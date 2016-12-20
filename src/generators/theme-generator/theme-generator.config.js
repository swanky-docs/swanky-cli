'use strict'

const _ = require('lodash')
const R = require('ramda')
const path = require('path')
const os = require('os')
const uid = require('uid')
const getSwankyBuildConfig = require('../../tasks/get-swanky-build-config')

module.exports = function(answers, config) {
  let buildConfig = {}
  let themeName = _.kebabCase(answers.name)

  // Theme configuration
  buildConfig.themeTemplate = answers.themeTemplate
  buildConfig.templateDirectory = path.join(os.tmpdir(), 'swanky-docs-theme-template-' + uid())

  buildConfig.file = [
    {
      src: path.join(buildConfig.templateDirectory, 'css/**/*.styl'),
      dest: path.join(answers.themeDirectory, `${themeName}-theme`, 'css')
    },
    {
      src: path.join(buildConfig.templateDirectory, 'index.js'),
      dest: path.join(answers.themeDirectory, `${themeName}-theme`, 'index.js')
    },
    {
      src: path.join(buildConfig.templateDirectory, 'js/**/*.js'),
      dest: path.join(answers.themeDirectory, `${themeName}-theme`, 'js')
    },
    {
      src: path.join(buildConfig.templateDirectory, 'img/**/*.*'),
      dest: path.join(answers.themeDirectory, `${themeName}-theme`, 'img')
    },
    {
      src: path.join(buildConfig.templateDirectory, 'templates/layouts/**/*.html'),
      dest: path.join(answers.themeDirectory, `${themeName}-theme`, 'templates/layouts')
    },
    {
      src: path.join(buildConfig.templateDirectory, 'templates/partials/**/*.html'),
      dest: path.join(answers.themeDirectory, `${themeName}-theme`, 'templates/partials')
    }
  ]

  if (answers.makeDefault) {
    let newSwankyConfig = R.clone(config);
    newSwankyConfig.theme = `${answers.themeDirectory.replace(process.cwd(), '')}/${themeName}-theme`

    // Merge the build config with the new swanky configuration
    buildConfig = R.merge(buildConfig, getSwankyBuildConfig(answers.configPath, newSwankyConfig))
  }

  return buildConfig
}