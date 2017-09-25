'use strict';

//add all gulp variables to your page, then ensure you "nmpn install gulp_name --save-dev" in the command line to be able to use in the future.
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
      .pipe(sass()) //application that converts them
      .pipe(gulp.dest('./assets/css/')); //where it puts the final product (destination). In this case it created a css file in our assets directory.
  });

gulp.task('watch', function () { //once you run this, it will automatically compile any changes you create in your scss file to css.
  gulp.watch('./assets/sass/**/*.scss', //look for any changes in this file then run the ['sass'] command below. 
  ['sass']);
});

gulp.task('default', ['sass', 'watch']); //when you run default, it will run both sass and watch functions. in the command line, "gulp" will run the default function. If you type "gulp sass" it will only run sass.

/////////////////////////////////////////////////


gulp.task('validate', function() { //this task will report errors to the "errors" folder for all .css files.
    return gulp.src('./assets/css/*.css') //
      .pipe(validate()) //
      .pipe(gulp.dest('./assets/css/errors')); //
  });

/////////////////////////////////////////////////

gulp.task('htmlhint', function() { //this task is an HTML wrapper that will validate all HTML files.
    return gulp.src('./*.html') 
      .pipe(htmlhint()) 
      .pipe(htmlhint.reporter()); 
  });

///////////////////////////////////////////////

  gulp.task('babel', function() { //this task will report any issues for all .js files in the output folder.
    return gulp.src('./assets/js/*.js') 
      .pipe(babel()) 
      .pipe(gulp.dest('./assets/js/output'));
  });

  ///////////////////////////////////////////////

  gulp.task('beautify', function() { //this task will change the indenting of all .js files to 50 and put into the beautify folder.
    return gulp.src('./*.js') 
      .pipe(beautify({indent_size: 50}))
      .pipe(gulp.dest('./assets/js/beautify'));
  });

  ///////////////////////////////////////////////

  gulp.task('cat', function() {   //this task will echo the contents of the package.json file to the command line.
    return gulp.src('package.json') 
      .pipe(cat())
  });


  ///////////////////////////////////////////////

  gulp.task('color', function () { //this task will print "Hello World" to the command line in red. 
    console.log(color('Hello World!', 'RED'));
});

 ///////////////////////////////////////////////

gulp.task('about', function() { //this task will produce an about.json file with the name and version of the application to the about folder.
    return gulp.src('./*.js') 
      .pipe(about())
      .pipe(gulp.dest('./assets/js/about'));
  });

///////////////////////////////////////////////
  gulp.task('jstasks', ['babel', 'beautify']); //default task for all JS related tasks.

  gulp.task('htmltasks', ['htmlhint']); //default task for all HTML related tasks.

  gulp.task('csstasks', ['sass', 'validate']); //default task for all css related tasks.