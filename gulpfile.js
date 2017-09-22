'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var validate = require('gulp-w3c-css');
var htmlhint = require('gulp-htmlhint');
var babel = require('gulp-babel');
var beautify = require('gulp-beautify');
var about = require('gulp-about');
var cat = require('gulp-cat');
var color = require('gulp-color')


gulp.task('sass', function() { //when this is run, run the conversion of sass files to css
    return gulp.src('./assets/sass/**/*.scss') //where to look for scss files, the stars mean anything in that directory with .scss
      .pipe(sass()) //application that convert them
      .pipe(gulp.dest('./assets/css/')); //where it puts the final product (destination). In this case it created a css file in our stylesheets directory.
  });

gulp.task('watch', function () { //once you run this, it will automatically compile any changes you create in your scss file to css.
  gulp.watch('./assets/sass/**/*.scss', //look for any changes in this file then run the ['sass'] command below. 
  ['sass']);
});

gulp.task('default', ['sass', 'watch']); //when you run default, it will run both sass and watch functions. in the command line, "gulp" will run the default function. If you type "gulp sass" it will only run sass.

/////////////////////////////////////////////////


gulp.task('validate', function() { //when this is run, run the conversion of sass files to css
    return gulp.src('./assets/css/*.css') //where to look for scss files, the stars mean anything in that directory with .scss
      .pipe(validate()) //application that convert them
      .pipe(gulp.dest('./assets/css/errors')); //where it puts the final product (destination). In this case it created a css file in our stylesheets directory.
  });

/////////////////////////////////////////////////

gulp.task('htmlhint', function() { 
    return gulp.src('./*.html') 
      .pipe(htmlhint()) 
      .pipe(htmlhint.reporter()); 
  });

///////////////////////////////////////////////

  gulp.task('babel', function() { 
    return gulp.src('./assets/js/*.js') 
      .pipe(babel()) 
      .pipe(gulp.dest('./assets/js/output'));
  });

  ///////////////////////////////////////////////

  gulp.task('beautify', function() { 
    return gulp.src('./*.js') 
      .pipe(beautify({indent_size: 50}))
      .pipe(gulp.dest('./assets/js/beautify'));
  });

  ///////////////////////////////////////////////

  gulp.task('cat', function() { 
    return gulp.src('package.json') 
      .pipe(cat())
  });


  ///////////////////////////////////////////////

  gulp.task('color', function () {
    console.log(color('Hello World!', 'RED'));
});

 ///////////////////////////////////////////////

gulp.task('about', function() { 
    return gulp.src('./*.js') 
      .pipe(about())
      .pipe(gulp.dest('./assets/js/about'));
  });