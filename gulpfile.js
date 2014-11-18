var browserify = require('browserify');
var gulp = require('gulp');
var rename = require('gulp-rename');
var less = require('gulp-less');
var source = require('vinyl-source-stream');

gulp.task('browserify', ['jshint-client'], function() {
  return browserify('./app.js')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('less', function() {
  return gulp.src('./app.less')
    .pipe(less())
    .on('error', function(err) {
      console.log(err.message);
    })
    .pipe(rename('style.css'))
    .pipe(gulp.dest('./'));
});

gulp.task('watch', function() {
  gulp.watch(['app.js'], ['browserify']);
  gulp.watch('./*.less', ['less']);
})


gulp.task('default', ['browserify', 'less', 'watch']);