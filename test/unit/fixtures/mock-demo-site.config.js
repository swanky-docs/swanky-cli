const path = require('path')
const constants = require('../test.constants')

module.exports = {
  basePath: path.join(constants.MOCK_BUILDS.BASE, constants.MOCK_BUILDS.TYPES.DEMO),
  name: 'Swanky CLI Test',
  nameNormalized: 'swanky-cli-test',
  src: 'src',
  output: 'docs',
  author: 'John Doe',
  theme: 'swanky-docs/swanky-theme',
  processors: [],
  demo: true
}