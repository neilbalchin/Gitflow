var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync    = require('browser-sync');
var reload         = browserSync.reload;
var clean          = require('gulp-clean');

var SOURCEPATH = {
    imgSource:  'src/img/**',
    jsSource:   'src/js/**',
    scssSource: 'src/scss/*.scss',
    htmlSource: 'src/*.html'
}
var APPPATH = {
    root:  'app/',
    css:   'app/css',
    js:   'app/js',
    fonts:'app/fonts',
    img:  'app/img'
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
/*
gulp.task('copy', function(){
    gulp.src(SOURCEPATH.htmlSource)
    .pipe(gulp.dest(APPPATH.root))
});
*/
gulp.task('html', function(){
    return gulp.src(SOURCEPATH.htmlSource)
    .pipe(gulp.dest(APPPATH.root))
});

gulp.task('clean-html', function(){
    return gulp.src(APPPATH.root + '/*.html', {read: false, force: true})
    .pipe(clean())
});

gulp.task('clean-scripts', function(){
    return gulp.src(APPPATH.js + '/*.js', {read: false, force: true})
    .pipe(clean())
});

gulp.task('watch', ['serve','sass','clean-html','html'], function(){
    gulp.watch([SOURCEPATH.scssSource], ['sass']);
    // gulp.watch([SOURCEPATH.htmlSource], ['copy']);
    gulp.watch([SOURCEPATH.htmlSource], ['html']);
});

gulp.task('default', ['watch']);

