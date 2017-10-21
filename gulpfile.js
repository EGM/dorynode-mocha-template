const gulp = require('gulp');
const gutil = require('gulp-util');
const istanbul = require('gulp-istanbul');
const minify = require('gulp-minify')
const mocha = require('gulp-mocha'); 
const prettier = require("@bdchauvette/gulp-prettier");
const rename = require('gulp-rename')
const webpack = require('webpack-stream');

gulp.task('default', function() {
  return gulp.src('src/entry.js')
    .pipe(prettier())
    .pipe(webpack({output:{libraryTarget: 'umd'}}))
    .pipe(rename({ basename: 'index' }))
    .pipe(minify())
    .pipe(gulp.dest('dist'))
});
 
gulp.task('pre-test', function () {
  return gulp.src(['src/**/*.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});
 
gulp.task('test', ['pre-test'], function () {
  return gulp.src(['test/*.js'])
    .pipe(mocha())
    .pipe(istanbul.writeReports())
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }));
});

gulp.task('watch', function() {
  gulp.watch(['lib/**', 'test/**'], ['mocha']); 
}); 
gulp.task('mocha', function() { 
  return gulp.src(['test/*.js'], { read: false })
    .pipe(mocha({ reporter: 'list' })) 
    .on('error', gutil.log); 
});

var gulpDocumentation = require('gulp-documentation');

//  Out of the box, you can generate JSON, HTML, and Markdown documentation 
gulp.task('documentation-readme-example', function () {
  // Generating README documentation 
  return gulp.src('./index.js')
    .pipe(gulpDocumentation('md'))
    .pipe(gulp.dest('md-documentation'));
});
 
// Generating a pretty HTML documentation site 
gulp.task('documentation-html-example', function () {
  return gulp.src('./index.js')
    .pipe(gulpDocumentation('html'))
    .pipe(gulp.dest('html-documentation'));
});
 
// Generating raw JSON documentation output 
gulp.task('documentation-json-example', function () {
  return gulp.src('./index.js')
    .pipe(gulpDocumentation('json'))
    .pipe(gulp.dest('json-documentation'));
});
 
// Generate documentation for multiple files using normal glob syntax. 
// Note that this generates one documentation output, so that it can 
// easily cross-reference and use types. 
gulp.task('documentation-multiple-files', function () {
  return gulp.src('./src/*.js')
    .pipe(gulpDocumentation('md'))
    .pipe(gulp.dest('md-documentation'));
});
 
 
// If you're using HTML documentation, you can specify additional 'name' 
// and 'version' options 
gulp.task('documentation-html-options', function () {
  return gulp.src('./src/*.js')
    .pipe(gulpDocumentation('html', {}, {
      name: 'My Project',
      version: '1.0.0'
    }))
    .pipe(gulp.dest('html-documentation'));
});
 
// Document non-JavaScript files with JSDoc comments using polyglot: true 
gulp.task('documentation-for-cplusplus', function () {
  return gulp.src('./src/*.cpp')
    .pipe(gulpDocumentation('html', { polyglot: true }, {
      name: 'My Project',
      version: '1.0.0'
    }))
    .pipe(gulp.dest('html-documentation'));
});