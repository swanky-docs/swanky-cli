'use strict'

const confirm = require('./../confirm')

jest.mock('inquirer')
const inquirer = require('inquirer')

inquirer.prompt.mockImplementation(() => {
  return new Promise((resolve) => resolve())
})

const msg = 'Some message';
const confirmObj = [
  {
    type: 'confirm',
    name: 'confirm',
    message: msg,
    default: false
  }
]

describe('confirm', () => {
  it('should exist', () => {
    expect(confirm).toBeDefined()
  })

  it('should call inquirer prompt with questions', () => {
    confirm(msg);
    expect(inquirer.prompt).toHaveBeenCalledWith(confirmObj)
  })
})
