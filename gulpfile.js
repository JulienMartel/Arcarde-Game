const gulp = require('gulp')
const autoprefixer = require('gulp-autoprefixer');

// const browserSync = require('browser-sync').create()
// const sass = require('gulp-sass');
// const concat = require('gulp-concat');
// const cleanCSS = require('gulp-clean-css');
// const imagemin = require('gulp-imagemin');
// const babel = require('gulp-babel');
// const uglify = require('gulp-uglify');
// const rename = require("gulp-rename");


gulp.task("styles", () => 
  gulp.src('src/css/**/*.css')
    .pipe(autoprefixer())
    // .pipe(sass().on('error', sass.logError))
    // .pipe(concat('styles.css'))
    // .pipe(cleanCSS())
    // .pipe(gulp.dest('dest/css/'))
    // .pipe(browserSync.stream())
)