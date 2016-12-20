'use strict'

const logger = require('./../logger')

describe('paths', () => {
  beforeEach(() => {
    console.log = jest.genMockFn()
    console.error = jest.genMockFn()
  })

  it('should exist', () => {
    expect(logger).toBeDefined()
  })

  describe('head', () => {
    it('should log the header', () => {
      logger.head()
      expect(console.log).toHaveBeenCalled()
    })
  })

  describe('log', () => {
    it('should log the message', () => {
      const msg = 'Hello World'

      logger.log(msg)
      expect(console.log).toHaveBeenCalledWith(msg)
    })
  })

  describe('warning', () => {
    it('should log the warning', () => {
      logger.warning()
      expect(console.log).toHaveBeenCalled()
    })
  })

  describe('fatal', () => {
    it('should log the error', () => {
      logger.fatal()
      expect(console.error).toHaveBeenCalled()
    })
  })

  describe('success', () => {
    it('should log the success message', () => {
      logger.success()
      expect(console.log).toHaveBeenCalled()
    })
  })
})