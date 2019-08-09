const postcss = require('gulp-postcss');
const tailwindcss = require('tailwindcss');
const sass = require('gulp-sass');

gulp.task('default', function () {

  return gulp.src('tailwindcss/styles.scss')

    .pipe(sass().on('error', sass.logError))

    .pipe(postcss([

      tailwindcss('tailwindcss/tailwind.config.js')

    ]))

    .pipe(gulp.dest('src/'))
});
