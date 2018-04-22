---
layout:     post
title:      "css()与addClass()"
date:       2017-07-28 22:54:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Jquery
---

> “Yeah It's on. ”


## 正文
[网页链接](https://www.cnblogs.com/diaoniwa/p/6617448.html)

.addClass()的本质是通过定义个class类的样式规则，给元素添加一个或多个类。

css方法是通过JavaScript大量代码进行改变元素的样式

### 可维护性
通过.addClass()我们可以批量的给相同的元素设置统一规则，变动起来比较方便，可以统一修改删除。如果通过.css()方法就需要指定每一个元素是一一的修改，日后维护也要一一的修改，比较麻烦

### 灵活性
通过.css()方式可以很容易动态的去改变一个样式的属性，不需要在去繁琐的定义个class类的规则。一般来说在不确定开始布局规则，通过动态生成的HTML代码结构中，都是通过.css()方法处理的


### 样式值
.addClass()本质只是针对class的类的增加删除，不能获取到指定样式的属性的值，.css()可以获取到指定的样式值。


### **优先级**
css的样式是有优先级的，当外部样式、内部样式和内联样式同一样式规则同时应用于同一个元素的时候，优先级如下

外部样式 < 内部样式 < 内联样式


* .addClass()方法是通过增加class名的方式，那么这个样式是在外部文件或者内部样式中先定义好的，等到需要的时候在附加到元素上
* 通过.css()方法处理的是内联样式，直接通过元素的style属性附加到元素上的

**通过.css方法设置的样式属性优先级要高于.addClass方法**





## 总结
.addClass与.css方法各有利弊，一般是静态的结构，都确定了布局的规则，可以用addClass的方法，增加统一的类规则


如果是动态的HTML结构，在不确定规则，或者经常变化的情况下，一般多考虑.css()方式


## 补充知识
css("propertyname");
返回指定的选择器的CSS 属性的值**(经过亲身试验，只能匹配选择器选择到的第一个元素)**

举个栗子
`$('div').css('font-size')`
只能选择到第一个div的font-size的值



`$('.first').css("background-color")`
background-color:blue; => rgb(0, 0, 255)
**颜色都会转化成统一的rgb标示**


`$('.first').css("font-size")`
**字体大小都会转化成统px大小 em=>px**


获取尺寸，传入CSS属性组成的一个**数组**
`var value = $('.first').css(['width', 'height'])`
value为{width: "60px", height: "60px"}



