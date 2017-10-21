---
layout:     post
title:      "border-1px()"
date:       2017-10-19 16:45:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Css
---

> “Yeah It's on. ”


## 正文
 
[网页链接](http://www.cnblogs.com/yuqingfamily/articles/5798928.html)

利用after伪元素添加border

**stylus写法**

```
border-1px($color)
  position: relative
  &:after
    display: block
    position: absolute
    left: 0
    bottom: 0
    width: 100%
    border-top: 1px solid $color
    content: ' '
```

### 调用
```
 .food
          position relative
          padding 12px 0
          box-sizing border-box
          border-1px(rgba(7, 17, 27, 0.1))
```
