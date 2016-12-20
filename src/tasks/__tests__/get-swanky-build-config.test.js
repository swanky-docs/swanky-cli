'use strict'

const path = require('path')
const getSwankyBuildConfig = require('./../get-swanky-build-config')
const fixturesBasePath = path.join(__dirname, './../__mocks__/__fixtures__')
let newSwankyConfig

describe('getSwankyBuildConfig', () => {
  beforeEach(() => {
    console.log = jest.genMockFn()
  })

  it('should exist', () => {
    expect(getSwankyBuildConfig).toBeDefined()
  })

  describe('build config', () => {
    beforeEach(() => {
      newSwankyConfig = {
        title: 'New title'
      }
    })

    it('should extend JavaScript', () => {
      const configPath = path.join(fixturesBasePath, 'js-config.js')
      const expectedResult = {
        json: [{
          dest: configPath,
          contents: 'module.exports = ' + JSON.stringify(newSwankyConfig, null, 2)
        }]
      }

      expect(getSwankyBuildConfig(configPath, newSwankyConfig)).toEqual(expectedResult)
    })

    it('should extend JSON', () => {
      const configPath = path.join(fixturesBasePath, 'json-config.json')
      const expectedResult = {
        json: [{
          dest: configPath,
          contents: JSON.stringify(newSwankyConfig, null, 2)
        }]
      }

      expect(getSwankyBuildConfig(configPath, newSwankyConfig)).toEqual(expectedResult)
    })

    it('should extend YAML', () => {
      const configPath = path.join(fixturesBasePath, 'yaml-config.yml')
      const expectedResult = {
        yaml: [{
          dest: configPath,
          contents: newSwankyConfig
        }]
      }

      expect(getSwankyBuildConfig(configPath, newSwankyConfig)).toEqual(expectedResult)
    })
  })

})
