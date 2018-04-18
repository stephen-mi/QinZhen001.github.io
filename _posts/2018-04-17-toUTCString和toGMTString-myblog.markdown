---
layout:     post
title:      "toUTCString和toGMTString区别"
date:       2017-04-17 22:35:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - JavaScript
---

> “Yeah It's on. ”


## 正文
[网页链接](http://www.w3school.com.cn/jsref/jsref_toGMTString.asp)

### 定义和用法
toGMTString() 方法可根据格林威治时间 (GMT) 把 Date 对象转换为字符串，并返回结果。


语法
dateObject.toGMTString()


返回值
dateObject 的字符串表示。此日期会在转换为字符串之前由本地时区转换为 GMT 时区。


**不赞成使用此方法。请使用 toUTCString() 取而代之！！**



**目前UTC已经取代GMT作为新的世界时间标准**


```
console.log(new Date().toDateString()) //Tue Apr 17 2018
console.log(new Date().toGMTString()) //Tue, 17 Apr 2018 14:37:22 GMT
console.log(new Date().toUTCString())  //Tue, 17 Apr 2018 14:37:22 GMT
```







