'use strict'

const path = require('path')
const paths = require('./../paths')

describe('paths', () => {
  it('should exist', () => {
    expect(paths).toBeDefined()
  })

  describe('getCurrentDirectoryBase', () => {
    it('should return the current base directory', () => {
      expect(paths.getCurrentDirectoryBase()).toEqual(path.basename(process.cwd()))
    })
  })

  describe('templatePath', () => {
    it('should return a normalised path to templates', () => {
      const dirname = 'some/dir/path'
      const fileName = 'my-file.html'
      expect(paths.templatePath(dirname, fileName)).toEqual(path.join(dirname, fileName))
    })
  })

  describe('destinationPath', () => {
    it('should return a normalised path to the output folder', () => {
      const dirname = 'some/dir/path'
      const fileName = 'my-file.html'
      expect(paths.destinationPath(dirname, fileName)).toEqual(path.join(dirname, fileName))
    })
  })
})
