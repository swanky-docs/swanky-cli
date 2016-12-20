'use strict'

const rm = require('rimraf').sync
const fs = require('fs')
const path = require('path')
const siteGenerator = require('./../index')
const basePath = path.join(process.cwd(), './__fixtures__/mock-site')

// Mock the console
console.log = jest.genMockFn()

describe('siteGenerator', () => {

  afterEach(() => {
    const pathToDelete = path.join(basePath, 'sites')

    if (fs.existsSync(pathToDelete)) {
      rm(pathToDelete)
    }
  })

  it('should exist', () => {
    expect(siteGenerator).toBeDefined()
  })

  it('should generate a site from YAML config', () => {
    const answers = {
      name: 'My awesome site 1',
      nameNormalized: 'my-awesome-site-1',
      author: 'Rod Leviton',
      src: path.join(basePath, 'sites/my-awesome-site-1-theme/src'),
      output: path.join(basePath, 'sites/my-awesome-site-1-theme/build'),
      themeTemplate: 'swanky-docs/swanky-theme'
    }

    const pathToTheme = path.join(basePath, 'sites/my-awesome-site-1-theme')

    return siteGenerator(answers, pathToTheme).then(() => {
      const pathToSwankyConfig = path.join(basePath, 'sites/my-awesome-site-1-theme/swanky.config.yaml')
      const result = fs.existsSync(pathToSwankyConfig)

      expect(result).toBeTruthy()
    })
  })
})
