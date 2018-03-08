---
layout:     post
title:      "jquery中的hover()"
date:       2018-03-05 15:46:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Jquery
---

> “Yeah It's on. ”


## 正文
[网页链接](http://blog.csdn.net/ss1106404013/article/details/48544213)

按照平时写jquery的思路，写鼠标滑入滑出效果都习惯性的使用hover()方法，但是今天脑子发热，想试试mouseover()，mouseout()。

补充：jquery源码中有这么一段：
```
hover: function( fnOver, fnOut ) {
return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
}
```
也就是说hover！= mouseover+mouseout。但hover=mouseenter + mouseleave


mouseover()方法触发mouseover事件，这是不用多说的，mouseover事件是在鼠标进入**指定元素时或者任意子元素**的时候触发，而mouseenter事件只有在鼠标**进入被选元素时触发**；

mouseout()方法触发mouseout事件，当鼠标离开**被选元素或者任意子级元素的时候触发**，而mouseleave事件只有在鼠标**离开被选元素时触发**。


>mouseleave()和mouseenter()经常配合一起使用，
>mouseover()和mouseout()经常配合一起使用。

## 后记
经过自己的测试，mousedown，mousemove，mouseup都会进行事件冒泡。
```
    jQuery(document).ready(function ($) {
        $(".content").mousedown(e => {
            console.log("content mousedown")
        }).mousemove(e => {
            console.log("content mousemove")
        }).mouseup(e => {
            console.log("content mouseup")
        })

        $(".container").mousedown(e => {
            console.log("container mousedown")
        }).mousemove(e => {
            console.log("container mousemove")
        }).mouseup(e => {
            console.log("container mouseup")
        })
    });
```

鼠标在子节点触发事件，父节点也会触发事件。
