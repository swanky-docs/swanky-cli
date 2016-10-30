const path = require('path')

module.exports = function(config) {
  return {
    templates: [
      {
        src: 'package.json',
        dest: 'package.json'
      },
      {
        src: 'swanky.config.yaml',
        dest: 'swanky.config.yaml'
      }
    ],
    files: [
      {
        src: 'favicon.ico',
        dest: path.join(config.src, 'favicon.ico')
      },
      {
        src: 'src/docs.js',
        dest: path.join(config.src, 'docs.js')
      },
      {
        src: 'src/docs.styl',
        dest: path.join(config.src, 'docs.styl')
      },
      {
        src: 'src/content/overview.md',
        dest: path.join(config.src, 'content', 'overview.md')
      },
      {
        src: 'src/config/start/serve.dev.js',
        dest: path.join(config.src, 'config', 'start', 'serve.dev.js')
      },
      {
        src: 'src/config/build/build.prod.js',
        dest: path.join(config.src, 'config', 'build', 'build.prod.js')
      },
      {
        src: 'src/config/bootstrap/snippets.bootstrap.js',
        dest: path.join(config.src, 'config', 'bootstrap', 'snippets.bootstrap.js')
      }
    ]
  }
}
