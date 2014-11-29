'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');
var to5 = require('6to5-browserify');
var webserver = require('gulp-webserver');

var server = require('gulp-server-livereload');

gulp.task('watch', function() {
  var bundler = watchify(browserify('./app2/index.js', watchify.args));
  // var bundler = watchify(browserify('./app2/test.js', watchify.args));

  // bundler.transform(reactify({es6: true}));
  bundler.transform(reactify);
  bundler.transform(to5);

  bundler.on('update', rebundle);

  function rebundle() {
    gutil.log(gutil.colors.cyan('rebundling'));
    var start = Date.now();
    return bundler.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./dist'))
    .on('end', function() {
      gutil.log(gutil.colors.cyan('done rebundling in '+ (Date.now() - start) + 'ms'));
    });
  }

  return rebundle();
});

gulp.task('html', function() {
  return gulp.src('app2/index.html')
  .pipe(gulp.dest('./dist'));
});

gulp.task('webserver', function() {
  return gulp.src('dist')
  .pipe(webserver({
    livereload: { enable: true }
  }));
});


gulp.task('default', ['html', 'watch', 'webserver']);
