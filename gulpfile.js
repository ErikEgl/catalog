const { src, dest, series, watch } = require('gulp');
const sass = require('gulp-sass');
const csso = require('gulp-csso');
const include = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');
const del = require('del');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const sync = require('browser-sync').create();
const smartGrid = require('smart-grid');

function html() {
  return src('src/**.html')
    .pipe(
      include({
        prefix: '@@',
      })
    )
    .pipe(
      htmlmin({
        collapseWhitespace: true,
      })
    )
    .pipe(dest('dist'));
}

function scss() {
  return src('src/assets/scss/index.scss')
    .pipe(sass())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
      })
    )
    .pipe(csso())
    .pipe(concat('index.css'))
    .pipe(dest('dist/assets/css'));
}
function fonts() {
  return src('src/assets/fonts/**/*').pipe(dest('dist/assets/fonts'));
}
function img() {
  return src('src/assets/img/**/*').pipe(dest('dist/assets/img'));
}
function svg() {
  return src('src/assets/svg/**/*').pipe(dest('dist/assets/svg'));
}
function js() {
  return src('src/assets/js/**/index.js')
    .pipe(include())
    .pipe(dest('dist/assets/js'))
    .pipe(sync.stream());
}
function json() {
  return src('src/assets/js/server/catalog.json')
    .pipe(include())
    .pipe(dest('dist/assets/js/server'))
    .pipe(sync.stream());
}

function clear() {
  return del('dist');
}

function grid(done) {
  delete require.cache[require.resolve('./smartgrid.js')];
  let settings = require('./smartgrid.js');
  smartGrid('./src/assets/scss', settings);
  done();
}

function serve() {
  sync.init({
    server: './dist',
  });

  watch('src/**/**.html', series(html)).on('change', sync.reload);
  watch('src/assets/scss/**.scss', series(scss)).on('change', sync.reload);
  watch('src/assets/js/**/*.js', series(js)).on('change', sync.reload);
  watch('src/assets/js/**/*.json', series(json)).on('change', sync.reload);
  watch('src/assets/img/**.**', series(img)).on('change', sync.reload);
  watch('src/assets/svg/**.**', series(svg)).on('change', sync.reload);
  watch('./smartgrid.js', series(grid)).on('change', sync.reload);
}

exports.build = series(clear, scss, html, js, json, fonts, img, svg);
exports.serve = series(clear, scss, html, js, json, fonts, img, svg, serve);
exports.clear = clear;
exports.grid = grid;
