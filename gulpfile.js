'use strict';
var es = require('event-stream');
var gulp = require('gulp');
var server = require('gulp-server-livereload');
var stylus = require('gulp-stylus');
var changed = require('gulp-changed');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');

var source = require('vinyl-source-stream');
var browserify = require('browserify');
var reactify = require('reactify');

var bowerPath = 'bower_components';
var buildPath = 'build';
var destPath = 'dist';
var assetsPath = destPath+'/assets';
var libPath = destPath+'/lib';
var fontsPath = destPath+'/fonts';

function onError(err) {
  console.log(err);
}

gulp.task('bower', function() {
  return gulp.src([
    bowerPath+'/normalize.css/**/*',
    bowerPath+'/fira/**/*'
  ])
  .pipe(changed(buildPath))
  .pipe(gulp.dest(buildPath));
});

gulp.task('stylus', function() {
  return gulp.src('app/styles/main.styl')
  .pipe(stylus())
  .pipe(gulp.dest(buildPath))
});

gulp.task('styles', ['bower', 'stylus'], function() {
  return gulp.src([
    buildPath+'/normalize.css',
    'public/assets/flaticon.css',
    buildPath+'/main.css',
  ])
  // .pipe(changed(destPath))
  .pipe(concat('main.css'))
  .pipe(gulp.dest(destPath));
});

gulp.task('fonts', function() {
  return es.merge(
    gulp.src(bowerPath+'/**/*.woff')
    .pipe(gulp.dest(destPath+'/fonts'))
  ,
    gulp.src([
      'public/assets/flaticon.*',
      '!public/assets/flaticon.css'
    ])
    .pipe(gulp.dest(destPath+'/fonts'))
  )
});

gulp.task('js', function() {
  return browserify('./app/index.js')
  .transform(reactify)
  .bundle()
  .pipe(source('main.js'))
  .pipe(gulp.dest(destPath));
});

gulp.task('server', function() {
  return gulp.src('./dist')
  .pipe(server({
    livereload: true,
    defaultFile: './index.html'
  }));
});

gulp.task('html', function() {
  return gulp.src('app/index.html')
  .pipe(gulp.dest(destPath));
});

gulp.task('watch', function() {
  gulp.watch([
    'app/styles/**/*.styl',
    bowerPath+'/**/*'
  ],
  ['styles']);
  gulp.watch('app/index.html', ['html']);
  gulp.watch('app/**/*.js', ['js']);
  gulp.watch('app/**/*.jsx', ['js']);
});

gulp.task('default', [
  'fonts',
  'html',
  'styles',
  'js',
  'server',
  'watch'
]);
