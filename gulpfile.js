'use strict';

var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    postcss = require('gulp-postcss'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('autoprefixer'),
    rigger = require('gulp-rigger'),
    spritesmith = require('gulp.spritesmith'),
    browserSync = require("browser-sync"),
    iconfont = require("gulp-iconfont"),
    consolidate = require("gulp-consolidate"),
    rimraf = require('rimraf'),
    mqpacker = require("css-mqpacker"),
    twig_compile = require('gulp-twig-compile'),
    data = require('gulp-data'),
    path = require('path'),
    fs = require('fs'),
    reload = browserSync.reload;

// @TODO: move all paths to these variables
var src = {
    root    : 'src',
    jade    : 'src/jade',
    sass    : 'src/sass/',
    js      : 'src/js',
    img     : 'src/img',
    svg     : 'src/img/svg',
    helpers : 'src/helpers'
};

//** dest paths **
var dest = {
    root : 'site',
    html : 'site',
    css  : 'site/css',
    js   : 'site/js',
    img  : 'site/img'
};



//sass
gulp.task('sass', function() {

    var processors = [
        autoprefixer({browsers: ['last 10 versions'], cascade: false}),
        mqpacker({
            sort: function (a, b) {
                a = a.replace(/\D/g,'');
                b = b.replace(/\D/g,'');
                return b-a;
            }
        })
    ];

    return sass('src/sass/*.sass', {
        sourcemap: true,
        style: 'compact'
    })
    .on('error', function (err) {
      console.error('Error', err.message);
    })
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('site/css/'));
});


// sprite
gulp.task('sprite', function() {
    var spriteData = gulp.src(src.img + '/icons/*.png')
    // .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(spritesmith({
        imgName: 'icons.png',
        cssName: '_sprite.sass',
        imgPath: '../img/icons.png',
        cssFormat: 'sass',
        padding: 4,
        // algorithm: 'top-down',
        cssTemplate: src.helpers + '/sprite.template.mustache'
    }));
    spriteData.img
        .pipe(gulp.dest(dest.img));
    spriteData.css
        .pipe(gulp.dest(src.sass));
});

// html includes
gulp.task('html', function () {
    gulp.src('src/*.html')
        .pipe(rigger())
        .pipe(gulp.dest('site/'))
        .pipe(reload({stream: true}));
});

// js includes
gulp.task('js', function () {
    gulp.src('src/js/**/*.js')
        .pipe(rigger())
        .pipe(gulp.dest('site/js/'))
        .pipe(reload({stream: true}));
});

gulp.task('copy', function() {
   gulp.src('src/img/*.*')
   .pipe(gulp.dest('site/img/'));
   gulp.src('src/fonts/*.*')
   .pipe(gulp.dest('site/css/fonts/'));
   gulp.src('src/video/*.*')
   .pipe(gulp.dest('site/video/'));
   gulp.src('src/fonts/*.*')
   .pipe(gulp.dest('site/css/fonts/'));
});

gulp.task('delete', function (cb) {
    rimraf('./site', cb);
});



// jade, requires:
// = gulp-jade
// = gulp-changed
// = gulp-plumber
// = gulp-notify
// npm install gulp-jade && npm-install gulp-changed && npm-install gulp-plumber && npm-install gulp-notify
//  notify = require("browser-notify")
//  plumber = require("browser-plumber")
//  jade = require("browser-jade")
// watch:
//  gulp.watch(src.jade + '/**/*.jade', ['jade']);
//  gulp.watch([src.jade + '/_*.jade', src.jade + '/includes/*.jade'], ['jade-all']);
// gulp.task('jade', function() {
//     return gulp.src([src.jade + '/*.jade', '!' + src.jade + '/_*.jade', '!' + src.jade + '/includes/*.jade'])
//         .pipe(plumber({errorHandler: notify.onError(function(error){return error.message;})}))
//         .pipe(changed(dest.html, {extension: '.html'}))
//         .pipe(jade({pretty: true}))
//         .pipe(gulp.dest(dest.html));
// });

// //compile all jade files
// gulp.task('jade-all', function() {
//     return gulp.src([src.jade + '/*.jade', '!' + src.jade + '/_*.jade', '!' + src.jade + '/includes/*.jade'])
//         .pipe(plumber({errorHandler: notify.onError(function(error){return error.message;})}))
//         .pipe(jade({pretty: true}))
//         .pipe(gulp.dest(dest.html));
// });


// icon font
// var fontname = 'svgfont';
// gulp.task('font', function(){
//   return gulp.src('src/img/svg/*.svg')
//     // .pipe(svgmin())
//     .pipe(iconfont({
//       fontName: fontname,
//       appendUnicode: true,
//       formats: ['ttf', 'eot', 'woff', 'woff2'],
//       // timestamp: runTimestamp,
//       normalize: true,
//       fontHeight: 1001,
//       fontStyle: 'normal',
//       fontWeight: 'normal'
//     }))
//     .on('glyphs', function(glyphs, options) {
//         console.log(glyphs);
//         gulp.src('src/helpers/_svgfont.sass')
//             .pipe(consolidate('lodash', {
//                 glyphs: glyphs,
//                 fontName: fontname,
//                 fontPath: 'fonts/',
//                 className: 'icon'
//             }))
//             .pipe(gulp.dest('src/sass/'));
//         gulp.src('src/helpers/icons.html')
//             .pipe(consolidate('lodash', {
//                 glyphs: glyphs,
//                 fontName: fontname,
//                 fontPath: 'fonts/',
//                 className: 'icon',
//                 htmlBefore: '<i class="icon ',
//                 htmlAfter: '"></i>',
//                 htmlBr: ''
//             }))
//             .pipe(gulp.dest('site/'));
//     })
//     .pipe(gulp.dest('site/css/fonts/'))
//     .pipe(reload({stream: true}));
// });




//webserver
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: dest.root,
            // directory: true,
            // index: 'index.html'
        },
        files: [dest.html + '/*.html', dest.css + '/*.css', dest.js + '/*.js'],
        port: 8080,
        notify: false,
        ghostMode: false,
        online: false,
        open: true
    });
});

gulp.task('twig', function() {
    var twig = require('gulp-twig');
    gulp.src('./src/twig/**/[^_]*.twig')
        .pipe(data(function(file, cb) {
            var jsonFileUrl = './src/twig/data/' + path.basename(file.path, '.twig') + '.json';
            var templData = null;
            // return require('./src/twig/data/' + path.basename(file.path, '.twig') + '.json');
            readJSON(jsonFileUrl, function(data) {
                cb(null, data);
            });
        }))
        .pipe(twig())
        .pipe(gulp.dest('./site/'))
});

function readJSON(url, cb) {
   var jsonData;
   fs.readFile(url, 'utf8', function(err, data) {
       if (err) {
           console.log(err);
           return;
       }
       jsonData = JSON.parse(data);
       if (typeof cb === 'function') cb(jsonData);
       return jsonData;
   });
};

gulp.task('watch', function() {
    gulp.watch(src.sass + '/**/*', ['sass']);
    gulp.watch('src/js/*', ['js']);
    gulp.watch('src/img/*', ['copy']);
    gulp.watch('src/fonts/*', ['copy']);
    gulp.watch('src/img/svg/*', ['font']);
    gulp.watch(['src/*.html', 'src/partials/*.html'], ['html']);
    gulp.watch('src/twig/**/*.twig', ['twig']);
    gulp.watch(src.img + '/icons/*.png', ['sprite']);
});


gulp.task('default', ['browser-sync', 'watch'], function() {});
gulp.task('build', ['html','font','sprite','copy','js','sass','twig'], function() {});