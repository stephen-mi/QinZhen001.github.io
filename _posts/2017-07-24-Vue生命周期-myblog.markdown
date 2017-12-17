---
layout:     post
title:      "Vue生命周期"
date:       2017-07-24 10:44:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Vue
---

> “Yeah It's on. ”


## 正文
[网页链接](https://cn.vuejs.org/v2/guide/)

* Vue.js（读音 /vjuː/，类似于 view） 是一套构建用户界面的渐进式框架。与其他重量级框架不同的是，Vue 采用自底向上增量开发的设计。
* Vue 的核心库只关注视图层，它不仅易于上手，还便于与第三方库或既有项目整合。
* 另一方面，当与单文件组件和 Vue 生态系统支持的库结合使用时，Vue 也完全能够为复杂的单页应用程序提供驱动。

```
var vm = new Vue({
  // 选项
})
```

虽然没有完全遵循 MVVM 模式， Vue 的设计无疑受到了它的启发。因此在文档中经常会使用 vm (ViewModel 的简称) 这个变量名表示 Vue 实例。

---

## 生命周期
Vue实例有一个完整的生命周期，也就是从开始创建、初始化数据、编译模板、挂载Dom、渲染→更新→渲染、卸载等一系列过程，我们称这是Vue的生命周期。通俗说就是Vue实例从创建到销毁的过程，就是生命周期。

<image src="https://cn.vuejs.org/images/lifecycle.png"></image>



![生命周期][1]




## 注意

不要在实例属性或者回调函数中（如 vm.$watch('a', newVal => this.myMethod())）使用箭头函数。因为箭头函数绑定父级上下文，所以 this 不会像预想的一样是 Vue 实例，而是 this.myMethod 未被定义。


  [1]: http://img.zhimengzhe.com/d/file/p/2017-03-05/6e69817f1e18ae5389320cc5c00641b4.jpg