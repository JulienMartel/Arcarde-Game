const gulp = require('gulp')
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');

// const browserSync = require('browser-sync').create()
// const sass = require('gulp-sass');
// const concat = require('gulp-concat');
// const uglify = require('gulp-uglify');
// const rename = require("gulp-rename");


gulp.task("styles", () => 
  gulp.src('src/css/**/*.css')
    .pipe(autoprefixer())
    .pipe(cleanCSS())

    // .pipe(sass().on('error', sass.logError))
    // .pipe(concat('styles.css'))
    // .pipe(gulp.dest('dest/css/'))
    // .pipe(browserSync.stream())
)

gulp.task("img", () => 
  gulp.src('src/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dest/images'))
)