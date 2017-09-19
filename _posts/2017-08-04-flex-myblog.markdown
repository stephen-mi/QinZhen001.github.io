---
layout:     post
title:      "flex"
date:       2017-08-04 23:02:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Css
---

> “Yeah It's on. ”


## 正文
[网页链接](http://www.jianshu.com/p/07e0c16a4ff5#)

flex:0 1 auto;

* flex-grow:0;	定义弹性盒子项的拉伸因子，即子项分配父项剩余空间的比，默认值为 0
* flex-shrink:1;	指定了 flex 元素的收缩规则，子项的收缩所占的份数，默认值为1 
[ 当所有子项相加的宽度大于父项的宽度，每个子项减少的多出的父项宽度的 1/n ]
* felx-basis:auto;	指定了 flex 元素在主轴方向上的初始大小，即子项的宽度


## 后记
flex 属性，是 flex-grow 、flex-shrink 和 flex-basis 属性的简写，描述弹性项目的整体的伸缩性

display:flex; 设置在外层容器父级，表示该容器使用弹性盒布局方式
flex:1; 设置在子项，数值表示占据剩余空间的份数

 