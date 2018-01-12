---
layout:     post
title:      "bind()绑定函数"
date:       2018-01-11 16:43:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Other
---

> “Yeah It's on. ”


## 绑定函数
在讨论bind()方法之前我们先来看一道题目：
```
var altwrite = document.write;
altwrite("hello");
//1.以上代码有什么问题
//2.正确操作是怎样的
//3.bind()方法怎么实现
```

>报错: Uncaught TypeError: Illegal invocation

对于上面这道题目，答案并不是太难，主要考点就是this指向的问题，altwrite()函数改变this的指向global或window对象，导致执行时提示非法调用异常，正确的方案就是使用bind()方法：

```
altwrite.bind(document)("hello")
```

当然也可以使用call()方法：
altwrite.call(document, "hello")



### bind()方法的使用

bind()最简单的用法是创建一个函数，使这个函数不论怎么调用都有同样的this值。常见的错误就像上面的例子一样，将方法从对象中拿出来，然后调用，并且希望this指向原来的对象。如果不做特殊处理，一般会丢失原来的对象。使用bind()方法能够很漂亮的解决这个问题：

```
this.num = 9; 
var mymodule = {
  num: 81,
  getNum: function() { return this.num; }
};

module.getNum(); // 81

var getNum = module.getNum;
getNum(); // 9, 因为在这个例子中，"this"指向全局对象

// 创建一个'this'绑定到module的函数
var boundGetNum = getNum.bind(module);
boundGetNum(); // 81
```




