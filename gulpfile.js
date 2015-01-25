var gulp = require("gulp")
var gulp_sass = require("gulp-sass")
var gulp_util = require("gulp-util")
var gulp_prefixify_css = require("gulp-autoprefixer")
var gulp_minify_css = require("gulp-minify-css")
var gulp_minify_html = require("gulp-minify-html")
var gulp_json_transform = require("gulp-json-transform")
var gulp_livereload = require("gulp-livereload")
var gulp_uglify = require("gulp-uglify")
var gulp_if = require("gulp-if")

var del = require("del")
var chalk = require("chalk")
var express = require("express")
var vinyl_buffer = require("vinyl-buffer")
var vinyl_source = require("vinyl-source-stream")

var NodeWebkitBuilder = require("node-webkit-builder")

var browserify = require("browserify")
var reactify = require("reactify")
var envify = require("envify/custom")
var aliasify = require("aliasify")

gulp.task("scripts", function()
{
    browserify("./source/index.js")
        .transform("reactify")
        .transform(envify({
           platform: process.env.platform
        }))
        .transform(aliasify.configure({
           configDir: __dirname,
           aliases: {
               "<source>": "./source",
               "<styles>": "./source/styles",
               "<scripts>": "./source/scripts",
               "<assets>": "./source/assets"
           }
        }))
        .bundle()
        .on('error', on_error)
        .pipe(vinyl_source("index.js"))
        .pipe(vinyl_buffer())
        .pipe(gulp_if(is_ghpages(), gulp_uglify()))
        .pipe(gulp.dest("./gulps"))
        .pipe(gulp_livereload())
});

gulp.task("styles", function()
{
    gulp.src("./source/index.scss")
        .pipe(gulp_sass())
        .on('error', on_error)
        .pipe(gulp_prefixify_css())
        .pipe(gulp_if(is_ghpages(), gulp_minify_css()))
        .pipe(gulp.dest("./gulps"))
        .pipe(gulp_livereload())
})

gulp.task("markup", function()
{
    gulp.src("./source/index.html")
        .pipe(gulp_if(is_ghpages(), gulp_minify_html()))
        .pipe(gulp.dest("./gulps"))
        .pipe(gulp_livereload())
})

gulp.task("assets", function()
{
    gulp.src("./source/assets/**/*", {base: "./source"})
        .pipe(gulp.dest("./gulps"))
        .pipe(gulp_livereload())
    gulp.src("./source/index.ico")
        .pipe(gulp.dest("./gulps"))
        .pipe(gulp_livereload())
})

gulp.task("configs", function()
{
    gulp.src("./package.json")
        .pipe(gulp_json_transform(function(data)
        {
            delete data["dependencies"]
            delete data["devDependencies"]
            return data
        }, 2))
        .pipe(gulp.dest("./gulps"))
})

gulp.task("default", ["scripts", "styles", "markup", "assets", "configs"]);

gulp.task("ghpages", function()
{
    process.env.platform = "ghpages"
    del(["./gulps"], function()
    {
        gulp.start("default")
    })
})

gulp.task("nwapp", function()
{
    var nw = new NodeWebkitBuilder({
        files: "./gulps/**/*",
        platforms: [
            "win32", "win64",
            "osx32", "osx64",
            "linux32", "linux64"
        ],
        cacheDir: "node_webkit_cache",
        buildType: "versioned",
        buildDir: "nwapps"
    })
    
    nw.on("log", console.log)
    
    nw.build().then(function () {
        console.log("OK!");
    }).catch(function (error) {
        console.error(error);
    });
})

gulp.task("watch", function()
{
    var server = express()
    server.use(express.static("./gulps"))
    server.listen(1271)
    gulp_livereload.listen()

    gulp.watch("./source/**/*.js", ["scripts"])
    gulp.watch("./source/**/*.scss", ["styles"])
    gulp.watch("./source/index.html", ["markup"])
    gulp.watch("./source/assets/**/*", ["assets"])
})

function is_ghpages()
{
    return process.env.platform == "ghpages"
}

function on_error(error)
{
    gulp_util.log(chalk.bold.red(error.message))
    gulp_util.beep()
}
