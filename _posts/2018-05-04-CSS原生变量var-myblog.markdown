---
layout:     post
title:      "CSS原生变量var"
date:       2018-05-04 20:41:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Css
---

> “Yeah It's on. ”

## 前言
最近做了一个[有悬浮效果的button动画](https://github.com/QinZhen001/animation-demo/blob/master/suspended-button/index.html)，在::before元素用到了var(),所以在网上找些文章加深理解





## 正文
[网页链接](http://www.zhangxinxu.com/wordpress/2016/11/css-css3-variables-var/)


### CSS变量var()语法和用法和特性
CSS中原生的变量定义语法是：--*，变量使用语法是：var(--*)，其中*表示我们的变量名称。关于命名这个东西，各种语言都有些显示，例如CSS选择器不能是数字开头，JS中的变量是不能直接数值的，但是，在CSS变量中，这些限制通通没有，例如：

```
:root {
  --1: #369;
}
body {
  background-color: var(--1);
}
```

但是，不能包含$，[，^，(，%等字符，普通字符局限在只要是“数字[0-9]”“字母[a-zA-Z]”“下划线_”和“短横线-”这些组合，但是可以是中文，日文或者韩文，例如：


```
body {
  --深蓝: #369;
  background-color: var(--深蓝);
}
```





#### CSS变量使用完整语法

CSS变量使用的完整语法为：var( [, ]? )，用中文表示就是：var( <自定义属性名> [, <默认值 ]? )，

意思就是，如果我们使用的变量没有定义（注意，仅限于没有定义），则使用后面的值作为元素的属性值。举个例子：
```
.box {
  --1: #369;
}
body {
  background-color: var(--1, #cd0000);
}
```



### CSS变量不合法的缺省特性
请看下面这个例子：
```
body {
  --color: 20px;
  background-color: #369;
  background-color: var(--color, #cd0000);
}
```
请问，此时<body>的背景色是？

A. transparent    B. 20px     C. #369      D. #cd0000
答案是…………………………A. transparent

不知大家答对了没有！

这是CSS变量非常有意思的一个点，对于CSS变量，只要语法是正确的，就算变量里面的值是个乱七八糟的东西，也是会作为正常的声明解析，如果发现变量值是不合法的，例如上面背景色显然不能是20px，则使用背景色的缺省值，也就是默认值代替，于是，上面CSS等同于：
```
body {
--color: 20px;
background-color: #369;
background-color: transparent;
}
```
千万不能想当然得认为等同于background-color:20px，这也是为什么上面要强调CSS默认值的使用仅限于变量未定义的情况，并不包括变量不合法。



### CSS变量的空格尾随特性
请看下面这个例子：
```
body {
  --size: 20;   
  font-size: var(--size)px;
}
```
请问，此时<body>的font-size大小是多少？

如果你以为是20px就太天真了，实际上，此处font-size:var(--size)px等同于font-size:20 px，注意，20后面有个空格，所以，这里的font-size使用的是`<body>`元素默认的大小。因此，就不要妄图取消就使用一个数值来贯穿全场，还是使用稳妥的做法：
```
body {
  --size: 20px;   
  font-size: var(--size);
}
```
或者使用CSS3 calc()计算：
```
body {
  --size: 20;   
  font-size: calc(var(--size) * 1px);
}
```
此时，`<body>`的font-size大小才是20px，


