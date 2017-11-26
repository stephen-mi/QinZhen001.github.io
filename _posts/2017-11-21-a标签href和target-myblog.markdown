---
layout:     post
title:      "a标签的href和target"
date:       2017-11-21 23:02:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Html
---

> “Yeah It's on. ”


## 正文


[网页链接](http://www.w3school.com.cn/tags/att_a_target.asp)


### href = "" 的几种用法

#### a href="javascript:js_method();"

这是常用的方法，但是这种方法在传递this等参数的时候很容易出问题，而且javascript:协议作为a的href属性的时候不仅会导致不必要的触发window.onbeforeunload事件，在IE里面更会使gif动画图片停止播放。W3C标准不推荐在href里面执行javascript语句

#### a href="javascript:void(0);" onclick="js_method()"

这种方法是很多网站最常用的方法，也是最周全的方法，onclick方法负责执行js函数，而void是一个操作符，void(0)返回undefined，地址不发生跳转。而且这种方法不会像第一种方法一样直接将js方法暴露在浏览器的状态栏。

#### a href="javascript:;" onclick="js_method()"

这种方法跟跟2种类似，区别只是执行了一条空的js代码。




### target 

#### _blank
浏览器总在一个新打开、未命名的窗口中载入目标文档。

#### _self
这个目标的值对所有没有指定目标的 `<a>` 标签是默认目标，它使得目标文档载入并显示在相同的框架或者窗口中作为源文档。这个目标是多余且不必要的，除非和文档标题 `<base>` 标签中的 target 属性一起使用。

#### _parent
这个目标使得文档载入父窗口或者包含来超链接引用的框架的框架集。如果这个引用是在窗口或者在顶级框架中，那么它与目标 _self 等效。

#### _top
这个目标使得文档载入包含这个超链接的窗口，用 _top 目标将会清除所有被包含的框架并将文档载入整个浏览器窗口。



**提示：
这些 target 的所有 4个值都以下划线开始。任何其他用一个下划线作为开头的窗口或者目标都会被浏览器忽略，因此，不要将下划线作为文档中定义的任何框架 name 或 id 的第一个字符。**
