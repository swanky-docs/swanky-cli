'use strict'

const _ = require('lodash')
const path = require('path')
const getSwankyBuildConfig = require('../../tasks/get-swanky-build-config')
const DEFAULTS = require('./page-generator.defaults')

module.exports = function(answers, config) {
  let extension = answers.preprocessor ? DEFAULTS.TEMPLATES[answers.preprocessor].extension : DEFAULTS.TEMPLATES.default.extension
  let filename = _.kebabCase(answers.name) + extension
  let filePath = (answers.hasParent) ? path.join(_.kebabCase(answers.parent).toLowerCase(), filename) : filename

  // Create a new configuration
  let template = getPageTemplate(answers)
  let newSection = getPageConfig(answers, config, filePath)
  let newSwankyConfig = updateSwankyConfig(answers, config, newSection)

  // Create the basic page build configuration
  let buildConfig = {
    template: [{
      src: path.join(__dirname, '__templates__', template),
      dest: path.join(process.cwd(), config.src, 'content', filePath)
    }]
  }

  // Merge the build config with the new swanky configuration
  _.merge(buildConfig, getSwankyBuildConfig(answers.configPath, newSwankyConfig))

  // Add any dev dependencies for preprocessor if required
  if (answers.preprocessor) {
    _.merge(buildConfig, {
      extend: [{
        src: path.join(process.cwd(), 'package.json'),
        obj: {
          devDependencies: {
            [answers.preprocessor]: DEFAULTS.PACKAGES[answers.preprocessor].version
          }
        }
      }]
    })
  }

  return buildConfig
}

/**
 * Create new configuration based on existing config structure
 * We don't want to overwrite any previous configuration
 * @param {Array} answers
 * @param {Object} config - existing swanky configuration
 * @param {Object} section - new section to add
 * @returns {Object} - new swanky configuration
 */
function updateSwankyConfig(answers, config, section) {
  let newSwankyConfig = _.cloneDeep(config); // make a brand new copy of the config

  if (answers.hasParent) {
    let index = _.findIndex(newSwankyConfig.sections, ['title', answers.parent])

    if (newSwankyConfig.sections[index].subSections) {
      newSwankyConfig.sections[index].subSections.push(section)
    } else {
      newSwankyConfig.sections[index].subSections = [section]
    }
  } else {
    newSwankyConfig.sections.push(section)
  }

  return newSwankyConfig;
}

/**
 * Determine page template to use
 * @param {Array} answers
 * @returns {String} page template name
 */
function getPageTemplate(answers) {
  if (answers.preprocessor) {
    return DEFAULTS.TEMPLATES[answers.preprocessor].name
  } else {
    return DEFAULTS.TEMPLATES.default.name
  }
}

/**
 * Create new page configuration
 * @param {Array} answers
 * @param {Object} config
 * @param {String} filePath
 * @returns {Object} - new page configuration
 */
function getPageConfig(answers, config, filePath) {

  // Base section
  let pageConfig = {
    title: answers.name,
    content: path.join(config.src, 'content', filePath)
  }

  // Add preprocessor
  if (answers.preprocessor) {
    pageConfig.preprocessor = {
      [answers.preprocessor]: {}
    }
  }

  return pageConfig
}