---
layout:     post
title:      "vue-router多个路由地址绑定一个组件造成 created不执行的解决方法"
date:       2017-08-30 22:15:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Vue
---

> “Yeah It's on. ”


## 正文
[网页链接](http://blog.csdn.net/fungleo/article/details/54140095)

### 需求分析
导航上有2个菜单，指向的是同一个列表，但是是不同的状态。我需要根据不同的状态获取状态参数给接口拿到不同的数据。

### 问题所在
路由没有发生变化，因此，只有在第一次进入的时候会因为created执行。

### 解决方案

```
created () {
  console.log(this.getStatus(this.$route.path))
},
methods: {
  getStatus (urlStr) {
    var urlStrArr = urlStr.split('/')
    return urlStrArr[urlStrArr.length - 1]
  }
},
watch: {
  '$route' (to, from) {
    console.log(this.getStatus(this.$route.path))
  }
}
```
8.30晚
经过我的测试 进入的这个组件并不会触发这个watch
当这个组件消失时 才会触发(很奇怪)
明天 在找办法


----------
8.31
另想办法 采用
路由导航钩子：
但是beforeRouteUpdate (2.2 新增)在
/foo/1 和 /foo/2 之间跳转才有用
目前遇到情况是  /foo => /foo/1 => /foo => /foo/2


----------

 /too => /foo/1  或 /too => /foo/2  
导致 /foo/1 这个界面的组件无法正常执行created


----------

### 最终最终解决
在/too下 也维护一个
```
  children: [
        {
          path: ':id',
          component: xxxx
        }
      ]
```
实际上/too/1 和 /foo/1 是完全相同的界面
但是/too => /foo/1 或 /foo => /too/1 就会导致created无法执行

## 总结
看文档要仔细 = = 
https://router.vuejs.org/zh-cn/essentials/dynamic-matching.html#%E5%93%8D%E5%BA%94%E8%B7%AF%E7%94%B1%E5%8F%82%E6%95%B0%E7%9A%84%E5%8F%98%E5%8C%96


### 响应路由参数的变化
提醒一下，当使用路由参数时，例如从 /user/foo 导航到 user/bar，原来的组件实例会被复用。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。不过，这也意味着组件的生命周期钩子不会再被调用。

复用组件时，想对路由参数的变化作出响应的话，你可以简单地 watch（监测变化） $route 对象：
```
const User = {
  template: '...',
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
    }
  }
}
```


组件内的钩子
以在路由组件内直接定义以下路由导航钩子：
* beforeRouteEnter
* beforeRouteUpdate (2.2 新增)
* beforeRouteLeave

```
const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当钩子执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```
beforeRouteEnter 钩子 不能 访问 this，因为钩子在导航确认前被调用,因此即将登场的新组件还没被创建。

不过，你可以通过传一个回调给 next来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。

beforeRouteEnter (to, from, next) {
  next(vm => {
    // 通过 `vm` 访问组件实例
  })
}
你可以 在 beforeRouteLeave 中直接访问 this。这个 leave 钩子通常用来禁止用户在还未保存修改前突然离开。可以通过 next(false) 来取消导航。


https://router.vuejs.org/zh-cn/advanced/navigation-guards.html



