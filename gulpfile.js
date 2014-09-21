'use strict';
var es = require('event-stream');
var gulp = require('gulp');
var server = require('gulp-server-livereload');
var stylus = require('gulp-stylus');
var sourcemaps = require('gulp-sourcemaps');
var changed = require('gulp-changed');
var filter = require('gulp-filter');
var concat = require('gulp-concat');
var mainBowerFiles = require('main-bower-files');

var bowerPath = 'bower_components';
var buildPath = 'build';
var destPath = 'dist';
var assetsPath = destPath+'/assets';
var libPath = destPath+'/lib';
var fontsPath = destPath+'/fonts';

gulp.task('bower', function() {
  return gulp.src(bowerPath+'/**/*')
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
    buildPath+'/*/*.css',
    // bowerPath+'/fira/fira.css',
    buildPath+'/main.css'
  ])
  // .pipe(changed(destPath))
  .pipe(concat('main.css'))
  .pipe(gulp.dest(destPath));
});

gulp.task('fonts', function() {
  return gulp.src(bowerPath+'/**/*.woff')
  .pipe(gulp.dest(destPath+'/fonts'));
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
});

gulp.task('default', [
  'html',
  'styles',
  'server',
  'watch'
]);
