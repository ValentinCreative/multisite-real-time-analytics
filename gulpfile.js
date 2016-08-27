require('es6-promise').polyfill()

var gulp         = require('gulp')
var path         = require('path')
var plumber      = require('gulp-plumber')
var rename       = require('gulp-rename')
var concat       = require('gulp-concat')
var uglify       = require('gulp-uglify')
var imagemin     = require('gulp-imagemin')
var cache        = require('gulp-cache')
var minifycss    = require('gulp-minify-css')
var watch        = require('gulp-watch')
var babel        = require('gulp-babel')
var iconfont     = require('gulp-iconfont')
var iconfontCss  = require('gulp-iconfont-css')
var svg2png      = require('gulp-svg2png')
var data         = require('gulp-data')
var source       = require('vinyl-source-stream')
var buffer       = require('vinyl-buffer')
var webpack      = require('gulp-webpack')
var browserSync  = require('browser-sync').create();

var sass         = require('gulp-sass')
var cssmin       = require('gulp-cssmin')
var autoprefixer = require('gulp-autoprefixer')

var project      = path.join(__dirname + '/')
var ignore       = path.join('!' + project)


gulp.task('test', function() {
    console.log(project)
})

var iconsFontName      = 'analytics-icons'

var src = {
    src          : project + 'src/',
    scss         : project + 'src/css/',
    js           : project + 'src/js/',
    images       : project + 'src/images/',
    icons        : project + 'src/icons/',
    bower        : project + 'bower_components/',
    node_modules : project + 'node_modules/',
}

var dist = {
    dist       : project + 'assets/',
    css        : project + 'assets/css/',
    js         : project + 'assets/js/',
    images     : project + 'assets/images/',
}

var projectPath = '/'

var paths = {
    css    : projectPath + 'assets/css/',
    js     : projectPath + 'assets/js/',
    images : projectPath + 'assets/images/',
}

var sassConfig = {
    sourceComments  : true,
    outputStyle     : 'expanded',
    errLogToConsole : true
}

var autoprefixerConfig = {
    browsers : ['last 2 versions'],
    cascade  : true
}

gulp.task('images', function(){
    gulp.src(src.images + '**/*')
        .pipe(cache(imagemin({
            optimizationLevel : 3,
            progressive       : true,
            interlaced        : true,
            svgoPlugins: [
                {removeViewBox: false},
                {cleanupIDs: false}
            ],
        })))
        .pipe(gulp.dest(dist.images))
})

gulp.task('svg2png', function () {
    gulp.src(src.images + '**/*.svg')
        .pipe(svg2png())
        .pipe(gulp.dest(dist.images))
})

gulp.task('icons', function(){
    gulp.src([src.icons + '*.svg'])
        .pipe(iconfontCss({
            fontName: iconsFontName,
            path: project + 'src/css/base/_icons-template.scss',
            targetPath: '../../../src/css/base/_icons.scss',
            fontPath: projectPath + 'assets/fonts/icons/'
        }))
        .pipe(iconfont({
            fontName: iconsFontName
        }))
        .pipe(gulp.dest(project + 'assets/fonts/icons/'))
})

gulp.task('styles', function() {
    gulp.src([
        src.scss + 'app.scss',
    ])
        .pipe(sass(sassConfig))
        .pipe(gulp.dest(dist.css))
        .pipe(browserSync.stream())
})

gulp.task('prefix', function() {
    gulp.src([
            dist.css + '**/*.css',
            ignore + 'assets/css/**/*.min.css',
        ])
        .pipe(autoprefixer())
        .pipe(gulp.dest(dist.css))
})

gulp.task('cssmin', function () {
    gulp.src([
        dist.css + '**/*.css',
        ignore + 'assets/css/**/*.min.css',
    ])
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(dist.css))
})

gulp.task('scripts', ['scripts-main', 'scripts-min'])

gulp.task('scripts-main', function() {
    return gulp.src([src.js + 'app.js'])
        .pipe(webpack({
            entry: {
                app: src.js + 'app.js',
            },
            output: {
                filename: 'app.js',
            },
            module: {
              loaders: [
                {
                  test: /\.js$/,
                  exclude: /(node_modules|bower_components)/,
                  loader: 'babel', // 'babel-loader' is also a legal name to reference
                  query: {
                    presets: ['es2015'],
                    plugins: ['transform-object-assign', 'transform-object-rest-spread']
                  }
                }
              ]
            },
        }))
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message)
                this.emit('end')
            }
        }))
        .pipe(gulp.dest(dist.js))
        .pipe(browserSync.stream())
})


gulp.task('scripts-min', function(){
    gulp.src([
            dist.js + '**/*.js',
            ignore + 'assets/js/**/*.min.js',
        ])
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(dist.js))
})

gulp.task('watch', ['images','svg2png','icons','scripts-main','styles'], function() {

    browserSync.init({
        server: project
    });

    gulp.watch(src.js + '**/*.js', ['scripts-main'])
    gulp.watch(src.scss + '**/*.scss', ['styles'])
    gulp.watch(src.images + '**/*.{jpg,jpeg,png,gif,svg}', ['images'])
    gulp.watch(src.icons + '*.svg', ['icons'])
    gulp.watch(src.images + '**/*.svg', ['svg2png'])
    gulp.watch(project + '*.html').on('change', browserSync.reload);
});
