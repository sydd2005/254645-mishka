"use strict";

var serveBase = "build";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var del = require("del");
var runSequence = require("run-sequence");
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var imagemin = require("gulp-imagemin");

gulp.task("imagemin", function () {
  return gulp.src("img/**/*.{png,jpg,svg}")
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.jpegtran({progressive: true}),
    imagemin.svgo()
  ]))
  .pipe(gulp.dest("img"));
});

gulp.task("style", function() {
  gulp.src("sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest(serveBase + "/css"))
    .pipe(server.stream())
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest(serveBase + "/css"));
});

gulp.task("sprite", function () {
  return gulp.src("img/*.svg")
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest(serveBase + "/img"));
});

gulp.task("html", function () {
  return gulp.src("*.html")
  .pipe(posthtml([
    include()
  ]))
  .pipe(gulp.dest(serveBase + "/"));
});

gulp.task("clean", function () {
  return del([serveBase + "/**", "!" + serveBase, "!" + serveBase + "/debug/**", "!" + serveBase + "/node_modules/**"]);
});

gulp.task("copy", function () {
  return gulp.src([
    "fonts/**/*.{woff,woff2}",
    "img/**",
    //"!img/**/*.svg",
    "css/normalize.css",
    "js/*.js",
    "!**/*.md"
  ], {
    base: "."
  })
  .pipe(gulp.dest(serveBase));
});

gulp.task("build", function (done) {
  runSequence(
    "clean",
    "copy",
    "style",
    "sprite",
    "html",
    done
  );
});

gulp.task("serve", function() {
  server.init({
    server: serveBase + "/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("sass/**/*.{scss,sass}", ["style"]).on("change", server.reload);
  gulp.watch("*.html", ["html"]).on("change", server.reload);
  gulp.watch("js/*.js", ["copy"]).on("change", server.reload);
});
