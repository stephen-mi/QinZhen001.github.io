---
layout:     post
title:      "a标签的rel属性noreferrer"
date:       2018-09-25 17:07:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Html
---

> “Yeah It's on. ”


## 正文
[网页链接](http://www.w3school.com.cn/tags/att_a_rel.asp)

### 浏览器支持
所有浏览器都支持 rel 属性。


虽然在理论上讲，浏览器可以利用 rel 和 rev 属性改变锚内容的外观、或者自动构建文档浏览菜单，其他工具也可以使用这些属性来构建特殊的链接集合、目录和索引，但是只有极少数浏览器才会利用这些属性来改变链接的外观。


>提示：尽管浏览器不会以任何方式使用该属性，不过搜索引擎可以利用该属性获得更多有关链接的信息。


### 定义和用法
`<a>` 标签的 rel 属性用于指定当前文档与被链接文档的关系。


用于` <a>` 标签的可选属性 rel 和 rev 分别表示源文档与目标文档之间正式的关系和方向。

rel 属性指定从源文档到目标文档的关系，而 rev 属性则指定从目标文档到源文档的关系。这两种属性可以在`<a>` 标签中同时使用。

```
<a href="part_12.html" rel="next" rev="prev">
```

### **重要rel="noreferrer"**
[http://ju.outofmemory.cn/entry/172298](http://ju.outofmemory.cn/entry/172298)

在一个页面A中，点击一个链接，浏览器会跳转到页面B。那么如何描述A和B的关系呢？我们把A定义为B的refer/referrer/referer

通俗地说，A是B的来源页面/引荐页面。从技术实现上，你从浏览器起发出的任何请求（不准确，先这么理解吧），例如打开新页面、请求静态资源、ajax、请求后端api等等，都会在请求头部添加


#### 问题出现
最近在做node爬虫时，发现，有一些页面需要跳转到某网站（新开页面），但这个网站链接链过去会报403错误，如下图。但是，从浏览器输入地址，则没有问题。


**如果链接链过去的时候不带referrer信息，则网页能够正常打开。**


**最简易直观的实现方式，如果一个a标签设置了rel=”noreferrer”，那么点击这个链接时不传递referrer信息。（注意，这个html5标准中和referrer是正确的拼法）**

```
<a href="http://baidu.com" target="_blank" rel="noreferrer">跳转</a>
```


>如果担心兼容性问题，可以使用 noreferrer.js 




