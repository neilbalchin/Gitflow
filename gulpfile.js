var gulp = require('gulp');
var sass = require('gulp-sass');

var SOURCEPATH = {
    imgSource:  'src/img/',
    jsSource:   'src/js/',
    scssSource: 'src/scss/*.scss'
}
var APPPATH = {
    root:  'app/',
    css:   'app/css'
}

gulp.task('sass', function(){
    gulp.src(SOURCEPATH.scssSource)
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest(APPPATH.css))
});

gulp.task('watch', ['sass'], function(){
    gulp.watch([SOURCEPATH.scssSource], ['sass']);
});

gulp.task('default', ['watch']);

