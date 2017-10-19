---
layout:     post
title:      "eval() 函数"
date:       2017-10-19 12:58:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - JavaScript
---

> “Yeah It's on. ”


## 正文
 
[网页链接](http://www.w3school.com.cn/jsref/jsref_eval.asp)

### 定义和用法
eval() 函数可计算某个字符串，并执行其中的的 JavaScript 代码。

### 语法
eval(string)
string  	必需。要计算的字符串，其中含有要计算的 JavaScript 表达式或要执行的语句。

返回值  通过计算 string 得到的值（如果有的话）。

### 说明
该方法只接受原始字符串作为参数，如果 string 参数不是原始字符串，那么该方法将不作任何改变地返回。因此请不要为 eval() 函数传递 String 对象来作为参数。

如果试图覆盖 eval 属性或把eval()方法赋予另一个属性，并通过该属性调用它，则 ECMAScript 实现允许抛出一个 EvalError 异常。

### 提示和注释
虽然 eval() 的功能非常强大，但在实际使用中用到它的情况并不多。

### 实例
```
<script type="text/javascript">

eval("x=10;y=20;document.write(x*y)")

document.write(eval("2+2"))

var x=10
document.write(eval(x+17))

</script>

输出：
200
4
27
```

```
eval("2+3")	// 返回 5
var myeval = eval;	// 可能会抛出 EvalError 异常
myeval("2+3");	// 可能会抛出 EvalError 异常
```
可以使用下面这段代码来检测 eval() 的参数是否合法：
```
try  {
     alert("Result:" + eval(prompt("Enter an expression:","")));
     }

catch(exception) {
     alert(exception);
     }
```


----------
js中这个函数eval（）对json数据有什么用？那eval( '(' + content + ')' )里边为什么要加引号呢？ 


对于服务器返回的JSON字符串，如果jquery异步请求没做类型说明，或者以字符串方式接受，那么需要做一次对象化处理，方式不是太麻烦，就是将该字符串放于eval()中执行一次。这种方式也适合以普通javascipt方式获取json对象，以下举例说明：

var dataObj=eval("("+data+")");//转换为json对象
为什么要 eval这里要添加 “("("+data+")");//”呢？

原因在于：eval本身的问题。 由于json是以”{}”的方式来开始以及结束的，在JS中，它会被当成一个语句块来处理，所以必须强制性的将它转换成一种表达式。

**加上圆括号的目的是迫使eval函数在处理JavaScript代码的时候强制将括号内的表达式（expression）转化为对象，而不是作为语 句（statement）来执行。**


举一个例子，例如对象字面量{}，如若不加外层的括号，那么eval会将大括号识别为JavaScript代码块的开始 和结束标记，那么{}将会被认为是执行了一句空语句。所以下面两个执行结果是不同的：
alert(eval("{}"); // return undefined
alert(eval("({})");// return object[Object]