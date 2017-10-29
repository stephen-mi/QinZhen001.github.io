---
layout:     post
title:      "clientHeight,scrollHeight,offsetHeight之间区别"
date:       2017-10-27 20:59:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Css
---

> “Yeah It's on. ”


## 正文
 
[网页链接](http://www.cnblogs.com/nanshanlaoyao/p/5964730.html)


clientHeight , scrollHeight , offsetHeight相信每个人都用过，可是每次用都要查一下到底哪个是文档大小哪个是视口大小，还有头疼的兼容问题。

* clientHeight：元素客户区的大小，指的是元素内容及其边框所占据的空间大小（经过实践取出来的大多是视口大小）
* scrollHeight: 滚动大小，指的是包含滚动内容的元素大小（元素内容的总高度）
* offsetHeight: 偏移量，包含元素在屏幕上所用的所有可见空间（包括所有的内边距滚动条和边框大小，不包括外边距



一、clientHeight
内容可视区域的高度，也就是说页面浏览器中可以看到内容的这个区域的高度，一般是最后一个工具条以下到状态栏以上的这个区域，与页面内容无关。不包括boder的宽度,如果区域内带有滚动条,还应该减去横向滚动条不可用的高度。

二、offsetHeight（与offsetWidth同理）
offsetHeight = 内容可视区域的高度+ 滚动条 + 边框。
当前对象的高度与style.height属性的区别在于:如对象的宽度设定值为百分比高度,则无论页面变大还是变小,style.height都返回此百分比,而offsetHeight则返回在不同页面中对象的高度值而不是百分比值

三、scrollHeight
scrollHeight返回元素的完整的高度，以像素为单位.

> 一般来说一个元素 clientHeight<offsetHeight<scrollHeight

四、具体
window.screen.availWidth     返回当前屏幕宽度(空白空间)  
window.screen.availHeight     返回当前屏幕高度(空白空间)  
window.screen.width     返回当前屏幕宽度(分辨率值)  
window.screen.height     返回当前屏幕高度(分辨率值)  
window.document.body.offsetHeight;     返回当前网页高度  
window.document.body.offsetWidth;     返回当前网页宽度 

----------


**documentElement 和 body 相关说明**

body是DOM对象里的body子节点，即 `<body>` 标签；

documentElement 是整个节点树的根节点root，即`<html>` 标签；


----------

最后下面两个函数解决了这个问题，兼容了不同的浏览器。
```
/*视口的大小，部分移动设备浏览器对innerWidth的兼容性不好，需要
 *document.documentElement.clientWidth或者document.body.clientWidth
 *来兼容（混杂模式下对document.documentElement.clientWidth不支持）。
 *使用方法 ： getViewPort().width;
 */
function getViewPort () {
    if(document.compatMode == "BackCompat") {   //浏览器嗅探，混杂模式
        return {
            width: document.body.clientWidth,
            height: document.body.clientHeight
        };
    } else {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        };
    }
}
```


```
//获得文档的大小（区别与视口）,与上面获取视口大小的方法如出一辙
function getDocumentPort () {
    if(document.compatMode == "BackCompat") {
        return {
            width: document.body.scrollWidth,
            height: document.body.scrollHeight
        };
    } else {
        return {
            width: Math.max(document.documentElement.scrollWidth,document.documentElement.clientWidth),
            height: Math.max(document.documentElement.scrollHeight,document.documentElement.clientHeight)
        }
    }
}
```

