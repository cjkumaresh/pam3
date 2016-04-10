'use strict';
var gulp = require('gulp'),
    eslint = require('gulp-eslint');

gulp.task('lint', function () {
    
    return gulp.src(['**/*.js','!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.result(function(result) {
            console.log('ESLint result: ' + result.filePath);
            console.log('# Messages: ' + result.messages.length);
            console.log('# Warnings: ' + result.warningCount);
            console.log('# Errors: ' + result.errorCount);
        }))
        .pipe(eslint.failAfterError());
});

gulp.task('default', ['lint'], function() {
  console.log('Code looks good !');
});