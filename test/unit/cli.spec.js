const { expect } = require('chai')
const exists = require('fs').existsSync
const build = require('../../build')

// Configurations
const MOCK_DEMO_SITE_CONFIG = require('./fixtures/mock-demo-site.config')

describe('swanky-cli', function () {
  it('should build a demo site', function(done) {
    build(MOCK_DEMO_SITE_CONFIG, function() {
      expect(exists(`${MOCK_DEMO_SITE_CONFIG.basePath}/src/content/foundation/01-overview.md`)).to.equal(true)
      done()
    })
  })
})