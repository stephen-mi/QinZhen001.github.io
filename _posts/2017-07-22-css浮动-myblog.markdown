---
layout:     post
title:      "CSS 浮动"
date:       2017-07-22 13:44:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - CSS
---

> “Yeah It's on. ”


## 正文
[网页链接](http://www.w3school.com.cn/css/css_positioning_floating.asp)
浮动的框可以向左或向右移动，直到它的外边缘碰到包含框或另一个浮动框的边框为止。
由于浮动框不在文档的普通流中，所以文档的普通流中的块框表现得就像浮动框不存在一样。
---
## 后记
关于float是否脱离文档流存在争议
float他还是有占位的。一般来说是只有position是脱离文档流的。
<strong>没有完全脱离文档流</strong>
浮动元素不占任何正常文档流空间，而浮动元素的定位还是基于正常的文档流，然后从文档流中抽出并尽可能远的移动至左侧或者右侧。文字内容会围绕在浮动元素周围。当一个元素从正常文档流中抽出后，仍然在文档流中的其他元素将忽略该元素并填补他原先的空间。
浮动概念让人迷惑根源在于浏览器对理论的解读造成的。只能说很多人以IE做标准，其实它不是。

## 注意
position:absolute和float 都可以脱离标准文档流
与absolute不同的是：
float 的元素还会在文档流上占据一个位置

#### float 导致了文字环绕效果。
CSS中脱离文档流，也就是将元素从普通的布局排版中拿走，其他盒子在定位的时候，会当做脱离文档流的元素不存在而进行定位。
　　需要注意的是，使用float脱离文档流时，其他盒子会无视这个元素，但其他盒子内的文本依然会为这个元素让出位置，环绕在周围。
　　
更多查看：
[float和position:absolute脱离文本流的区别](http://blog.csdn.net/paediatrician/article/details/52583653)
