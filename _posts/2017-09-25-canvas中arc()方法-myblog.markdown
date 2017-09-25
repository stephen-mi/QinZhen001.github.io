---
layout:     post
title:      "canvas中arc() 方法"
date:       2017-09-25 13:25:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Html
---

> “Yeah It's on. ”


## 正文
[网页链接](http://www.w3school.com.cn/tags/canvas_arc.asp)

context.arc(x,y,r,sAngle,eAngle,counterclockwise);


* x	圆的中心的 x 坐标。
* y	圆的中心的 y 坐标。
* r	圆的半径。
* sAngle	起始角，以弧度计。（弧的圆形的三点钟位置是 0 度）。
* eAngle	结束角，以弧度计。
* counterclockwise	可选。规定应该逆时针还是顺时针绘图。False = 顺时针，true = 逆时针。





```
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
ctx.beginPath();
ctx.arc(100,75,50,0,2*Math.PI);
ctx.stroke();
```


![enter description here][1]





  [1]: http://www.w3school.com.cn/i/arc.gif