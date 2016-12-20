'use strict'

const rm = require('rimraf').sync
const fs = require('fs')
const path = require('path')
const pageGenerator = require('./../index')
const basePath = path.join(process.cwd(), './__fixtures__/mock-page')
const yaml = require('js-yaml')

// Mock the console
console.log = jest.genMockFn()

describe('pageGenerator', () => {

  afterEach(() => {
    const pathToDelete = path.join(basePath, 'src')

    if (fs.existsSync(pathToDelete)) {
      rm(pathToDelete)
    }

    // Restore original configurations
    const content = {
      src: '__fixtures__/mock-page/src',
      sections: []
    }
    const pagesConfigYAML = yaml.safeDump(content)
    const pagesConfigYAMLPath = path.join(basePath, 'swanky.config.yaml')
    const pagesConfigJSON = JSON.stringify(content)
    const pagesConfigJSONPath = path.join(basePath, 'swanky.config.json')

    fs.writeFileSync(pagesConfigYAMLPath, pagesConfigYAML)
    fs.writeFileSync(pagesConfigJSONPath, pagesConfigJSON)
  })

  it('should exist', () => {
    expect(pageGenerator).toBeDefined()
  })

  it('should generate a page from YAML config', () => {
    const answers = {
      name: 'My awesome page 1',
      hasParent: false,
      configPath: path.join(basePath, 'swanky.config.yaml')
    }

    return pageGenerator(answers).then(() => {
      const pathToPage = path.join(basePath, 'src/content/my-awesome-page-1.md')
      const result = fs.existsSync(pathToPage)

      expect(result).toBeTruthy()
    })
  })

  it('should generate a page from JSON config', () => {
    const answers = {
      name: 'My awesome page 2',
      hasParent: false,
      configPath: path.join(basePath, 'swanky.config.json')
    }

    return pageGenerator(answers).then(() => {
      const pathToPage = path.join(basePath, 'src/content/my-awesome-page-2.md')
      const result = fs.existsSync(pathToPage)

      expect(result).toBeTruthy()
    })
  })
})
