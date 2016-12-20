'use strict'

const baseGenerator = require('./../index')

// Mock the console
console.log = jest.genMockFn()

// Tasks
jest.mock('./../../../tasks/ask')
jest.mock('./../../../tasks/greet')
jest.mock('./.././../../tasks/check')

describe('siteGenerator', () => {
  it('should exist', () => {
    expect(baseGenerator).toBeDefined()
  })
})
