---
layout:     post
title:      "vue中页面滚动行为"
date:       2017-09-15 18:33:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Vue
---

> “Yeah It's on. ”


## 正文
[网页链接](https://router.vuejs.org/zh-cn/advanced/scroll-behavior.html)

使用前端路由，当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。 vue-router 能做到，而且更好，它让你可以自定义路由切换时页面如何滚动。

<strong>注意: 这个功能只在 HTML5 history 模式下可用。</strong>

当创建一个 Router 实例，你可以提供一个 scrollBehavior 方法：

```
const router = new VueRouter({
  routes: [...],
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
  }
})
```

scrollBehavior 方法接收 to 和 from 路由对象。第三个参数 savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。


这个方法返回滚动位置的对象信息，长这样：
* { x: number, y: number }
* { selector: string }

如果返回一个布尔假的值，或者是一个空对象，那么不会发生滚。


举例：
```
scrollBehavior (to, from, savedPosition) {
  return { x: 0, y: 0 }
}
```
对于所有路由导航，简单地让页面滚动到顶部。


----------

返回 savedPosition，在按下 后退/前进 按钮时，就会像浏览器的原生表现那样：
```
scrollBehavior (to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  } else {
    return { x: 0, y: 0 }
  }
}
```




如果你要模拟『滚动到锚点』的行为：
```
scrollBehavior (to, from, savedPosition) {
  if (to.hash) {
    return {
      selector: to.hash
    }
  }
}
```

