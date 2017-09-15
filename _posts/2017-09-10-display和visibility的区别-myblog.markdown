---
layout:     post
title:      "display和visibility的区别"
date:       2017-09-10 20:43:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - CSS
---

> “Yeah It's on. ”


## 正文
[网页链接](http://www.cnblogs.com/Chenshuai7/p/5188068.html)

* display 影响文档流，visibility 不影响；
* display 改变的是DOM的显示形式，即以何种方式来计算它的大小；visibility 只是控制可见性，DOM 的大小不会改变。


### visibility属性

确定元素显示还是隐藏；
visibility="visible|hidden"，visible显示，hidden隐藏。

当visibility被设置为"hidden"的时候，元素虽然被隐藏了，但它仍然占据它原来所在的位置。

<strong>注意到，当元素被隐藏之后，就不能再接收到其它事件了</strong>


### display属性

就有一点不同了。visibility属性是隐藏元素但保持元素的浮动位置，而display实际上是设置元素的浮动特征。

block:
当display被设置为block(块)时，容器中所有的元素将会被当作一个单独的块，就像`<DIV>`元素一样，它会在那个点被放入到页面中。(实际上你可以设置`<span>`的display:block，使其可以像`<DIV>`一样工作。

inline:
将display设置为inline，将使其行为和元素inline一样---即使它是普通的块元素如`<DIV>`，它也将会被组合成像`<span>`那样的输出流。

none:
最后是display被设置：none,这时元素实际上就从页面中被移走，它下面所在的元素就会被自动跟上填充。