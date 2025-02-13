---
layout:     post
title:      "vue-router多个路由地址绑定一个组件"
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

[在vue-admin中的解决方案](https://panjiachen.github.io/vue-element-admin-site/zh/guide/essentials/router-and-nav.html#%E7%82%B9%E5%87%BB%E4%BE%A7%E8%BE%B9%E6%A0%8F-%E5%88%B7%E6%96%B0%E5%BD%93%E5%89%8D%E8%B7%AF%E7%94%B1)

### 问题所在
由于路由没有发生变化，因此，切换组件，只有在第一次进入的时候会执行created。

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
    console.log(this.$route.path)
    // 观测到router变化 在这里做想要的操作
  }
}
```

### 另一种解决办法
方法也很简单，通过不断改变 url 的 query 来触发 view 的变化。我们监听侧边栏每个 link 的 click 事件，每次点击都给 router push 一个不一样的 query 来确保会重新刷新 view。
```javascript
clickLink(path) {
  this.$router.push({
    path,
    query: {
      t: +new Date() //保证每次点击路由的query项都是不一样的，确保会重新刷新view
    }
  })
}
```



不要忘了在 router-view 上加上一个唯一的 key，来保证路由切换时都会重新渲染触发钩子了。这样简单的多了。

```
<router-view :key="key"></router-view>

computed: {
  key() {
    // 或者 :key="route.fullPath" 只要保证key唯一就可以了
    return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
  }
 }
 ```


**但这也有一个弊端就是 url 后面有一个很难看的 query 后缀如 xxx.com/article/list?t=1496832345025**

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



