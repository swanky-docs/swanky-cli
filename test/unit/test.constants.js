const path = require('path')

module.exports = {
  MOCK_BUILDS: {
    BASE: path.join(process.cwd(), 'test/e2e/mock-builds'),
    TYPES: {
      DEMO: 'demo'
    }
  }
}