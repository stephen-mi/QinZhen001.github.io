---
layout:     post
title:      "Javascript中的高阶函数"
date:       2018-01-18 23:28:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - JavaScript
---

> “Yeah It's on. ”


## 正文

[网页链接](http://www.jb51.net/article/62256.htm)


高阶函数只是将函数作为参数或返回值的函数。



以上面的Hello,World作为一个简单的例子
```
var Moqi = function(p1){
    this.add = function (p2){
        return p1 + ' ' + p2;
    };
    return add;
};
```
我们便可以这样使用这个函数
`console.log(Moqi('Hello')('World'));`

详细一点
```
typeof Moqi('Hello')   =>   "function"

Moqi('Hello') =>

function (p2){
        return p1 + ' ' + p2;
    }
```
也就是说实际上Moqi('Hello')是一个函数

```
var m = Moqi('Hello')       
m('World')

"Hello,World"
```

>从上面的情况来看，高阶函数可以使代码更简洁、高效


### 真实运用
```
add = function(a,b){
    return a + b;
};

function math(func,array){
    return func(array[0],array[1]);
}

console.log(math(add,[1,2]));

> math(add,[1,2])
< 3
```

在jQuery中:
```
// Convert dashed to camelCase; used by the css and data modules
// Microsoft forgot to hump their vendor prefix (#9572)
camelCase: function( string ) {
    return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
```










