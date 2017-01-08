'use strict'

// Generators
const generatePage = require('../page-generator')
const generatePageQuestions = require('../page-generator/page-generator.questions')

const generateSnippet = require('../snippet-generator')
const generateSnippetQuestions = require('../snippet-generator/snippet-generator.questions')

const generateTheme = require('../theme-generator')
const generateThemeQuestions = require('../theme-generator/theme-generator.questions')

const generateSite = require('../site-generator')
const generateSiteQuestions = require('../site-generator/site-generator.questions')

module.exports = {
  SWANKY_CONFIG: 'swanky.config.yaml',
  GENERATOR_TEMPLATE_TYPES: [
    {
      name: 'Page',
      value: 'page'
    },
    {
      name: 'Site',
      value: 'site'
    },
    {
      name: 'Snippet',
      value: 'snippet'
    },
    {
      name: 'Theme',
      value: 'theme'
    }
  ],
  GENERATOR_TYPES: {
    page: {
      generator: generatePage,
      questions: generatePageQuestions,
    },
    site: {
      generator: generateSite,
      questions: generateSiteQuestions,
    },
    snippet: {
      generator: generateSnippet,
      questions: generateSnippetQuestions,
    },
    theme: {
      generator: generateTheme,
      questions: generateThemeQuestions,
    }
  }
}
