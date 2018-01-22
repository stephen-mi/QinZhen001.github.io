---
layout:     post
title:      "Jquery中scrollTop()返回顶部特效 "
date:       2018-01-22 23:41:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Jquery
---

> “Yeah It's on. ”


## 正文

http://blog.csdn.net/dexing07/article/details/52463241



scrollTop()
获取第一段相对滚动条顶部的偏移 
你可以在方法参数上设置你的滚动条相对顶部的位置


----------


可以设置$(window).scrollTop（0）;返回最顶部

如果你想设置缓慢的上升的话，可以使用jq的动画效果

`$('body,html').animate({scrollTop:0},500)`

可以设置body跟html作为对象，返回到最顶部