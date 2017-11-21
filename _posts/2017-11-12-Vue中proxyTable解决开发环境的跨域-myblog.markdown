---
layout:     post
title:      "Vue中proxyTable解决开发环境的跨域"
date:       2017-11-12 17:25:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Vue
---

> “Yeah It's on. ”


## 正文


[网页链接](http://blog.csdn.net/qq_33559304/article/details/72966028)

在实际项目开发过程中vue cli自带的服务器，但是我们实际要去请求我们的数据接口，服务器与服务器之间产生了一个代理跨域问题，我们需要修改自带服务的配置。在config 中的index文件中，有一个proxyTable参数

参数修改如下：
```
proxyTable: {
  '/list': {
    target: 'http://xxx.xxx.com/xxx/6',
    pathRewrite: {
      '^/list': '/'
    }
  }
},
```
如果需要跨域那么需要加上参数changeOrigin:true
```
proxyTable: {
  '/list': {
    target: 'http://xxx.xxx.com/xxx/6',
changeOrigin:true,
    pathRewrite: {
      '^/list': '/'
    }
  }
},
```