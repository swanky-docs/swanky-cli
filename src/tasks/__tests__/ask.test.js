'use strict'

const Promise = require('bluebird')
const ask = require('./../ask')

jest.mock('inquirer')
const inquirer = require('inquirer')

inquirer.prompt.mockImplementation(() => {
  return new Promise((resolve) => resolve({ answers: 'ok' }))
})

describe('ask', () => {
  it('should exist', () => {
    expect(ask).toBeDefined()
  })

  it('should call inquirer prompt with questions', () => {
    const questions = [];

    ask(questions);
    expect(inquirer.prompt).toHaveBeenCalledWith(questions)
  })

  it('should return the answers', (done) => {
    const questions = [];

    ask(questions).then((answers) => {
      expect(answers).toEqual({ answers: 'ok' })
      done()
    })
  })
})
