'use strict'

const path = require('path')
const findConfig = require('./../find-config')
const basePath = path.join(__dirname, './../__mocks__/__fixtures__')
const DEFAULT_CONFIG_PATH = path.join(__dirname, './../__mocks__/__fixtures__/yaml-config.yml')

describe('findConfig', () => {
  beforeEach(() => {
    console.log = jest.genMockFn()
  })

  it('should exist', () => {
    expect(findConfig).toBeDefined()
  })

  it('should resolve from the default config location', () => {
    return findConfig(basePath, DEFAULT_CONFIG_PATH).then((result) => {
      expect(result).toEqual(DEFAULT_CONFIG_PATH)
    })
  })

  it('should resolve from a user entered config location', () => {
    const expectedResult = path.join(__dirname, './../__mocks__/__fixtures__/swanky.config.yml')

    return findConfig(basePath, '/some/made/up/path').then((result) => {
      expect(result).toEqual(expectedResult)
    })
  })

  it('should reject if no config found', () => {
    return findConfig( '/some/made/up/path', '/another/made/up/path').catch((error) => {
      expect(error).toEqual('no swanky config file found.')
    })
  })
})
