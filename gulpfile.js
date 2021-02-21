const { src, dest, task, watch } = require('gulp')
const sass         = require('gulp-sass');
const sourcemaps   = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const config       = require('./gulp/config');
const notify       = require('gulp-notify');

function isMax(mq) {
  return /max-width/.test(mq);
}

function isMin(mq) {
  return /min-width/.test(mq);
}

function css(done) {
  src(config.src.sass + '/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: config.production ? 'compact' : 'expanded',
      precision: 5
    }))
    .on('error', config.errorHandler)
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('./'))
    .pipe(dest(config.dest.css))
  done()
}

function sortMediaQueries(a, b) {
  A = a.replace(/\D/g, '');
  B = b.replace(/\D/g, '');
  if (isMax(a) && isMax(b)) {
    return B - A;
  } else if (isMin(a) && isMin(b)) {
    return A - B;
  } else if (isMax(a) && isMin(b)) {
    return 1;
  } else if (isMin(a) && isMax(b)) {
    return -1;
  }
  return 1;
}

function watchFiles() {
  watch(config.src.sass + '/**/*.scss', css)
}

task('css', css)

task('watch', watchFiles)

task('default', css)
