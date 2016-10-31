const path = require('path')

module.exports = {
  MOCK_BUILDS: {
    BASE: path.join(process.cwd(), 'test/unit/mock-builds'),
    TYPES: {
      DEMO: 'demo'
    }
  }
}