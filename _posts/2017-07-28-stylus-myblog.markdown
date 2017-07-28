---
layout:     post
title:      "stylus入门"
date:       2017-07-28 10:05:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Stylus
---

> “Yeah It's on. ”


## 正文
[网页链接](http://www.zhangxinxu.com/jq/stylus/)

<strong>富有表现力的、动态的、健壮的CSS</strong>

对于开发来说，CSS的弱点在于静态化。我们需要一个真正能提高开发效率的工具，LESS， SASS都在这方面做了一些贡献。

Stylus 是一个CSS的预处理框架，2010年产生，来自Node.js社区，主要用来给Node项目进行CSS预处理支持，所以 Stylus 是一种新型语言，可以创建健壮的、动态的、富有表现力的CSS。比较年轻，其本质上做的事情与 SASS/LESS 等类似，应该是有很多借鉴，所以近似脚本的方式去写CSS代码。

Stylus默认使用 .styl 的作为文件扩展名，支持多样性的CSS语法。

## 后记
```
body,html
    margin:0
    padding:0
```
编译成
```
body,
html {
  margin: 0;
  padding: 0;
}
```


