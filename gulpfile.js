'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');
var to5 = require('6to5-browserify');
var webserver = require('gulp-webserver');
var cache = require('gulp-cached');

var server = require('gulp-server-livereload');

var gReact = require('gulp-react');
var gTo5 = require('gulp-6to5');
gulp.task('compile', function() {
  return gulp.src('app2/**/*')
  .pipe(cache('compile'))
  .pipe(gReact({stripTypes: true, keepExtension: true}))
  .pipe(gTo5())
  .pipe(gulp.dest('build'));
});

gulp.task('watch', ['compile'], function() {
  var bundler = watchify(browserify('./build/index.js', watchify.args));

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

  gulp.watch(['app2/**/*'], ['compile'])

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
