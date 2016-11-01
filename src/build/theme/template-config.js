const path = require('path')

module.exports = function(config, tmp) {
  return {
    files: [
      {
        src: path.join(tmp, 'css/**/*.styl'),
        dest: path.join(config.src, 'themes', `${config.name}-theme`, 'css')
      },
      {
        src: path.join(tmp, 'index.js'),
        dest: path.join(config.src, 'themes', `${config.name}-theme`, 'index.js')
      },
      {
        src: path.join(tmp, 'js/**/*.js'),
        dest: path.join(config.src, 'themes', `${config.name}-theme`, 'js')
      },
      {
        src: path.join(tmp, 'img/**/*.*'),
        dest: path.join(config.src, 'themes', `${config.name}-theme`, 'img')
      },
      {
        src: path.join(tmp, 'templates/layouts/**/*.html'),
        dest: path.join(config.src, 'themes', `${config.name}-theme`, 'templates/layouts')
      },
      {
        src: path.join(tmp, 'templates/partials/**/*.html'),
        dest: path.join(config.src, 'themes', `${config.name}-theme`, 'templates/partials')
      }
    ]
  }
}
