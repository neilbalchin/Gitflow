var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync    = require('browser-sync');
var reload         = browserSync.reload;

var SOURCEPATH = {
    imgSource:  'src/img/',
    jsSource:   'src/js/',
    scssSource: 'src/scss/*.scss',
    htmlSource: 'src/*.html'
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

gulp.task('serve', ['sass'], function(){
    browserSync.init([APPPATH.css + '/*.css', APPPATH.root + '/*.html', APPPATH.js + '/*.js'], {
        server: {
            baseDir: APPPATH.root
        }
    })
});

gulp.task('copy', function(){
    gulp.src(SOURCEPATH.htmlSource)
    .pipe(gulp.dest(APPPATH.root))
});

gulp.task('watch', ['serve','sass','copy'], function(){
    gulp.watch([SOURCEPATH.scssSource], ['sass']);
    gulp.watch([SOURCEPATH.htmlSource], ['copy']);
});

gulp.task('default', ['watch']);

