---
layout:     post
title:      "display:inline-block"
date:       2017-08-11 23:10:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - CSS
---

> “Yeah It's on. ”


## 正文
[网页链接]()

<a>标签1</a><a>标签2</a><a>标签3</a>
a标签本来就是内联
这样写，他出来效果就是--------标签1标签2标签3

但如果你想要定义宽度,不加块状是起不来作用的，都是单单加块状（display:block），他又换行了，所以这时加display:inline-block 就起到很大作用，内联块状，宽度既能实现，又能不换行...

a{width:100px; display:inline-block}


## 后记
但是对所有的块元素都没有意义，块元素的dispaly属性默认值为block，没必要再显式定义——除非你之前对块元素的display属性重新定义过。

display：block；比较常用于`<a><span>`这两个标签——因为这两个标签非块元素，如果不用display：block定义一下，那么定义width、height等和长宽相关的css属性时会发现完全不生效。
 