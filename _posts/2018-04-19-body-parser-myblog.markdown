---
layout:     post
title:      "body-parser"
date:       2018-04-19 22:42:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Node
---

> “Yeah It's on. ”


## 正文
[网页链接](https://www.npmjs.com/package/body-parser)


Node.js body parsing middleware.
Node.js正文解析中间件。


This module provides the following parsers:
* JSON body parser
* Raw body parser
* Text body parser
* URL-encoded form body parser

该bodyParser对象公开了各种工厂来创建中间件。所有中间件都会req.body在Content-Type请求头匹配type选项时使用解析的主体来填充属性，{}如果没有要分析的主体，Content-Type则不匹配或发生错误，所有中间件都会使用解析的主体来填充属性。