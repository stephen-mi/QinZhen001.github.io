---
layout:     post
title:      "::before和::after伪元素"
date:       2017-11-03 23:31:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Css
---

> “Yeah It's on. ”


## 正文


### 获取伪元素的属性值
获取伪元素的属性值可以使用 window.getComputedStyle() 方法，获取伪元素的CSS样式声明对象。然后利用getPropertyValue方法或直接使用键值访问都可以获取对应的属性值。

语法：window.getComputedStyle(element[, pseudoElement])


参数如下：

element（Object）：伪元素的所在的DOM元素；

pseudoElement（String）：伪元素类型。可选值有：”:after”、”:before”、”:first-line”、”:first-letter”、”:selection”、”:backdrop”；

举个栗子：
```
// CSS代码
#myId:before {
content: "hello world!";
display: block;
width: 100px;
height: 100px;
background: red;
}
// HTML代码
<div id="myId"></div>
// JS代码
var myIdElement = document.getElementById("myId");
var beforeStyle = window.getComputedStyle(myIdElement, ":before");
console.log(beforeStyle); // [CSSStyleDeclaration Object]
console.log(beforeStyle.width); // 100px
console.log(beforeStyle.getPropertyValue("width")); // 100px
console.log(beforeStyle.content); // "hello world!"
```


>getPropertyValue()方法在IE9+和其他现代浏览器中都支持；在IE6~8中，可以使用getAttribute()方法来代替；
 
### 如何解决父元素的第一个子元素的margin-top越界问题

1. 为父元素加border-top: 1px;——有副作用
2. 为父元素指定padding-top: 1px;——有副作用
3. 为父元素指定overflow:hidden;——有副作用
4. **为父元素添加前置内容生成——推荐使用
    .parent:before {
    content: '  ';
    display: table;
}**


### 如何解决所有的子元素浮动后父元素高度变为0

1. 为父元素指定overflow:hidden;——有副作用
2. 为父元素指定高度：height: xxx;——有局限性
3. **为父元素添加后置内容生成——推荐使用
    .parent:after {
    content: '  ';
    display: table;
    clear: both;
}**
