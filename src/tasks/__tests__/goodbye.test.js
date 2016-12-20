'use strict'

const goodbye = require('./../goodbye')

describe('goodbye', () => {
  beforeEach(() => {
    console.log = jest.genMockFn()
  })

  it('should exist', () => {
    expect(goodbye).toBeDefined()
  })

  it('should call inquirer prompt with questions', () => {
    goodbye();
    expect(console.log).toHaveBeenCalled()
  })
})
