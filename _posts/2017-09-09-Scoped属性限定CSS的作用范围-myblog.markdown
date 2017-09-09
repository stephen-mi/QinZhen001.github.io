---
layout:     post
title:      "Scoped属性限定CSS的作用范围"
date:       2017-09-09 11:33:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - CSS
---

> “Yeah It's on. ”


## 正文
[网页链接](http://www.webhek.com/post/scoped-css.html)
<strong>从当前STYLE元素所在的容器开始选择后代。</strong>

style标记上新出现的这个scoped属性可以让CSS样式只对局部元素生效，具体说，就是存放这段style样式的元素的子元素生效，下面来看看它的效果。


```
<style scoped>
    /* styles go here */
</style>
```