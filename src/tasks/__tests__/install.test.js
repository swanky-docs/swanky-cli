'use strict'

const path = require('path')
const rimraf = require('rimraf').sync
const fs = require('fs')
const install = require('./../install')
const basePath = path.join(process.cwd(), './__fixtures__/mock-install')

jest.mock('command-exists')
const commandExists = require('command-exists')

describe('install', () => {
  beforeEach(() => {
    console.log = jest.genMockFn()
    console.error = jest.genMockFn()
  })

  afterEach(() => {
    const pathToDelete = path.join(basePath, 'node_modules')
    const yarnLockFilePath = path.join(basePath, 'yarn.lock')

    if (fs.existsSync(pathToDelete)) {
      rimraf(pathToDelete)
    }

    if (fs.existsSync(yarnLockFilePath)) {
      rimraf(yarnLockFilePath)
    }
  })

  it('should exist', () => {
    expect(install).toBeDefined()
  })

  it('should not install dependencies when an error occurs', () => {
    commandExists.__setMockResponse({
      error: true
    })

    return install().then((result) => {
      expect(result).toEqual('could not install dependencies. Please run `npm i`.')
    })
  })

  it('should install dependencies when `Yarn` is available', () => {
    commandExists.__setMockResponse({
      error: false,
      exists: true
    })

    return install({ cwd: basePath }).then((result) => {
      expect(result).toEqual('all packages installed successfully with yarn')
    })
  })

  it('should install dependencies when `Yarn` is not available', () => {
    commandExists.__setMockResponse({
      error: false,
      exists: false
    })

    return install({ cwd: basePath }).then((result) => {
      expect(result).toEqual('all packages installed successfully with npm')
    })
  })

})
