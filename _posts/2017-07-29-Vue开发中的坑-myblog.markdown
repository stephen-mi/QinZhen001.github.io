---
layout:     post
title:      "Vue开发中的坑"
date:       2017-07-29 10:56:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Vue
---

> “Yeah It's on. ”


## 正文
[网页链接]()

### Error:Cannot find module 'stylus'
在webpack 里面用了 stylus-loader，但npm instatll 没有正确安装，出现error： Cannot find module ‘stylus’。

解决办法： 
重新npm install stylus 和 stylus-loader

npm install stylus –save-dev 
npm install stylus-loader –save-dev

或:
npm install stylus-loader css-loader style-loader --save-dev


<strong>非要单独再装一次才好！</strong>


