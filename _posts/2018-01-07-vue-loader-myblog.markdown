---
layout:     post
title:      "vue-loader"
date:       2018-01-07 17:05:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Webpack
---

> “Yeah It's on. ”


## 正文


[网页链接](https://vue-loader.vuejs.org/zh-cn/)

### vue-loader 是什么？

vue-loader 是一个 webpack 的 loader，可以将用下面这个格式编写的 Vue 组件转换为 JavaScript 模块：

![enter description here][1]

### vue-loader 提供的很酷的特性：
* 默认支持 ES2015；
* 允许对 Vue 组件的组成部分使用其它 webpack loader，比如对 `<style>` 使用 SASS 和对 `<template>` 使用 Jade；
* .vue 文件中允许自定义节点，然后使用自定义的 loader 进行处理；
把 `<style>` 和 `<template>` 中的静态资源当作模块来对待，并使用 webpack loader 进行处理；
* 对每个组件模拟出 CSS 作用域；
* 支持开发期组件的热重载。


你可以像下面这样使用 SASS 语法编写样式：
```
<style lang="sass">
  /* write SASS! */
</style>
```

简而言之，编写 Vue.js 应用程序时，组合使用 webpack 和 vue-loader 能带来一个现代，灵活并且非常强大的前端工作流程。


  [1]: http://blog.evanyou.me/images/vue-component.png