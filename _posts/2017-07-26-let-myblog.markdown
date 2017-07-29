---
layout:     post
title:      "let"
date:       2017-07-26 13:30:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - JavaScript
---

> “Yeah It's on. ”


## 正文
[网页链接](http://blog.csdn.net/nfer_zhuang/article/details/48781671)

第一次接触let关键字，有一个要非常非常要注意的概念就是<strong>”JavaScript 严格模式”</strong>


* let : 变量只能声明一次
* var : 变量可以多次声明

let的好处是当我们写代码比较多的时候可以避免在不知道的情况下重复声明变量

声明后未赋值，表现相同
```
'use strict';

(function() {
  var varTest;
  let letTest;
  console.log(varTest); //输出undefined
  console.log(letTest); //输出undefined
}());
```
使用未声明的变量，表现不同:
```
(function() {
  console.log(varTest); //输出undefined(注意要注释掉下面一行才能运行)
  console.log(letTest); //直接报错：ReferenceError: letTest is not defined

  var varTest = 'test var OK.';
  let letTest = 'test let OK.';
}());
```
重复声明同一个变量时，表现不同：
```
'use strict';

(function() {
  var varTest = 'test var OK.';
  let letTest = 'test let OK.';

  var varTest = 'varTest changed.';
  let letTest = 'letTest changed.'; //直接报错：SyntaxError: Identifier 'letTest' has already been declared

  console.log(varTest); //输出varTest changed.(注意要注释掉上面letTest变量的重复声明才能运行)
  console.log(letTest);
}());
```
变量作用范围，表现不同
```
'use strict';

(function() {
  var varTest = 'test var OK.';
  let letTest = 'test let OK.';

  {
    var varTest = 'varTest changed.';
    let letTest = 'letTest changed.';
  }

  console.log(varTest); //输出"varTest changed."，内部"{}"中声明的varTest变量覆盖外部的letTest声明
  console.log(letTest); //输出"test let OK."，内部"{}"中声明的letTest和外部的letTest不是同一个变量
}());
```
## 后记

1. const定义的变量不可以修改，而且必须初始化。
2. var定义的变量可以修改，如果不初始化会输出undefined，不会报错。
3. let是块级作用域，函数内部使用let定义后，对函数外部无影响
