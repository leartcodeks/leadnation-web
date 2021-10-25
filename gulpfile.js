const { src, dest, watch, series } = require("gulp");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const imagemin = require("gulp-imagemin");
const terser = require("gulp-terser");
const browserSync = require("browser-sync").create();

function cssTask() {
    return src([
        "src/public/css/reset.css",
        "src/public/css/variables.css",
        "src/public/css/pages/home.css",
        "src/public/css/pages/service.css",
        "src/public/css/pages/about.css",
        "src/public/css/pages/contact.css",
        "src/public/css/pages/career.css",
    ])
        .pipe(concat("styles.css"))
        .pipe(postcss([autoprefixer('last 2 versions'), cssnano()]))
        .pipe(dest("src/public/dist"));
}



function jsTask() {
    return src("src/public/js/main.js")
        .pipe(babel({ presets: ["@babel/preset-env"] }))
        .pipe(terser())
        .pipe(dest("src/public/dist"));
}

function imageTask() {
    return src("src/public/images/*.{jpg,jpeg,png,svg+xml}")
        .pipe(imagemin([
            imagemin.mozjpeg({ quality: 80, progressive: true }),
            imagemin.optipng({ optimizationLevel: 2 })
        ]))
        .pipe(dest("src/public/dist/images"));
}

function browserSyncServe(cb) {
    browserSync.init({
        server: {
            baseDir: "src/public",
        },
        notify: {
            styles: {
                top: "auto",
                bottom: "0",
            },
        },
    });
    cb();
}

function browserSyncReload(cb) {
    browserSync.reload();
    cb();
}

function watchTask() {
    watch("src/public/*.html", browserSyncReload);
    watch(
        ["src/public/css/**/*.css",
            "src/public/js/**/*.js",
            "src/public/images/*.{jpg,jpeg,png,svg+xml}"
        ],
        series(cssTask, jsTask, imageTask, browserSyncReload)
    );
}


exports.default = series(cssTask, jsTask, imageTask, browserSyncServe, watchTask);
