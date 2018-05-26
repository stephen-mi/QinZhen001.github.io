---
layout:     post
title:      "mpvue爬坑"
date:       2018-05-26 23:25:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - 微信小程序
---

> “Yeah It's on. ”


## 正文

[http://mpvue.com/mpvue/](http://mpvue.com/mpvue/)

### 不支持函数
不支持在 template 内使用 methods 中的函数。

### Content-type问题

官网里面的示例代码中content-type是设置为'application/json'的，然而……！！！

但是原来是微信开发工具升级后（目前是0.12），请求的header的Content-type写法变了，要改成:

**header: { content-type: 'json' }**

