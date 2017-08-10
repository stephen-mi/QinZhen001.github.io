---
layout:     post
title:      "transform-origin"
date:       2017-08-10 14:45:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - CSS
---

> “Yeah It's on. ”


## 正文


[网页链接](http://blog.csdn.net/xu_ya_fei/article/details/51711968)

transform-origin 属性允许您改变被转换元素的位置。
默认值： 50% 50% 0
2D 转换元素能够改变元素 x 和 y 轴。3D 转换元素还能改变其 Z 轴。

#### 语法
transform-origin: x-axis y-axis z-axis;

x-axis
定义视图被置于 X 轴的何处。可能的值：
left center right length %


y-axis	
定义视图被置于 Y 轴的何处。可能的值：
top center bottom length %

z-axis
定义视图被置于 Z 轴的何处。可能的值：
length

## 后记
/*只设置一个值的语法*/
transform-origin: x-offset
transform-origin: offset-keyword
/*设置两个值的语法*/
transform-origin：x-offset  y-offset
transform-origin：y-offset  x-offset-keyword
transform-origin：x-offset-keyword  y-offset
transform-origin：x-offset-keyword  y-offset-keyword
transform-origin：y-offset-keyword  x-offset-keyword
/*设置三个值的语法*/
transform-origin：x-offset  y-offset  z-offset
transform-origin：y-offset  x-offset-keyword  z-offset
transform-origin：x-offset-keyword  y-offset  z-offset
transform-origin：x-offset-keyword  y-offset-keyword  z-offset
transform-origin：y-offset-keyword  x-offset-keyword  z-offset


* x-offset：用来设置transform-origin水平方向Ｘ轴的偏移量，可以使用和值，同时也可以是正值（从中心点沿水平方向Ｘ轴向右偏移量），也可以是负值（从中心点沿水平方向Ｘ轴向左偏移量）。
* y-offset：用来设置transform-origin属性在垂直方向Ｙ轴的偏移量，可以使用和值，同时可以是正值（从中心点沿垂直方向Ｙ轴向下的偏移量），也可以是负值（从中心点沿垂直方向Ｙ轴向上的偏移量）。
* z-offset：用来设置3D变形中transform-origin远离用户眼睛视点的距离，默认值z=0，其取值可以，不过在这里将无效。


----------


offset-keyword：是top、right、bottom、left或center中的一个关键词，可以用来设置transform-origin的偏移量。
x-offset-keyword：是left、right或center中的一个关键词，可以用来设置transform-origin属性值在水平Ｘ轴的偏移量。
y-offset-keyword：是top、bottom或center中的一个关键词，可以用来设置transform-origin属性值在垂直方向Ｙ轴的偏移量。


----------


 top = top center = center top = 50% 0
 right = right center = center right = 100%或(100% 50%)
 bottom = bottom center = center bottom = 50% 100%
 left = left center = center left = 0或(0 50%)
 center = center center = 50%或（50% 50%）
 top left = left top = 0 0
 right top = top right = 100% 0
 bottom right = right bottom = 100% 100%
 bottom left = left bottom = 0 100%

![transform-origin取值为center（或center center或50% 或50% 50%）][1]
![enter description here][2]
![enter description here][3]
![enter description here][4]
![enter description here][5]
![enter description here][6]
![enter description here][7]
![enter description here][8]


  [1]: http://w3cplus-cdn2.u.qiniudn.com/sites/default/files/styles/print_image/public/blogs/2013/1311/transform-3.jpg
  [2]: http://w3cplus-cdn2.u.qiniudn.com/sites/default/files/styles/print_image/public/blogs/2013/1311/transform-4.jpg
  [3]: http://w3cplus-cdn2.u.qiniudn.com/sites/default/files/styles/print_image/public/blogs/2013/1311/transform-5.jpg
  [4]: http://w3cplus-cdn2.u.qiniudn.com/sites/default/files/styles/print_image/public/blogs/2013/1311/transform-6.jpg
  [5]: http://w3cplus-cdn2.u.qiniudn.com/sites/default/files/styles/print_image/public/blogs/2013/1311/transform-7.jpg
  [6]: http://w3cplus-cdn2.u.qiniudn.com/sites/default/files/styles/print_image/public/blogs/2013/1311/transform-8.jpg
  [7]: http://w3cplus-cdn2.u.qiniudn.com/sites/default/files/styles/print_image/public/blogs/2013/1311/transform-9.jpg
  [8]: http://w3cplus-cdn2.u.qiniudn.com/sites/default/files/styles/print_image/public/blogs/2013/1311/transform-11.jpg