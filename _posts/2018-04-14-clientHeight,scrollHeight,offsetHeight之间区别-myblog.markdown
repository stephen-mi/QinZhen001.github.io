---
layout:     post
title:      "clientHeight,scrollHeight,offsetHeight之间区别"
date:       2018-04-14 17:33:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Other
---

> “Yeah It's on. ”


## 正文
[网页链接](https://www.w3cplus.com/css/viewports.html)

* clientHeight：元素客户区的大小，指的是元素内容及其边框所占据的空间大小（经过实践取出来的大多是视口大小,不包括滚动条）
* scrollHeight: 滚动大小，指的是包含滚动内容的元素大小（元素内容的总高度）
* offsetHeight: 偏移量，包含元素在屏幕上所用的所有可见空间（包括所有的内边距滚动条和边框大小，不包括外边距




![enter description here][1]




* window.innerWidth/Height (包含滚动条)
* document.documentElement.clientWidth/clientHeight (不包含滚动条)



el.offsetHeight = height + padding + border（滚动条是在边框内的，自然也包括在内）

el.clientHeight = 可视化看到的高度 (就是content的高度)


el.scrollHeight = 整个元素的高度 （ 包括了clientHeight看不到的那部分，一般就是你css设置的元素高度）

el.offsetTop = 子元素的外边框到父元素的内边框的垂直距离 （没边框时自然就是content到content的距离）


el.offsetLeft = 子元素的外边框到父元素的内边框的水平距离距离



还有几个和mousemove鼠标移动事件相关的属性，也是比较容易混淆的

* e.offsetY = 鼠标距离该元素上面的距离 (不包括边框，在边框上移动时得到的负值)
* e.offsetX = 鼠标距离该元素左边的距离

* e.clientY = 鼠标距离客户端可视区的垂直距离
* e.clientX = 鼠标距离客户端可视区的水平距离

* **offset[X|Y] 是相对于目标元素左上角和鼠标之间的距离；**
* **page[X|Y] 是相对于整个页面左上角和鼠标之间的距离；**


### 滚动移位 Scrolling offset
window.pageX/YOffset

* 含义：页面的移位
* 度量：CSS的pixels
* 兼容性问题：pageXOffset 和 pageYOffset 在 IE 8 及之前版本的IE不支持, 使用”document.body.scrollLeft” and “document.body.scrollTop” 来取代


window.pageXOffset 和 window.pageYOffset，定义了页面(document)的相对于窗口原点的水平、垂直位移。因此你能够定位用户滚动了多少的滚动条距离。


![enter description here][2]




看起来解释很清晰，可是用起来好像没有这么容易啊，当然，各个浏览器的表达方式不同确实要背锅，不过，当用这些个属性的时候免不了要面对这两个东西的差异，document.body和document.documentElement，同样的属性用document.body和document.documentElemen表达出来可能会截然不同。


**documentElement 和 body 相关说明：** 

body是DOM对象里的body子节点，即 <body> 标签；

documentElement 是整个节点树的根节点root，即<html> 标签；

DOM把层次中的每一个对象都称之为节点，就是一个层次结构，你可以理解为一个树形结构，就像我们的目录一样，一个根目录，根目录下有子目录，子目录下还有子目录。



### scrollTop 
页面具有 DTD，或者说指定了 DOCTYPE 时，使用 document.documentElement。

页面不具有 DTD，或者说没有指定了 DOCTYPE，时，使用 document.body。

在 IE 和 Firefox 中均是如此。

为了兼容，不管有没有 DTD，可以使用如下代码：
```
var scrollTop = window.pageYOffset  //用于FF
                || document.documentElement.scrollTop  
                || document.body.scrollTop  
                || 0;
```






  [1]: http://www.w3cplus.com/sites/default/files/styles/print_image/public/blogs/2014/1404/viewport-13.jpg
  [2]: http://www.w3cplus.com/sites/default/files/styles/print_image/public/blogs/2014/1404/viewport-7.jpg