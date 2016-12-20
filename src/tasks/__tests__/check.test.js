'use strict'

const check = require('./../check')
const chalk = require('chalk')

jest.mock('request')
const request = require('request')

const packageConfig = require('./../../../package.json')

// console.error(packageConfig)

describe('check', () => {
  beforeEach(() => {
    console.log = jest.genMockFn()

    // Local version
    packageConfig.version = '1.0.0'

    // current mocked node version
    process.version = '4.2'
  })

  it('should exist', () => {
    expect(check).toBeDefined()
  })

  describe('minimum node version', () => {
    it('valid node version', () => {
      return check().then(() => {
        expect(console.log).not.toHaveBeenCalledWith(chalk.red('  You must upgrade node to >=4.x to use swanky-cli'));
      })
    })

    it('invalid node version', () => {
      process.version = '0.12'

      return check().then(() => {
        expect(console.log).toHaveBeenCalledWith(chalk.red('  You must upgrade node to >=4.x to use swanky-cli'));
      })
    })
  })

  it('should determine local configuration', () => {
    const expectedResult = {
      currentNodeVersion: 4.2,
      latestVersion: '2.0.0',
      localVersion: '1.0.0',
      minNodeVersion: 4
    }

    return check().then((config) => {
      expect(console.log).toHaveBeenCalled()
      expect(config).toEqual(expectedResult)
    })
  })

  it('should not log version differences if local version is equal to latest', () => {
    // Bump local version
    packageConfig.version = '2.0.0'

    const expectedResult = {
      currentNodeVersion: 4.2,
      latestVersion: '2.0.0',
      localVersion: '2.0.0',
      minNodeVersion: 4
    }

    return check().then((config) => {
      expect(console.log).not.toHaveBeenCalled()
      expect(config).toEqual(expectedResult)
    })
  })

  it('should handle a request error', () => {
    request.__setMockResponse({
      error: true,
      response: {
        statusCode: 500
      },
      body: JSON.stringify({})
    })

    const expectedResult = {
      currentNodeVersion: 4.2,
      minNodeVersion: 4
    }

    return check().then((config) => {
      expect(config).toEqual(expectedResult)
    })
  })
})
