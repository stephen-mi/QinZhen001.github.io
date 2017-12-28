---
layout:     post
title:      "svg的stroke属性"
date:       2017-12-26 23:21:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Html
---

> “Yeah It's on. ”


## 正文


[网页链接](http://blog.csdn.net/ning0_o/article/details/54970474)

### stroke
定义一条线，文本或元素轮廓颜色

### stroke-width
定义一条线，文本或元素轮廓厚度

### stroke-linecap
描边端点表现形式
```
<svg>
  <g fill='none' stroke='black' stroke-width='10'>
    <path stroke-linecap='butt' d='M5 20 l215 0' />
    <path stroke-linecap='round' d='M5 40 l215 0' stroke='red'/>
    <path stroke-linecap='square' d='M5 60 l215 0' />
  </g>
</svg>
```

### **stroke-dasharray**
用于创建虚线
* stroke-dasharray = '10'
* stroke-dasharray = '10, 10'
* stroke-dasharray = '10, 10, 5, 5'

绘制虚线: 一个参数时：表示一段虚线长度和每段虚线之间的间距

两个参数或者多个参数时：一个表示长度，一个表示间距

### **stroke-dashoffset**
定义一条线，文本或元素距离（相当于基于position：relative；**设置left值**。只是不像left单纯的基于x方向设置， stroke-dashoffset是基于svg路径设置的） 


----------

>stroke-dasharray和stroke-dashoffset相结合可以做出很炫酷的效果

举个例子：按钮鼠标滑过动效，（鼠标滑过按钮，边框绕自身选中一周）

```
   #shape {
      stroke-width: 6px;
      fill: transparent;
      stroke: #009FFD;
      stroke-dasharray: 85 400;
      stroke-dashoffset: -220;
      transition: 1s all ease
    }
    svg:hover #shape {
      stroke-dasharray: 70 0;
      stroke-width: 3px;
      stroke-dashoffset: 0;
      stroke: #06D6A0
    }

  <svg height="40" width="150">
    <rect id="shape" height="40" width="150" />
  </svg>
```

### stroke-linejoin
stroke-linejoin = miter
stroke-linejoin = round
stroke-linejoin = bevel

### stroke-opacity
描边透明度
