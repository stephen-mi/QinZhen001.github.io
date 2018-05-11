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


### 高阶函数实现AOP 
AOP（面向面编程）的主要作用是把一些核心业务逻辑模块无关的功能抽离出来，这些跟 业务逻辑无关的功能通常包括日志统计、安全控制、异常处理。这些功能出来之后， 通过“动态”的方式业辑模中。

```
   Function.prototype.before = function (beforeFn) {
        var _self = this; //保存原函数的引用
        return function () {
            //返回了包含了原函数和新函数的"代理"函数
            beforeFn.apply(this, arguments) //执行新函数，修正this
            return _self.apply(this, arguments) //执行原函数
        }
    }

    Function.prototype.after = function (afterFn) {
        var _self = this
        return function () {
            var ret = _self.apply(this, arguments)
            afterFn.apply(this, arguments)
            return ret
        }
    }

    var func = function () {
        console.log(2)
    }


    func = func.before(() => console.log(1)).after(() => console.log(3))

    func()  //输出1 2 3
```







