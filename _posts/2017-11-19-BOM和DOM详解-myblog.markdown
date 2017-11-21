---
layout:     post
title:      "BOM和DOM详解"
date:       2017-11-12 15:02:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - JavaScript
---

> “Yeah It's on. ”


## 正文


[网页链接](http://blog.csdn.net/anythings/article/details/51240133)


###  DOM：
DOM 全称是 Document Object Model，也就是文档对象模型。

DOM 就是针对 HTML 和 XML 提供的一个API。什么意思？就是说为了能以编程的方法操作这个 HTML 的内容（比如添加某些元素、修改元素的内容、删除某些元素），我们把这个 HTML 看做一个对象树（DOM树），它本身和里面的所有东西比如 <div></div> 这些标签都看做一个对象，每个对象都叫做一个节点（node），节点可以理解为 DOM 中所有 Object 的父类。

![enter description here][1]


DOM 有什么用？就是为了操作 HTML 中的元素，比如说我们要通过 JS 把这个网页的标题改了，直接这样就可以了：

```
document.title = 'how to make love';

```

这个 API 使得在网页被下载到浏览器之后改变网页的内容成为可能。


### document

当浏览器下载到一个网页，通常是 HTML，这个 HTML 就叫 document（当然，这也是 DOM 树中的一个 node），从上图可以看到，document 通常是整个 DOM 树的根节点。这个 document包含了标题（document.title）、URL（document.URL）等属性，可以直接在 JS 中访问到。在一个浏览器窗口中可能有多个 document，例如，通过 iframe 加载的页面，每一个都是一个 document。在 JS 中，可以通过 document 访问其子节点（其实任何节点都可以），如

```
document.body;
document.getElementById('xxx');
```

### BOM
BOM 是 Browser Object Model，浏览器对象模型。

刚才说过 DOM 是为了操作文档出现的接口，那 BOM 顾名思义其实就是为了**控制浏览器的行为**而出现的接口。

浏览器可以做什么呢？比如跳转到另一个页面、前进、后退等等，程序还可能需要获取屏幕的大小之类的参数。

所以 BOM 就是为了解决这些事情出现的接口。比如我们要让浏览器跳转到另一个页面，只需要

```
location.href = "http://www.xxxx.com";
```
这个 location 就是 BOM 里的一个对象。

### window


  [1]: https://pic3.zhimg.com/50/2e9a57f3043adfd954e147c8718c3266_hd.jpg