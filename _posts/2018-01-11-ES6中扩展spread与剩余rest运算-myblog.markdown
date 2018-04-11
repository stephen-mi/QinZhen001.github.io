---
layout:     post
title:      "ES6中rest参数"
date:       2018-01-11 15:39:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - ES6
---

> “Yeah It's on. ”

## 正文

[网页链接](http://blog.csdn.net/kittyjie/article/details/50400904)


Rest操作符和Spread操作都是用三个点（...）表示，但作用整好相反。

**Rest操作符一般用在函数参数的声明中，而Spread用在函数的调用中。**

```
'use strict';  
  
function func(...args){  
    console.log(args);//[1,2,3,4]  
}  
  
func(1,2,3,4);  
```

我们知道在strict mode下，对arguments做了很多限制，而且arguments是个arrayLike对象，不能像操作数组那样直接操作它。但用Rest操作符以后，args参数就是一个数组了，任何操作数组的方法都可以直接对args使用。