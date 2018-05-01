---
layout:     post
title:      "with关键字"
date:       2018-05-01 23:12:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - JavaScript
---

> “Yeah It's on. ”


## 正文
[网页链接](http://www.jb51.net/article/79474.htm)



### with关键字
with语句的作用是将代码的作用域设置到一个特定的作用域中


基本语法如下：

`with (expression) statement; `


使用with关键字的目的是为了简化多次编写访问同一对象的工作，比如下面的例子：
```
var qs = location.search.substring(1);
var hostName = location.hostname;
var url = location.href;
```

这几行代码都是访问location对象中的属性，如果使用with关键字的话，可以简化代码如下

```
with (location){
    var qs = search.substring(1); 
    var hostName = hostname;  
    var url = href;
}
```

在这段代码中，使用了with语句关联了location对象，这就以为着在with代码块内部，每个变量首先被认为是一个局部变量，如果局部变量与location对象的某个属性同名，则这个局部变量会指向location对象属性。



>注意：在严格模式下不能使用with语句。



### with关键字的弊端
1. 性能问题
2. 语义不明，调试困难


#### 性能问题