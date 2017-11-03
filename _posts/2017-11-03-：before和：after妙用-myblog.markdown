---
layout:     post
title:      ":before和:after妙用"
date:       2017-11-03 23:31:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Css
---

> “Yeah It's on. ”


## 正文
 
### 如何解决父元素的第一个子元素的margin-top越界问题

1. 为父元素加border-top: 1px;——有副作用
2. 为父元素指定padding-top: 1px;——有副作用
3. 为父元素指定overflow:hidden;——有副作用
4. **为父元素添加前置内容生成——推荐使用
    .parent:before {
    content: '  ';
    display: table;
}**


### 如何解决所有的子元素浮动后父元素高度变为0

1. 为父元素指定overflow:hidden;——有副作用
2. 为父元素指定高度：height: xxx;——有局限性
3. **为父元素添加后置内容生成——推荐使用
    .parent:after {
    content: '  ';
    display: table;
    clear: both;
}**
