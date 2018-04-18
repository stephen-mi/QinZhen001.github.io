---
layout:     post
title:      "escape()、encodeURI()、encodeURIComponent()区别详解"
date:       2018-04-17 22:04:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - JavaScript
---

> “Yeah It's on. ”


## 正文
[网页链接](https://www.cnblogs.com/yelongsan/p/5872648.html)


### 为啥会有浏览器编码这一说法
一般来说，URL只能使用英文字母、阿拉伯数字和某些标点符号，不能使用其他文字和符号。比如，世界上有英文字母的网址 “http://www.haorooms.com”， 但是没有希腊字母的网址“http://www.aβγ.com” 


>“只有字母和数字[0-9a-zA-Z]、一些特殊符号“$-_.+!*'(),”[不包括双引号]、以及某些保留字，才可以不经过编码直接用于URL。”


这意味着，如果URL中有汉字，就必须编码后使用。但是麻烦的是，RFC 1738没有规定具体的编码方法，而是交给应用程序（浏览器）自己决定。这导致“URL编码”成为了一个混乱的领域。


JavaScript中有三个可以对字符串编码的函数，分别是： escape,encodeURI,encodeURIComponent，相应3个解码函数：unescape,decodeURI,decodeURIComponent 。

下面简单介绍一下它们的区别

### escape()函数

定义和用法 
escape() 函数可对字符串进行编码，这样就可以在所有的计算机上读取该字符串。

语法 
escape(string)

参数 描述 
string 必需。要被转义或编码的字符串。

返回值 
已编码的 string 的副本。其中某些字符被替换成了十六进制的转义序列。

说明 
该方法不会对 ASCII 字母和数字进行编码，也不会对下面这些 ASCII 标点符号进行编码： - _ . ! ~ * ' ( ) 。**其他所有的字符都会被转义序列替换。**

>已废弃，不建议使用


### encodeURI()函数 
定义和用法 
encodeURI() 函数可把字符串作为 URI 进行编码。

语法 
encodeURI(URIstring)

参数 描述 
URIstring 必需。一个字符串，含有 URI 或其他要编码的文本。

返回值 
URIstring 的副本，其中的某些字符将被十六进制的转义序列进行替换。

说明 
该方法不会对 ASCII 字母和数字进行编码，也不会对这些 ASCII 标点符号进行编码： - _ . ! ~ * ' ( ) 。

该方法的目的是对 URI 进行完整的编码，**因此对以下在 URI 中具有特殊含义的 ASCII 标点符号，encodeURI() 函数是不会进行转义的：;/?:@&=+$,#**

 

### encodeURIComponent() 函数

定义和用法 
encodeURIComponent() 函数可把字符串作为 URI 组件进行编码。

语法 
encodeURIComponent(URIstring)

参数 描述 
URIstring 必需。一个字符串，含有 URI 组件或其他要编码的文本。

返回值 
URIstring 的副本，其中的某些字符将被十六进制的转义序列进行替换。

说明 
该方法不会对 ASCII 字母和数字进行编码，也不会对这些 ASCII 标点符号进行编码： - _ . ! ~ * ' ( ) 。

**其他字符（比如 ：;/?:@&=+$,# 这些用于分隔 URI 组件的标点符号），都是由一个或多个十六进制的转义序列替换的。**

提示和注释 
提示：请注意 encodeURIComponent() 函数 与 encodeURI() 函数的区别之处，前者假定它的参数是 **URI 的一部分**（比如协议、主机名、路径或查询字符串）。因此 encodeURIComponent() 函数将转义用于分隔 URI 各个部分的标点符号。



## 总结

```
    var url = 'http://www.w3school.com.cn/你好'
    console.log(encodeURI(url))  //  http://www.w3school.com.cn/%E4%BD%A0%E5%A5%BD
    console.log(encodeURIComponent(url)) //  http%3A%2F%2Fwww.w3school.com.cn%2F%E4%BD%A0%E5%A5%BD
```

通过对三个函数的分析，我们可以知道：escape()除了 ASCII 字母、数字和特定的符号外，对传进来的字符串全部进行转义编码，因此如果想对URL编码，最好不要使用此方法。而encodeURI() 用于编码整个URI,因为URI中的合法字符都不会被编码转换。encodeURIComponent方法在编码单个URIComponent（指请求参数）应当是最常用的，它可以讲参数中的中文、特殊字符进行转义，而不会影响整个URL。



**“; / ? : @ & = + $ , #”，这些在encodeURI()中不被编码的符号，在encodeURIComponent()中统统会被编码。**


>encodeURIComponent() 能编码"; / ? : @ & = + $ , #"这些特殊字符。对应的解码函数是decodeURIComponent()。


















