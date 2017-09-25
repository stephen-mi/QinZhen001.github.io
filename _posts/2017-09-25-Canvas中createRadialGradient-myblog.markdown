---
layout:     post
title:      "Canvas中createRadialGradient"
date:       2017-09-25 13:16:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Html
---

> “Yeah It's on. ”


## 正文
[网页链接](http://www.360doc.com/content/15/1014/15/28180908_505594108.shtml)

createLinearGradient(xStart, yStart, radiusStart, xEnd, yEnd, radiusEnd)

前三个参数是起始圆（cycle1）的x、y、半径，后三个是终点圆（cycle2）的x、y、半径

* xStart, yStart	开始圆的圆心的坐标。
* radiusStart	开始圆的半径。
* xEnd, yEnd	结束圆的圆心的坐标。
* radiusEnd	结束圆的半径。

```
canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');
var cycle1 = {
    x: 150,
    y: 150,
    r: 25
}
var cycle2 = {
    x: 250,
    y: 250,
    r: 50
}
ctx.beginPath();
ctx.arc(cycle1.x, cycle1.y, cycle1.r, 0, Math.PI*2, false);
ctx.stroke();
ctx.beginPath();
ctx.arc(cycle2.x, cycle2.y, cycle2.r, 0, Math.PI*2, false);
ctx.stroke();
 
var gr = ctx.createRadialGradient(cycle1.x, cycle1.y, cycle1.r, cycle2.x, cycle2.y, cycle2.r);
gr.addColorStop(0, 'rgba(255, 0, 0, 0.75)');
gr.addColorStop(0.5, 'rgba(0, 255, 0, 0.75)');
gr.addColorStop(1, 'rgba(0, 0, 255, 0.75)');
 
ctx.fillStyle = gr;
ctx.fillRect(0, 0, 500, 500);
```

其中两个圆相离的情况得到的渐变图案很神奇。createRadialGradient实现的线性渐变的原理是：发生渐变的区域是，cycle1上的点到cycle2上的点所连成区域，所以当两个圆相离的时候，会形成放射状的扇形。可能还是有点难理解，把两个圆放到三维的场景下，就容易看懂了。