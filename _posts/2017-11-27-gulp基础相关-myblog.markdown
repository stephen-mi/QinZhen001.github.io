---
layout:     post
title:      "gulp基础相关"
date:       2017-11-27 22:56:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Gulp
---

> “Yeah It's on. ”


## 正文


[网页链接](http://www.gulpjs.com.cn/docs/getting-started/)

gulp是前端开发过程中对代码进行构建的工具，是自动化项目的构建利器；她不仅能对网站资源进行优化，而且在开发过程中很多重复的任务能够使用正确的工具自动完成；使用她，我们不仅可以很愉快的编写代码，而且大大提高我们的工作效率。

gulp是基于Nodejs的自动任务运行器， 她能自动化地完成 javascript/coffee/sass/less/html/image/css 等文件的的测试、检查、合并、压缩、格式化、浏览器自动刷新、部署文件生成，并监听文件在改动后重复指定的这些步骤。在实现上，她借鉴了Unix操作系统的管道（pipe）思想，前一级的输出，直接变成后一级的输入，使得在操作上非常简单。通过本文，我们将学习如何使用Gulp来改变开发流程，从而使开发更加快速高效。


gulp 和 grunt 非常类似，但相比于 grunt 的频繁 IO 操作，gulp 的流操作，能更快地更便捷地完成构建工作。

### 起步
1. 全局安装 gulp：
$ npm install --global gulp

2. 作为项目的开发依赖（devDependencies）安装：
$ npm install --save-dev gulp

3. 在项目根目录下创建一个名为 gulpfile.js 的文件：
```
var gulp = require('gulp');
gulp.task('default', function() {
  // 将你的默认的任务代码放在这
});
```

4. 运行 gulp：
$ gulp

### 入门
gulp.src(globs[, options])

输出（Emits）符合所提供的匹配模式（glob）或者匹配模式的数组（array of globs）的文件。 将返回一个 Vinyl files 的 stream 它可以被 piped 到别的插件中。

```javascript
gulp.src('client/templates/*.jade')
  .pipe(jade())
  .pipe(minify())
  .pipe(gulp.dest('build/minified_templates'));
```




## 优化


### 优化gulp watch

不要一次watch太多文件，分开成几个watch任务

```javascript
    /**
     * 构建相关任务
     */
    gulp.task(`${id}-watch`, () => {
      gulp.watch(config.jsFiles, {cwd: srcPath}, gulp.series('js'))
        .on('unlink', (curPath) => {
          let targetPath = path.resolve(distPath, curPath)
          _.delPath(targetPath)
        })

      gulp.watch(config.jsonFiles, {cwd: srcPath}, gulp.series('json'))
        .on('change', (path) => {
          if (/package/.test(path)) {
            install()
          }
        })
        .on('unlink', (curPath) => {
          let targetPath = path.resolve(distPath, curPath)
          _.delPath(targetPath)
        })

      gulp.watch(config.wxmlFiles, {cwd: srcPath}, gulp.series('wxml'))
        .on('unlink', (curPath) => {
          let targetPath = path.resolve(distPath, curPath)
          _.delPath(targetPath)
        })

      gulp.watch(config.lessFiles, {cwd: srcPath}, gulp.series('wxss'))
        .on('unlink', (curPath) => {
          let targetPath = path.resolve(distPath, curPath)
          if (/\.less/.test(targetPath)) {
            targetPath = targetPath.replace('.less', '.wxss')
          }
          _.delPath(targetPath)
        })

      gulp.watch(config.imgFiles, {cwd: srcPath}, gulp.series('img'))
        .on('unlink', (curPath) => {
          let targetPath = path.resolve(distPath, curPath)
          _.delPath(targetPath)
        })
    })
```




### gulp-changed

Only pass through changed files
[https://www.npmjs.com/package/gulp-changed](https://www.npmjs.com/package/gulp-changed)








### gulp-cache



A temp file based caching proxy task for gulp.


[https://www.npmjs.com/package/gulp-cache](h


----------


ttps://www.npmjs.com/package/gulp-cache)





### webpack-stream

[https://www.npmjs.com/package/webpack-stream](https://www.npmjs.com/package/webpack-stream)

Run webpack as a stream to conveniently integrate with gulp.


运行webpack作为一个流，方便地与gulp集成。










