'use strict'

const greet = require('./../greet')

describe('greet', () => {
  beforeEach(() => {
    console.log = jest.genMockFn()
  })

  it('should exist', () => {
    expect(greet).toBeDefined()
  })

  it('should call inquirer prompt with questions', () => {
    greet();
    expect(console.log).toHaveBeenCalled()
  })
})
