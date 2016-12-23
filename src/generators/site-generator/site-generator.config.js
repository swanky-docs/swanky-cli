'use strict'

const path = require('path')
const os = require('os')
const uid = require('uid')
const DEFAULTS = require('./site-generator.defaults.js')

module.exports = function(answers, basePath) {
  basePath = basePath || process.cwd()
  let buildConfig = {}

  const availablePreprocessors = {
    [DEFAULTS.SWANKY_PROCESSOR_NGDOCS.NAME]: {
      src: path.join(basePath, 'package.json'),
      obj: {
        devDependencies: {
          [DEFAULTS.SWANKY_PROCESSOR_NGDOCS.NAME]: DEFAULTS.SWANKY_PROCESSOR_NGDOCS.VERSION
        }
      }
    }
  }

  // Theme configuration
  const themeName = answers.nameNormalized
  buildConfig.themeTemplate = answers.themeTemplate
  buildConfig.templateDirectory = path.join(os.tmpdir(), 'swanky-docs-theme-template-' + uid())

  // Base
  buildConfig.template = [
    {
      src: path.join(__dirname, '__templates__', 'package.json'),
      dest: path.join(basePath, 'package.json')
    },
    {
      src: path.join(__dirname, '__templates__', 'swanky.config.yaml'),
      dest: path.join(basePath, 'swanky.config.yaml')
    }
  ]
  
  buildConfig.file = [
    {
      src: path.join(__dirname, '__templates__', 'favicon.ico'),
      dest: path.join(basePath, answers.src, 'favicon.ico')
    },
    {
      src: path.join(__dirname, '__templates__', 'src/content/overview.md'),
      dest: path.join(basePath, answers.src, 'content/overview.md')
    },
    {
      src: path.join(__dirname, '__templates__', 'src/docs.js'),
      dest: path.join(basePath, answers.src, 'docs.js')
    },
    {
      src: path.join(__dirname, '__templates__', 'src/docs.styl'),
      dest: path.join(basePath, answers.src, 'docs.styl')
    },
    {
      src: path.join(__dirname, '__templates__', 'src/config/start/serve.dev.js'),
      dest: path.join(basePath, answers.src, 'config/start/serve.dev.js')
    },
    {
      src: path.join(__dirname, '__templates__', 'src/config/build/build.prod.js'),
      dest: path.join(basePath, answers.src, 'config/build/build.prod.js')
    },
    {
      src: path.join(__dirname, '__templates__', 'src/snippets/**/*'),
      dest: path.join(basePath, answers.src, 'snippets')
    },

    // Theme
    {
      src: path.join(buildConfig.templateDirectory, 'css/**/*.styl'),
      dest: path.join(answers.src, `themes/${themeName}-theme`, 'css')
    },
    {
      src: path.join(buildConfig.templateDirectory, 'index.js'),
      dest: path.join(answers.src, `themes/${themeName}-theme`, 'index.js')
    },
    {
      src: path.join(buildConfig.templateDirectory, 'js/**/*.js'),
      dest: path.join(answers.src, `themes/${themeName}-theme`, 'js')
    },
    {
      src: path.join(buildConfig.templateDirectory, 'img/**/*.*'),
      dest: path.join(answers.src, `themes/${themeName}-theme`, 'img')
    },
    {
      src: path.join(buildConfig.templateDirectory, 'templates/layouts/**/*.html'),
      dest: path.join(answers.src, `themes/${themeName}-theme`, 'templates/layouts')
    },
    {
      src: path.join(buildConfig.templateDirectory, 'templates/partials/**/*.html'),
      dest: path.join(answers.src, `themes/${themeName}-theme`, 'templates/partials')
    }
  ]

  if (answers.preprocessor) {
    buildConfig.extend = [availablePreprocessors[answers.preprocessor]]
  }

  return buildConfig
}