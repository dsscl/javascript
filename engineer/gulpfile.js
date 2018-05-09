var gulp = require("gulp"),
	gif = require("gulp-if"),
	gutil = require("gulp-util"),
	gless = require("gulp-less"),
	rename = require("gulp-rename"),
	gminifycss = require("gulp-minify-css"),
	guglify = require("gulp-uglify"),
	ghtmlmin = require("gulp-htmlmin"),
	//	rev = require("zjkj-md5"),
	//	revCollector = require("zjkj-md5-apply"),
	browserify = require("browserify"),
	through2 = require("through2"),
	gulpBrowserify = require("gulp-browserify"),
	gulpzip = require("gulp-zip"),
	gulpConfig = require("./config"),
	gChange = require("gulp-changed"),
	imagemin = require("gulp-imagemin"),
	changed = require("gulp-changed"),
	debug = require("gulp-debug"),
	jsConfig = require("./dev/dist/js/swagger/config.json"),
	babelify = require("babelify");

var opConfig = {};
if(jsConfig.environment !== "production") {
	opConfig = {
		mangle: false,
		compress: false
	}
} else {
	opConfig = {
		mangle: true,
		compress: true
	}
}

//-----------------------------gulp指令-----------------------------------
gulp.task("default", function() {
	console.log(" ")
	console.log("gulp 指令");
	console.log("-------------------------------------------------------------------------------");
	console.log(" ")
	console.log("gulp dev		        运行项目");
	console.log(" ")
	console.log("gulp buildWatchMain		监听js以及less文件改动自动编译");
	console.log(" ")
	console.log("gulp buildCssWatchMain		监听css文件改动自动编译");
	console.log(" ")
	console.log("gulp buildJsWatchMain		监听js文件改动自动编译");
	console.log(" ")
	console.log("gulp autoBuildMvcJs		监听新版js文件改动自动编译");
	console.log(" ")
	console.log("gulp toBuildDev			git文件更新下来以后用该命令编译css和js");
	console.log(" ")
	console.log("gulp toZip			生成更新服务器的项目压缩文件");
	console.log(" ")
	console.log("-------------------------------------------------------------------------------")

})

//生产需要的文件拷贝
gulp.task("copyFile", function() {
	return gulp.src(["dev/dist/**/*", "dev/modules/**/*", "!dev/dist/gulp/**/*", "!dev/modules/**/node_modules/**/*"], {
			base: "./dev"
		})
		.pipe(gulp.dest("build"));
})

//less生成css并压缩
gulp.task("toMiniCssPc", ["copyFile"], function() {
	return gulp.src([
			"build/dist/less/patientBasic*.less",
			"build/dist/less/basicBackstage*.less"
		], {
			base: "build/dist/less"
		})
		.pipe(gless().on("error", function(e) {
			console.log(e);
		}))
		.pipe(gminifycss().on("error", function(e) {
			console.log(e);
		}))
		//			.pipe(rev())
		//			.pipe(gulp.dest("build/dist"))
		//			.pipe(rev.manifest())
		.pipe(gulp.dest("build/dist/css"))
})
gulp.task("toMiniCssPhone", ["copyFile"], function() {
	return gulp.src([
			"build/dist/lessPhone/basic*.less"
		], {
			base: "build/dist/lessPhone"
		})
		.pipe(gless().on("error", function(e) {
			console.log(e);
		}))
		.pipe(gminifycss().on("error", function(e) {
			console.log(e);
		}))
		//			.pipe(rev())
		//			.pipe(gulp.dest("build/dist"))
		//			.pipe(rev.manifest())
		.pipe(gulp.dest("build/dist/cssPhone"))
})
gulp.task("toMiniCss", ["toMiniCssPhone", "toMiniCssPc"])

//js代码生成
gulp.task('miniJs', ["copyFile"], function() {
	return gulp.src([
			'build/dist/js/swagger/build*/*.js',
			'!build/dist/js/swagger/build*/bun-*.js'
			//		'build/dist/js/mvc/build*/*.js',
			//		'!build/dist/js/mvc/build*/bun-*.js'
		], {
			base: "build/dist/js"
		})
		.pipe(through2.obj(function(file, enc, next) {
			browserify(file.path)
				.bundle(function(err, res) {
					err && console.log(err.stack);
					file.contents = res;
					next(null, file);
				});
		}))
		.pipe(rename({
			prefix: 'bun-'
		}))
		.pipe(guglify(opConfig).on("error", function(e) {
			console.log(e);
		}))
		//		.pipe(rev())
		.pipe(gulp.dest("build/dist/js"))
	//		.pipe(rev.manifest())
	//		.pipe(gulp.dest("build/rev/js"))
});

//MvcJs代码生成
gulp.task('miniMvcJs', ["copyFile"], function() {
	return gulp.src([
			'build/dist/js/mvc/build*/*.js',
			'!build/dist/js/mvc/build*/bun-*.js'
		], {
			base: "build/dist/js"
		})
		.pipe(through2.obj(function(file, enc, next) {
			browserify(file.path)
				.transform("babelify", {
					presets: ["es2015", "stage-3"],
					plugins: ['transform-runtime']
				})
				.bundle(function(err, res) {
					err && console.log(err.stack);
					file.contents = res;
					next(null, file);
				});
		}))
		.pipe(rename({
			prefix: 'bun-'
		}))
		.pipe(guglify(opConfig).on("error", function(e) {
			console.log(e);
		}))
		.pipe(gulp.dest("build/dist/js"))
});

//总的默认文件
gulp.task("prepare", ["miniJs", "toMiniCss", "miniMvcJs"]);

//html更新相应的地址信息。
gulp.task('miniHtml', ["prepare"], function() {
	return gulp.src(['build/rev/**/*.json', 'build/modules/**/*.html'], {
			base: ".build/modules"
		})
		.pipe(ghtmlmin({
			removeComments: true,
			collapseWhitespace: false,
			collapseBooleanAttributes: true,
			removeEmptyAttributes: true,
			removeScriptTypeAttributes: true,
			removeStyleLinkTypeAttributes: true,
			minifyJS: true,
			minifyCSS: true
		}).on("error", function(e) {
			console.log(e);
		}))
		//  .pipe(revCollector())
		.pipe(gulp.dest('build/modules'));
});

//打包压缩
gulp.task("toZip", ["miniHtml"], function() {
	var date = new Date();
	var dateInfo = date.getFullYear() + "-" + (Array(2).join(0) + (date.getMonth() + 1)).slice(-2) + "-" + (Array(2).join(0) + date.getDate()).slice(-2);
	return gulp.src(['build/modules/**/*.*', "build/dist/**/*.*", "build/plantform/**/*.*"], {
			base: "build"
		})
		.pipe(gulpzip(jsConfig.environment + 'Update' + dateInfo + '.zip'))
		.pipe(gulp.dest('build'));
})

//-------------------------------开发目录下重新将需要生成的css和js生成一遍----------
//js构建
gulp.task('toBuildJs', function() {
	return gulp.src([
			'dev/dist/js/swagger/build*/*.js',
			'!dev/dist/js/swagger/build*/bun-*.js'
		], {
			base: "dev/dist/js"
		})
		.pipe(through2.obj(function(file, enc, next) {
			browserify(file.path)
				.bundle(function(err, res) {
					err && console.log(err.stack);
					file.contents = res;
					next(null, file);
				});
		}))
		.pipe(rename({
			prefix: 'bun-'
		}))
		.pipe(gulp.dest("dev/dist/js"));
});
//MvcJs构建
gulp.task('toBuildMvcJs', function() {
	return gulp.src([
			'dev/dist/js/mvc/build*/*.js',
			'!dev/dist/js/mvc/build*/bun-*.js'
		], {
			base: "dev/dist/js"
		})
		.pipe(through2.obj(function(file, enc, next) {
			browserify(file.path)
				.transform("babelify", {
					presets: ["es2015", "stage-3"],
					plugins: ['transform-runtime']
				})
				.bundle(function(err, res) {
					err && console.log(err.stack);
					file.contents = res;
					next(null, file);
				});
		}))
		.pipe(rename({
			prefix: 'bun-'
		}))
		.pipe(gulp.dest("dev/dist/js"));
});
//css构建
function toCss(info) {
	gulp.task(info.taskName, function() {
		return gulp.src(info.src)
			.pipe(gless().on("error", function(e) {
				console.log(e);
			}))
			.pipe(gminifycss().on("error", function(e) {
				console.log(e);
			}))
			.pipe(gulp.dest(info.dest))
	})
}
var gulpLess = gulpConfig.less;
var buildName = [];
for(var key in gulpLess) {
	var info = gulpLess[key];
	toCss(info);
	buildName.push(info.taskName);
}
gulp.task("toBuildCss", buildName);
gulp.task("toBuildDev", ["toBuildCss", "toBuildJs", "toBuildMvcJs"]);

//-------------------------------开发环境动态生成js以及动态编译less------------------------
//动态生成css
//gulp.watch("lessToCss",function(){
//	return gulp.src("dist/less*/**/*.less",{base:"./"})
//})

// import connect from 'gulp-connect'

var connect = require('gulp-connect')

gulp.task('dev', function() {
	connect.server({
		root: [__dirname],
		livereload: true,
		port: 2334
	})
})

//--------------------------------自动监听文件更新---------------------------------
//监听js文件更新
var jsBuildJson = {
	build: "build",
	buildPhone: "buildPhone",
	buildScan: "buildScan"
}
var jsBuildAuto = [];

function buildJsWatch(info) {
	return gulp.task('watch' + info, function() {
		gulp.src(['dev/dist/js/swagger/' + info + '/*.js', '!dev/dist/js/swagger/' + info + '/bun-*.js'], {
				base: "./dev/dist/js/swagger/" + info
			})
			.pipe(changed("./dev/dist/js/swagger/c" + info))
			.pipe(debug({
				title: '修改js文件:'
			}))
			.pipe(gulp.dest("./dev/dist/js/swagger/c" + info))
			.pipe(through2.obj(function(file, enc, next) {
				browserify(file.path)
					.bundle(function(err, res) {
						err && console.log(err.stack);
						file.contents = res;
						next(null, file);
					});
			}))
			.pipe(rename({
				prefix: 'bun-'
			}))
			.pipe(gulp.dest("./dev/dist/js/swagger/" + info));
	});

}

function buildJsWatchFile(info) {
	return gulp.task("watchFile" + info, function() {
		gulp.watch(['dev/dist/js/swagger/' + info + '/*.js', '!dev/dist/js/swagger/' + info + '/bun-*.js'], ["watch" + info]);
	})
}
//监听css文件更新
var cssBuildJson = {
	build: {
		name: "build",
		watchSource: "dev/dist/less/**/*.less",
		source: "./dev/dist/less/patientBasic*.less",
		target: "./dev/dist/css"
	},
	buildPhone: {
		name: "buildPhone",
		watchSource: "dev/dist/lessPhone/**/*.less",
		source: "./dev/dist/lessPhone/basic*.less",
		target: "./dev/dist/cssPhone"
	}
}
var cssBuildAuto = [];

function buildCssWatch(infoCss) {
	return gulp.task("watchCss" + infoCss.name, function() {
		gulp.src(infoCss.source)
			.pipe(debug({
				title: '修改css文件:'
			}))
			.pipe(gless().on("error", function(e) {
				console.log(e);
			}))
			.pipe(gminifycss().on("error", function(e) {
				console.log(e);
			}))
			.pipe(gulp.dest(infoCss.target))
	})
}

function buildCssWatchFile(infoCss) {
	return gulp.task("wathcCssFile" + infoCss.name, function() {
		gulp.watch(infoCss.watchSource, ["watchCss" + infoCss.name]);
	})
}
for(var key in jsBuildJson) {
	var info = jsBuildJson[key];
	buildJsWatch(info);
	buildJsWatchFile(info);
	jsBuildAuto.push("watchFile" + info);
	console.log(jsBuildAuto);
}
for(var key in cssBuildJson) {
	var infoCss = cssBuildJson[key];
	buildCssWatch(infoCss);
	buildCssWatchFile(infoCss);
	cssBuildAuto.push("wathcCssFile" + infoCss.name);
	console.log(cssBuildAuto);
}
gulp.task("buildJsWatchMain", jsBuildAuto);
gulp.task("buildCssWatchMain", cssBuildAuto);
gulp.task("buildWatchMain", ["buildJsWatchMain", "buildCssWatchMain"]);

//新增js自动编译
var mvcJsBuildJson = {
	buildPc: "buildPc",
	buildPhone: "buildPhone"
}
var mvcJsBuildAuto = [];

function buildMvcJsWatchFile(info) {
	return gulp.task("watchMvcFile" + info, function() {
		gulp.watch(['dev/dist/js/mvc/' + info + '*/*.js', '!dev/dist/js/mvc/' + info + '*/bun-*.js'], function(event) {
			gulp.src(event.path, {
					base: "dev/dist/js/mvc"
				})
				.pipe(debug({
					title: '修改js文件:'
				}))
				.pipe(through2.obj(function(file, enc, next) {
					browserify(file.path)
						.transform("babelify", {
						   	presets: ["es2015", "stage-3"],
						   	plugins: ['transform-runtime']
						})
						.bundle(function(err, res) {
							err && console.log(err.stack);
							file.contents = res;
							next(null, file);
						});
				}))
				.pipe(rename({
					prefix: 'bun-'
				}))
				.pipe(gulp.dest("./dev/dist/js/mvc/"));
		});
	})
}
for(var key in mvcJsBuildJson) {
	var info = mvcJsBuildJson[key];
	buildMvcJsWatchFile(info);
	mvcJsBuildAuto.push("watchMvcFile" + info);
	console.log(mvcJsBuildAuto);
}
gulp.task("autoBuildMvcJs", mvcJsBuildAuto);