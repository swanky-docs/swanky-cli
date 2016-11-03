const path = require('path')
const defaults = require('../../lib/defaults')

module.exports = function(config) {
  return {
    templates: [
      {
        src: 'swanky.config.yaml',
        dest: 'swanky.config.yaml'
      }
    ],
    files: [
      {
        src: 'src/docs.js',
        dest: path.join(config.src, 'docs.js')
      },
      {
        src: 'src/docs.styl',
        dest: path.join(config.src, 'docs.styl')
      },
      {
        src: 'src/css/**/*',
        dest: path.join(config.src, 'css')
      },
      {
        src: 'src/snippets/**/*',
        dest: path.join(config.src, 'snippets')

      },
      {
        src: 'src/content/foundation/**/*',
        dest: path.join(config.src, 'content/foundation')
      },
      {
        src: 'src/content/angular-components/**/*',
        dest: path.join(config.src, 'content/angular-components')
      },
      {
        src: 'src/content/components/**/*',
        dest: path.join(config.src, 'content/components')
      },
      {
        src: 'src/config/bootstrap/angular.bootstrap.js',
        dest: path.join(config.src, 'config/bootstrap/angular.bootstrap.js')
      }
    ],
    extends: [
      {
        src: 'package.json',
        obj: {
          dependencies: {
            [defaults.ANGULAR_JS.NAME]: defaults.ANGULAR_JS.VERSION
          }
        }
      },
      {
        src: 'package.json',
        obj: {
          devDependencies: {
            [defaults.SWANKY_PROCESSOR_NGDOCS.NAME]: defaults.SWANKY_PROCESSOR_NGDOCS.VERSION
          }
        }
      }
    ],
    remove: [
      {
        dest: path.join(config.src, 'content/overview.md')
      }
    ]
  }
}
