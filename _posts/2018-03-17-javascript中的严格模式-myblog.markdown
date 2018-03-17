---
layout:     post
title:      "javascript中的严格模式"
date:       2017-03-17 14:37:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - JavaScript
---

> “Yeah It's on. ”


## 正文
[网页链接](https://www.cnblogs.com/liaojie970/p/7154144.html)

### JS中的“use strict” 严格模式
ECMAScript 5 引入严格模式('strict mode')概念。通过严格模式，在函数内部选择进行较为严格的全局或局部的错误条件检测，使用严格模式的好处是可以提早知道代码中的存在的错误，

及时捕获一些可能导致编程错误的ECMAScript行为。在开发中使用严格模式能帮助我们早发现错误。


#### 严格模式影响范围
* 变量：  var、delete、变量关键字
* 对象： 只读属性、 对象字面量属性重复申明
* 函数：参数重名、arguments对象、申明
* 其他：this、eval、关键字...


----------


设立"严格模式"的目的，主要有以下几个：错误检测、规范、效率、安全、面向未来
* 消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;
* 消除代码运行的一些不安全之处，保证代码运行的安全；
* 提高编译器效率，增加运行速度；
* 为未来新版本的Javascript做好铺垫。


进入"严格模式"的编译指示（pragma），是下面这行语句：　　
`"use strict";`

将"use strict"放在脚本文件的第一行，则整个脚本都将以"严格模式"运行。

如果这行语句不在第一行，则无效，整个脚本以"正常模式"运行。

如果不同模式的代码文件合并成一个文件，这一点需要特别注意。




