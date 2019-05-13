const gulp = require('gulp')
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

gulp.task("styles", () => 
  gulp.src('src/css/**/*.css')
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(gulp.dest('dest/css/'))
)

gulp.task("img", () => 
  gulp.src('src/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dest/images'))
)

gulp.task("js", () => 
  gulp.src('src/js/**/*.js' ['src/js/resources.js', 'src/js/app.js', 'src/js/engine.js'])
    .pipe(babel())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dest/js'))
)

gulp.task("html", () => 
  gulp.src('index.html')
    .pipe(gulp.dest('dest/'))
)
