---
layout:     post
title:      "node-mime"
date:       2018-04-20 23:06:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Node
---

> “Yeah It's on. ”


## 正文
[网页链接](https://github.com/broofa/node-mime)

Mime types for JavaScript 

A comprehensive, compact MIME type module.

`npm install mime`


### Quick Start
```
const mime = require('mime');

mime.getType('txt');                    // ⇨ 'text/plain'
mime.getExtension('text/plain');        // ⇨ 'txt'
```



### MIME类型
MIME(Multipurpose Internet Mail Extensions)多用途互联网邮件扩展类型。是设定某种扩展名的文件用一种应用程序来打开的方式类型，当该扩展名文件被访问的时候，浏览器会自动使用指定应用程序来打开。多用于指定一些客户端自定义的文件名，以及一些媒体文件打开方式。


每个MIME类型由两部分组成，前面是数据的大类别，例如声音audio、图象image等，后面定义具体的种类。
常见的MIME类型(通用型)：
* 超文本标记语言文本 .html text/html
* xml文档 .xml text/xml
* XHTML文档 .xhtml application/xhtml+xml
* 普通文本 .txt text/plain
* RTF文本 .rtf application/rtf
* PDF文档 .pdf application/pdf
* Microsoft Word文件 .word application/msword


`<link type="text/css">` type="text/css"就是MIME类型。












