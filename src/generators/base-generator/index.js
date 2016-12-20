'use strict'

const _ = require('lodash')
const clear = require('clear')

// Tasks
const ask = require('./../../tasks/ask')
const greet = require('./../../tasks/greet')
const check = require('./../../tasks/check')


// Lib
const logger = require('./../../utils/logger')

// Generators
const startGeneratorQuestions = require('./base-generator.questions.js')

// Defaults
const DEFAULTS = require('./base-generator.defaults.js')

/**
 * Build coordinator
 * @param {object} args
 */
module.exports = function (args) {
  clear()
  greet()

  // Check installed version of generator
  check().then(() => {
    if (!getGeneratorType(args)) {
      const baseQuestions = startGeneratorQuestions().base

      logger.head(`Select a generator type.`)
      ask(baseQuestions).then((answer) => configureGenerator(answer.type))
    } else {
      configureGenerator(getGeneratorType(args))
    }
  })
}

/**
 * Configure specific generator type
 * @param {string} type - generator type [page|snippet|project]
 */
function configureGenerator(type) {
  logger.head(`1. Generating ${type}.`)

  const generatorType = DEFAULTS.GENERATOR_TYPES[type]
  const generate = generatorType.generator

  // Merge base questions with generator specific questions
  const questions = startGeneratorQuestions(type).extended.concat(generatorType.questions)

  ask(questions).then((answers) => {
    answers.nameNormalized = _.kebabCase(answers.name)

    return generate(answers)
  })
  .then(() => {
    return ask(startGeneratorQuestions(type).again)
  })
  .then((answers) => {
    if (answers.askAgain) {
      configureGenerator(type)
    }
  })
}

/**
 *
 * @param args
 * @returns {string|null}
 */
function getGeneratorType(args) {
  return (args[0] && DEFAULTS.GENERATOR_TYPES[args[0]]) ? args[0] : null
}
