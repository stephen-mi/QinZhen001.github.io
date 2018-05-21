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


>一般用于post请求


This module provides the following parsers:
* **JSON body parser**
* Raw body parser
* Text body parser
* URL-encoded form body parser

该bodyParser对象公开了各种工厂来创建中间件。所有中间件都会req.body在Content-Type请求头匹配type选项时使用解析的主体来填充属性，{}如果没有要分析的主体，Content-Type则不匹配或发生错误，所有中间件都会使用解析的主体来填充属性。


### bodyParser.json([选项]）

返回仅解析json并仅查看Content-Type标题与type选项匹配的请求的中间件。该解析器接受身体的任何Unicode编码并支持自动膨胀gzip和 deflate编码。

body包含分析数据的新对象request 在中间件（即req.body）之后被填充到对象上。

#### 类型
该type选项用于确定中间件将解析的媒体类型。该选项可以是字符串，字符串数组或函数。如果不是函数，则type选项直接传递到 类型库，这可以是扩展名（例如json），MIME类型（如application/json）或具有通配符的MIME类型（如*/*或*/json）。如果一个函数，该type 选项被调用，fn(req)并且如果它返回一个真值，则该请求被解析。**默认为application/json。**



### bodyParser.urlencoded([options])

返回仅分析urlencoded正文的中间件，并仅查看Content-Type标题与type选项匹配的请求。此解析器只接受身体的UTF-8编码，并支持自动通胀gzip和deflate编码。

body包含分析数据的新对象request 在中间件（即req.body）之后被填充到对象上。该对象将包含键-值对，其中该值可以是一个字符串或阵列（时extended是 false），或任何类型的（当extended是true）。


#### 类型
该type选项用于确定中间件将解析的媒体类型。该选项可以是字符串，字符串数组或函数。如果不是函数，则将type选项直接传递到 类型库，这可以是扩展名（例如urlencoded），MIME类型（如 application/x-www-form-urlencoded）或具有通配符（如*/x-www-form-urlencoded）的MIME类型 。如果一个函数，该type选项被调用， fn(req)并且如果它返回一个真值，则该请求被解析。**默认为application/x-www-form-urlencoded。**



