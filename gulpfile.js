'use strict';
var gulp = require('gulp'),
    eslint = require('gulp-eslint'),
    mocha = require('gulp-mocha');

gulp.task('lint', function () { 
    return gulp.src(['**/*.js','!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('mocha', function(){
	return gulp.src('test/**/*.js', {
		read: false
	})
	.pipe(mocha({
		reporter: 'nyan'
	}));
});

gulp.task('default', ['lint'], function() {});
