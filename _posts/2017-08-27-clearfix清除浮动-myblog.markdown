---
layout:     post
title:      "clearfix清除浮动"
date:       2017-08-27 11:36:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Css
---

> “Yeah It's on. ”


## 正文
[网页链接](http://www.jianshu.com/p/9d6a6fc3e398)

通常我们在写html+css的时候，如果一个父级元素内部的子元素是浮动的（float），那么常会发生父元素不能被子元素正常撑开的情况

要解决此问题，我们可以给包裹层(包裹了float元素)添加一个类，叫做clearfix，下面是clearfix的实现形式（之一）：


**正是由于“块级元素”具有换行特性，因此理论上它都可以配合 clear 属性来清除浮动 带来的影响**


**最好的方式**
```
.clearfix:after {
   content:""; 
   display: table;  // 也可以是 block，或者是 list-item 
   clear:both; 
}
```
上述代码通过伪类 :after 在container后添加内容（content），来实现清除浮动。


```
.clearfix::before,
.clearfix::after {
    content: ".";
    display: block;
    height: 0;
    visibility: hidden;
}
.clearfix:after {clear: both;}
.clearfix {zoom: 1;}
```






作者：Wenliang
[链接](http://www.jianshu.com/p/9d6a6fc3e398)
來源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。