'use strict'

const path = require('path')
const readConfig = require('./../read-config')
const yamlConfig = path.join(__dirname, './../__mocks__/__fixtures__/yaml-config.yml')
const jsonConfig = path.join(__dirname, './../__mocks__/__fixtures__/json-config.json')
const jsConfig = path.join(__dirname, './../__mocks__/__fixtures__/js-config.js')
const expectedResult = { title: 'Swanky Docs' }

describe('confirm', () => {
  it('should exist', () => {
    expect(readConfig).toBeDefined()
  })

  it('should read yaml config', (done) => {
    readConfig(yamlConfig).then((result) => {
      expect(result).toEqual(expectedResult)
      done()
    })
  })

  it('should read json config', (done) => {
    readConfig(jsonConfig).then((result) => {
      expect(result).toEqual(expectedResult)
      done()
    })
  })

  it('should read js config', (done) => {
    readConfig(jsConfig).then((result) => {
      expect(result).toEqual(expectedResult)
      done()
    })
  })
})
