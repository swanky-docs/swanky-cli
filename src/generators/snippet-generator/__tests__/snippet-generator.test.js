'use strict'

const rm = require('rimraf').sync
const fs = require('fs')
const path = require('path')
const snippetGenerator = require('./../index')
const basePath = path.join(process.cwd(), './__fixtures__/mock-snippet')
const yaml = require('js-yaml')

// Mock the console
console.log = jest.genMockFn()

describe('snippetGenerator', () => {

  afterEach(() => {
    const pathToDelete = path.join(basePath, 'src')

    if (fs.existsSync(pathToDelete)) {
      rm(pathToDelete)
    }

    // Restore original configurations
    const noSnippetsConfig = yaml.safeDump({title: 'Swanky Docs'})
    const noSnippetsConfigPath = path.join(basePath, 'swanky.config-no-snippets.yaml')

    fs.writeFileSync(noSnippetsConfigPath, noSnippetsConfig)
  })

  it('should exist', () => {
    expect(snippetGenerator).toBeDefined()
  })

  it('should generate a snippet', () => {
    const answers = {
      name: 'My awesome Snippet 1',
      configPath: path.join(basePath, 'swanky.config.yaml'),
      nameNormalized: 'my-awesome-snippet-1'
    }

    return snippetGenerator(answers).then(() => {
      const pathToSnippet = path.join(basePath, 'src/snippets/my-awesome-snippet-1/index.js')
      const result = fs.existsSync(pathToSnippet)

      expect(result).toBeTruthy()
    })
  })

  describe('no snippets entry', () => {
    let noSnippetsYAMLConfigPath;
    let noSnippetsJSONConfigPath;

    beforeEach(() => {
      noSnippetsYAMLConfigPath = path.join(basePath, 'swanky.config-no-snippets.yaml')
      noSnippetsJSONConfigPath = path.join(basePath, 'swanky.config-no-snippets.json')
    })

    afterEach(() => {
      // Restore original configurations
      const noSnippetsConfig = { title: 'Swanky Docs' }

      fs.writeFileSync(noSnippetsYAMLConfigPath, yaml.safeDump(noSnippetsConfig))
      fs.writeFileSync(noSnippetsJSONConfigPath, JSON.stringify(noSnippetsConfig))
    })

    it('should add snippets entry to YAML file', () => {
      const answers = {
        name: 'My awesome Snippet 2',
        configPath: path.join(basePath, 'swanky.config-no-snippets.yaml'),
        nameNormalized: 'my-awesome-snippet-2',
        snippetsDirectory: path.join(basePath, 'src/snippets')
      }

      return snippetGenerator(answers).then(() => {
        const result = yaml.safeLoad(fs.readFileSync(noSnippetsYAMLConfigPath, 'utf8'))

        expect(result.snippets).toEqual('__fixtures__/mock-snippet/src/snippets')
      })
    })

    it('should add snippets entry to JSON file', () => {
      const answers = {
        name: 'My awesome Snippet 3',
        configPath: path.join(basePath, 'swanky.config-no-snippets.json'),
        nameNormalized: 'my-awesome-snippet-3',
        snippetsDirectory: path.join(basePath, 'src/snippets')
      }

      return snippetGenerator(answers).then(() => {
        const result = fs.readFileSync(noSnippetsJSONConfigPath, 'utf-8')

        expect(JSON.parse(result).snippets).toEqual('__fixtures__/mock-snippet/src/snippets')
      })
    })
  })
})
