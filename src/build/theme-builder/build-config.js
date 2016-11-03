const path = require('path')

module.exports = function(config) {
  return {
    files: [
      {
        src: 'css/**/*.styl',
        dest: path.join(config.src, 'themes', `${config.nameNormalized}-theme`, 'css')
      },
      {
        src: 'index.js',
        dest: path.join(config.src, 'themes', `${config.nameNormalized}-theme`, 'index.js')
      },
      {
        src: 'js/**/*.js',
        dest: path.join(config.src, 'themes', `${config.nameNormalized}-theme`, 'js')
      },
      {
        src: 'img/**/*.*',
        dest: path.join(config.src, 'themes', `${config.nameNormalized}-theme`, 'img')
      },
      {
        src: 'templates/layouts/**/*.html',
        dest: path.join(config.src, 'themes', `${config.nameNormalized}-theme`, 'templates/layouts')
      },
      {
        src: 'templates/partials/**/*.html',
        dest: path.join(config.src, 'themes', `${config.nameNormalized}-theme`, 'templates/partials')
      }
    ]
  }
}
