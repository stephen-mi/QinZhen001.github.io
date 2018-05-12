---
layout:     post
title:      "event中的offsetX触发到子元素"
date:       2018-05-13 00:24:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - JavaScript
---

> “Yeah It's on. ”


## 正文
event中的offsetX 会触发到子元素中

应该怎么解决？


#### 解决方案1
在事件捕获阶段处理，阻止冒泡。
e.stopPropagation();
e.preventDefault();



#### 解决方案2
判断元素 e.target === 父元素 时候获取


#### **解决方案3(最好)**
不使用offsetX

用event.pageX - xxx.getBoundingClientRect().left

在jquery中可以用event.pageX - xxx.offset().left


>jquery中的offset()方法返回或设置匹配元素相**对于文档的偏移**（位置）。


