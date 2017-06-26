var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rigger = require('gulp-rigger'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    prefixer = require('gulp-autoprefixer'),
    cssmin = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;


var path = {
  build: {
    html: 'dist/',
    js: 'dist/js',
    css: 'dist/css',
    img: 'dist/images',
    fonts: 'dist/fonts'
  }, 
  app: {
    html: 'app/*.html', 
    js: 'app/js/main.js',
    css: 'app/scss/main.scss',
    img: 'app/images/**/*.*', 
    fonts: 'app/fonts/**/*.*'
  },
  watch: {
    html: 'app/**/*.html',
    js: 'app/js/**/*.js',
    style: 'app/scss/**/*.scss',
    img: 'app/images/**/*.*',
    fonts: 'app/fonts/**/*.*'
  },
  clean: './dist'
};

var config = {
  server: {
    baseDir: "./dist"
  },
  tunnel: true,
  host: 'localhost',
  port: 9000
};

gulp.task('webserver', function () {
  browserSync(config);
});

gulp.task('clean', function (cb) {
  rimraf(path.clean, cb);
});

gulp.task('html:build', function () {
  gulp.src(path.app.html) 
    .pipe(gulp.dest(path.build.html))
    .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
  gulp.src(path.app.js)
    .pipe(rigger())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
  gulp.src(path.app.css)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(prefixer())
    .pipe(cssmin())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
  gulp.src(path.app.img)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()],
      interlaced: true
    }))
    .pipe(gulp.dest(path.build.img))
    .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
  gulp.src(path.app.fonts)
    .pipe(gulp.dest(path.build.fonts));
});

gulp.task('build', [
  'html:build',
  'js:build',
  'style:build',
  'fonts:build',
  'image:build'
]);

gulp.task('watch', function(){
  gulp.watch([path.watch.html], function(event, cb) {
    gulp.start('html:build');
  });
  gulp.watch([path.watch.style], function(event, cb) {
    gulp.start('style:build');
  });
  gulp.watch([path.watch.js], function(event, cb) {
    gulp.start('js:build');
  });
  gulp.watch([path.watch.img], function(event, cb) {
    gulp.start('image:build');
  });
  gulp.watch([path.watch.fonts], function(event, cb) {
    gulp.start('fonts:build');
  });
});

gulp.task('default', ['build', 'webserver', 'watch']);