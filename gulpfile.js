var gulp           = require('gulp');
var sass           = require('gulp-sass');
var browserSync    = require('browser-sync');
var reload         = browserSync.reload;
var clean          = require('gulp-clean');
var autoprefixer   = require('gulp-autoprefixer');
var concat         = require('gulp-concat');
var jquery         = require('jquery');
var newer          = require('gulp-newer');
var imagemin       = require('gulp-imagemin');
var deleted        = require('gulp-deleted');
var collate        = require('gulp-collate');
var changed        = require('gulp-changed');

var SOURCEPATH = {
    imgSource:  'src/img/**',
    jsSource:   'src/js/**',
    jsSourceDest:'src/js',
    scssSource: 'src/scss/*.scss',
    htmlSource: 'src/*.html'
}
var APPPATH = {
    root:  'app/',
    css:   'app/css',
    js:    'app/js',
    fonts: 'app/fonts',
    img:   'app/img'
}

gulp.task('jquery', function(){
    gulp.src('./node_modules/jquery/dist/jquery.min.js')
    .pipe(gulp.dest(SOURCEPATH.jsSourceDest))
    .pipe(gulp.dest(APPPATH.js))
});

gulp.task('sass', function(){
    gulp.src(SOURCEPATH.scssSource)
    .pipe(autoprefixer())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(concat('app.css'))
    .pipe(gulp.dest(APPPATH.css))
});

gulp.task('serve', ['sass'], function(){
    browserSync.init([APPPATH.css + '/*.css', APPPATH.root + '/*.html', APPPATH.js + '/*.js'], {
        server: {
            baseDir: APPPATH.root
        }
    })
});

gulp.task('html', function(){
    return gulp.src(SOURCEPATH.htmlSource)
    .pipe(gulp.dest(APPPATH.root))
});

gulp.task('clean-html', function(){
    return gulp.src(APPPATH.root + '/*.html', {read: false, force: true})
    .pipe(clean())
});

gulp.task('scripts', ['clean-scripts'], function(){
    gulp.src(SOURCEPATH.jsSource)
    .pipe(concat('main.js'))
    .pipe(gulp.dest(APPPATH.js))
});

gulp.task('clean-scripts', function(){
    return gulp.src(APPPATH.js + '/*.js', {read: false, force: true})
    .pipe(clean())
});

gulp.task('images', ['clean-images'], function(){
    return gulp.src(SOURCEPATH.imgSource)
    .pipe(newer(APPPATH.img))
    .pipe(imagemin())
    .pipe(gulp.dest(APPPATH.img))
});

gulp.task('clean-images', function(){
    var srcimg = ["src/img/**/*"]
    var destimg = "app/img/"
    gulp.src(srcimg)
    .pipe(collate("img"))
    .pipe(deleted(destimg, ["**/*"]))
    .pipe(changed(destimg))
    .pipe(gulp.dest(destimg))
});

gulp.task('watch', ['serve','sass','clean-html','clean-scripts','scripts','images','clean-images','html','jquery'], function(){
    gulp.watch([SOURCEPATH.scssSource], ['sass']);
    gulp.watch([SOURCEPATH.jsSource],   ['scripts']);
    gulp.watch([SOURCEPATH.htmlSource], ['html']);
    gulp.watch([SOURCEPATH.imgSource],  ['images']);
});

gulp.task('default', ['watch']);

//['serve','sass','clean-html','clean-scripts','scripts','moveFonts','images','html']