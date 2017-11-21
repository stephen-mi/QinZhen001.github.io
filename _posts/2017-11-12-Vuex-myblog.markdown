---
layout:     post
title:      "Vuex简单分析"
date:       2017-11-12 16:55:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Vue
---

> “Yeah It's on. ”


## 正文


[网页链接](http://www.jqhtml.com/9032.html)


当我们用 Vue.js 开发一个中到大型的单页应用时，经常会遇到如下问题：
如何让多个 Vue 组件共享状态
Vue 组件间如何通讯
通常，在项目不是很复杂的时候，我们会利用全局事件总线 （global event bus）解决，但是随着复杂度的提升，这些代码将变的难以维护。因此，我们需要一种更加好用的解决方案，于是，Vuex 诞生了。


![enter description here][1]



源码分析:
http://www.jqhtml.com/9032.html





  [1]: http://www.jqhtml.com/wp-content/uploads/2017/09/vuex914-1.png