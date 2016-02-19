'use strict';

const gulp = require('gulp');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const browserify = require('browserify');
const watchify = require('watchify');
const notifier = require('node-notifier');
const server = require('gulp-server-livereload');
const concat = require('gulp-concat');
const sass = require('gulp-sass');

const notify = function notifyError(error) {
  let message = 'In: ';
  let title = 'Error: ';

  if (error.description) {
    title += error.description;
  } else if (error.message) {
    title += error.message;
  }

  if (error.filename) {
    const file = error.filename.split('/');
    message += file[file.length - 1];
  }

  if (error.lineNumber) {
    message += `\nOn Line: ${error.lineNumber}`;
  }

  notifier.notify({ title, message });
  console.log(title);
};

const bundler = watchify(
  browserify({
    entries: ['./src/main.js', './src/app.jsx'],
    extensions: ['.jsx', '.js'],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true,
  })
  .transform(babelify)
);

function bundle() {
  return bundler
    .bundle()
    .on('error', notify)
    .pipe(source('main.js'))
    .pipe(gulp.dest('./'));
}

bundler.on('update', bundle);

gulp.task('build', () => bundle());

gulp.task('serve', () =>
  gulp.src('')
    .pipe(server({
      livereload: {
        enable: true,
        filter(filePath, cb) {
          if (/main.js/.test(filePath)) {
            cb(true);
          } else if (/style.css/.test(filePath)) {
            cb(true);
          }
        },
      },
      open: true,
    }))
);

gulp.task('sass', () =>
  gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./'))
);

gulp.task('default', ['build', 'serve', 'sass', 'watch']);

gulp.task('watch', () =>
  gulp.watch('./sass/**/*.scss', ['sass'])
);
