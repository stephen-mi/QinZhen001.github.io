---
layout:     post
title:      "line-height 属性"
date:       2017-09-18 12:48:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Css
---

> “Yeah It's on. ”


## 正文
[网页链接](http://www.w3school.com.cn/cssref/pr_dim_line-height.asp)


line-height 属性设置行间的距离（行高）。
该属性会影响行框的布局。在应用到一个块级元素时，它定义了该元素中基线之间的最小距离而不是最大距离。

line-height 与 font-size 的计算值之差（在 CSS 中成为“行间距”）分为两半，分别加到一个文本行内容的顶部和底部。可以包含这些内容的最小框就是行框。

* normal	默认。设置合理的行间距。
* number	设置数字，此数字会与当前的字体尺寸相乘来设置行间距。
* length	设置固定的行间距。
* %	基于当前字体尺寸的百分比行间距。
* inherit	规定应该从父元素继承 line-height 属性的值。


----------

### 深入理解line-height

http://www.zhangxinxu.com/wordpress/2009/11/css%E8%A1%8C%E9%AB%98line-height%E7%9A%84%E4%B8%80%E4%BA%9B%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3%E5%8F%8A%E5%BA%94%E7%94%A8/

<strong>撑开div高度的是line-height不是文字内容</strong>

行高还有一个特性，叫做垂直居中性。line-height的最终表现是通过line boxes实现的，而无论line boxes所占据的高度是多少（无论比文字大还是比文字小），其占据的空间都是与文字内容公用水平中垂线的。


![enter description here][1]

看test1的结果，此时line boxes的高度为0，但是它是以文字的水平中垂线对称分布的。这一重要的特性可以用来实现文字或图片的垂直居中对齐。

----------


![enter description here][2]


  [1]: http://image.zhangxinxu.com/image/blog/200911/2009-11-28_002310.png
  [2]: http://img.mukewang.com/57899eda0001994b12800720.jpg