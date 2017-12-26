---
layout:     post
title:      "clientWidth和getBoundingClientRect"
date:       2017-11-29 23:12:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - JavaScript
---

> “Yeah It's on. ”

[网页链接](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/Determining_the_dimensions_of_elements)


## 二者的区别

>document.documentElement.clientWidth
document.documentElement.getBoundingClientRect().width;


getBoundingClientRect().width获取到的其实是父级的右边距离浏览器原点(0,0)减去左边距离浏览器原点(0,0)的距离,
**即宽度+2padding+2border**


**clientWidth等于宽度+2padding,不包括边框的宽度**


## offsetWidth和offsetHeight

**If you need to know the total amount of space an element occupies, including the width of the visible content, scrollbars (if any), padding, and border**


In case of transforms, the `offsetWidth` and `offsetHeight` returns the element's layout width and height, while `getBoundingClientRect()` returns the rendering width and height.

#### example
if the element has width: 100px; and transform: scale(0.5); the getBoundingClientRect() will return 50 as the width, while offsetWidth will return 100.

![enter description here][1]

## clientWidth和clientHeight

If you need to know the actual size of the content, regardless of how much of it is currently visible, you need to use the `scrollWidth` and `scrollHeight` properties. These return the width and height of the entire content of an element, even if only part of it is presently visible due to the use of scroll bars.


![enter description here][2]


## scrollWidth and scrollHeight 

If you need to know the actual size of the content, regardless of how much of it is currently visible, you need to use the `scrollWidth` and `scrollHeight` properties. These return the width and height of the entire content of an element, even if only part of it is presently visible due to the use of scroll bars.

**For example, if a 600x400 pixel element is being displayed inside a 300x300 pixel scrollbox, scrollWidth will return 600 while scrollHeight will return 400.**





  [1]: https://developer.mozilla.org/@api/deki/files/186/=Dimensions-offset.png
  [2]: https://developer.mozilla.org/@api/deki/files/185/=Dimensions-client.png