const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const $ = gulpLoadPlugins();

const md5 = require('md5');
const browserSync = require("browser-sync");
const runSequence = require('run-sequence');
const argv = require('yargs').argv;
const reload = browserSync.reload;


/**
* 源文件路径
*/
var src = {
    html:   './src/*.html',

    js:    ['./src/js/*.js'],

    sass:   ['./src/sass/*.scss'],

    css:   ['./src/css/*.css']
};

/**
* 打包输出文件路径
*/
var dist = {
    js:   './dist/',
    css:  './dist/'
};


/**
* gulp clean ：清除 ./dist 下的所有文件
*/
gulp.task('clean', function() {
    gulp.src('./dist/*')
        .pipe($.clean({force: true}));
});

/**
* compass编译
*/
gulp.task('compass', function() {
    gulp.src(src.sass)
        .pipe($.compass({
            css: './src/css/',
            sass: './src/sass/',
            style: 'compressed', //CSS處理方式，預設 nested（expanded, nested, compact, compressed）
            comments: false,     //是否要註解，預設(true)
        }))
        .pipe(reload({stream: true}));
});

/**
* css合并压缩输出
*/
gulp.task('css', function() {
    gulp.src(src.css)
        // .pipe($.sourcemaps.init())
        .pipe($.concat('angular-ui-ellipsis.css'))
        .pipe(gulp.dest(dist.css))
        .pipe($.cleanCss())
        .pipe($.rename({ extname: '.min.css' }))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(dist.css));
});


/**
* jshint ：校验js语法是否符合规范
*/
gulp.task('jshint', function() {
    gulp.src(src.js)
        .pipe($.jshint())
        .pipe($.jshint.reporter('default'));
});

/**
* js合并压缩输出
*/
gulp.task('js', function() {
    gulp.src(src.js)
        // .pipe($.sourcemaps.init())
        .pipe($.concat('angular-ui-ellipsis.js'))
        .pipe(gulp.dest(dist.js))
        .pipe($.ngAnnotate())
        .pipe($.ngmin({dynamic: false}))
        .pipe($.sourcemaps.write())
        .pipe($.uglify())
        .pipe($.rename({ extname: '.min.js' }))
        .pipe(gulp.dest(dist.js));
});


/**
* 开发预览
* 集成 compass, js
* 实时监听变化刷新
*/
gulp.task('serve', function(){
    runSequence(['compass'], () => {
        browserSync({
            notify: false,
            port: 9000,
            server: {
                baseDir: ["./", "./src"]
            }
        });
    });

    gulp.watch([
        src.html,
        src.js,
        src.css,
        src.sass
    ]).on('change', function() {
        gulp.start('compass');
        reload();
    });

    gulp.watch();

});

gulp.task('default', ['clean', 'css', 'js']);

gulp.task('help', function() {
    console.log('   gulp serve           开发预览');
    console.log('   gulp                 打包压缩');
});
