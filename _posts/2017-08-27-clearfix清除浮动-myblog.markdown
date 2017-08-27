---
layout:     post
title:      "clearfix清除浮动"
date:       2017-08-27 11:36:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - CSS
---

> “Yeah It's on. ”


## 正文
[网页链接](http://www.jianshu.com/p/9d6a6fc3e398)

通常我们在写html+css的时候，如果一个父级元素内部的子元素是浮动的（float），那么常会发生父元素不能被子元素正常撑开的情况

要解决此问题，我们可以给包裹层(包裹了float元素)添加一个类，叫做clearfix，下面是clearfix的实现形式（之一）：

.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}

上述代码通过伪类 :after 在container后添加内容（content），来实现清除浮动。




作者：Wenliang
链接：http://www.jianshu.com/p/9d6a6fc3e398
來源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。