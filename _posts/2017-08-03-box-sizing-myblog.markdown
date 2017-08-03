---
layout:     post
title:      "box-sizing"
date:       2017-08-03 17:06:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Css
---

> “Yeah It's on. ”


## 正文
[网页链接](http://www.w3chtml.com/css3/properties/user-interface/box-sizing.html)

box-sizing：content-box | border-box
默认值：content-box
适用于：所有接受width和height的元素
继承性：无

#### content-box：
padding和border不被包含在定义的width和height之内。对象的实际宽度等于设置的width值和border、padding之和，即 ( Element width = width + border + padding )
此属性表现为标准模式下的盒模型。
#### border-box：
padding和border被包含在定义的width和height之内。对象的实际宽度就等于设置的width值，即使定义有border和padding也不会改变对象的实际宽度，即 ( Element width = width )
此属性表现为怪异模式下的盒模型。

示例：
content-box:
.test1{ box-sizing:content-box; width:200px; padding:10px; border:15px solid #eee; }
content-box

![enter description here][1]


border-box:
.test2{ box-sizing:border-box; width:200px; padding:10px; border:15px solid #eee; }
border-box

![enter description here][2]
## 后记


  [1]: http://www.w3chtml.com/css3/properties/user-interface/images/content-box.png
  [2]: http://www.w3chtml.com/css3/properties/user-interface/images/border-box.png