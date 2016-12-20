'use strict'

const rm = require('rimraf').sync
const fs = require('fs')
const path = require('path')
const themeGenerator = require('./../index')
const basePath = path.join(process.cwd(), './__fixtures__/mock-theme')
const yaml = require('js-yaml')

// Mock the console
console.log = jest.genMockFn()

describe('themeGenerator', () => {

  afterEach(() => {
    const pathToDelete = path.join(basePath, 'src')

    if (fs.existsSync(pathToDelete)) {
      rm(pathToDelete)
    }

    // Restore original configurations
    const contents = {
      src: '__fixtures__/mock-theme/src',
      theme: 'my-theme'
    }
    const themeConfigYAML = yaml.safeDump(contents)
    const themeConfigYAMLPath = path.join(basePath, 'swanky.config.yaml')

    const themeConfigJSON = JSON.stringify(contents)
    const themeConfigJSONPath = path.join(basePath, 'swanky.config.json')

    fs.writeFileSync(themeConfigYAMLPath, themeConfigYAML)
    fs.writeFileSync(themeConfigJSONPath, themeConfigJSON)
  })

  it('should exist', () => {
    expect(themeGenerator).toBeDefined()
  })

  it('should generate a theme from YAML config', () => {
    const answers = {
      name: 'My awesome theme 1',
      themeTemplate: 'swanky-docs/swanky-theme',
      themeDirectory: path.join(basePath, 'src/themes'),
      configPath: path.join(basePath, 'swanky.config.yaml')
    }

    return themeGenerator(answers).then(() => {
      const pathToTheme = path.join(basePath, 'src/themes/my-awesome-theme-1-theme/index.js')
      const result = fs.existsSync(pathToTheme)

      expect(result).toBeTruthy()
    })
  })

  it('should generate a theme from YAML config', () => {
    const answers = {
      name: 'My awesome theme 2',
      themeTemplate: 'swanky-docs/swanky-theme',
      themeDirectory: path.join(basePath, 'src/themes'),
      configPath: path.join(basePath, 'swanky.config.json')
    }

    return themeGenerator(answers).then(() => {
      const pathToTheme = path.join(basePath, 'src/themes/my-awesome-theme-2-theme/index.js')
      const result = fs.existsSync(pathToTheme)

      expect(result).toBeTruthy()
    })
  })

  it('should make new theme default', () => {
    const answers = {
      name: 'My awesome theme 3',
      themeTemplate: 'swanky-docs/swanky-theme',
      themeDirectory: path.join(basePath, 'src/themes'),
      makeDefault: true,
      configPath: path.join(basePath, 'swanky.config.json')
    }

    return themeGenerator(answers).then(() => {
      const themeConfigJSONPath = path.join(basePath, 'swanky.config.json')
      const themeConfig = JSON.parse(fs.readFileSync(themeConfigJSONPath, 'utf-8'))

      expect(themeConfig.theme).toEqual('/__fixtures__/mock-theme/src/themes/my-awesome-theme-3-theme')
    })
  })
})
