'use strict';

var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var reactify = require('reactify');
var rename = require('gulp-rename');

gulp.task('default', function() {
	return browserify('./app2/index.js')
	.transform(reactify)
	.bundle()
	.pipe(source('bundle.js'))
	// .pipe(rename('brow.js'))
	.pipe(gulp.dest('./'))
});
