---
layout:     post
title:      "Dom的getComputedStyle()方法"
date:       2017-11-28 19:56:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - JavaScript
---

> “Yeah It's on. ”


## 正文


[网页链接](http://blog.csdn.net/s110902/article/details/73312802?locationNum=12&fps=1)


getComputedStyle是一个可以获取当前元素所有最终使用的CSS属性值。


### 用法
window.getComputedStyle(element[,pseudo-element]); 

首先是有两个参数，元素和伪类。第二个参数不是必须的，当不查询伪类元素的时候可以忽略或者传入 null。

### 使用示例：
```
let style = window.getComputedStyle(my_div, null);
```

### 返回值
getComputedStyle 返回的对象是 CSSStyleDeclaration 类型的对象。取数据的时候可以直接按照属性的取法去取数据，例如 style.backgroundColor。

**需要注意的是，返回的对象的键名是 css 的驼峰式写法，background-color -> backgroundColor。** 

需要注意的是 float 属性，根据 《JavaScript 高级程序》所描述的情况 ，float 是 JS 的保留关键字。根据 DOM2 级的规范，**取元素的 float 的时候应该使用 cssFloat。**


### 和 style 的异同
getComputedStyle 和 element.style 的相同点就是二者返回的都是 CSSStyleDeclaration 对象，取相应属性值得时候都是采用的 CSS 驼峰式写法，均需要注意 float 属性。

#### 不同点

* element.style 读取的只是元素的“内联样式”，即 写在元素的 style 属性上的样式；而 getComputedStyle 读取的样式是**最终样式**，包括了“内联样式”、“嵌入样式”和“外部样式”。
* element.style 既支持读也支持写，我们通过 element.style 即可改写元素的样式。而 getComputedStyle 仅支持读并不支持写入。

### 兼容性
　　关于 getComputedStyle 的兼容性问题，在 Chrome 和 Firefox 是支持该属性的，同时 IE 9 10 11 也是支持相同的特性的，IE 8并不支持这个特性。 IE 8 支持的是 element.currentStyle 这个属性，这个属性返回的值和 getComputedStyle 的返回基本一致，只是在 float 的支持上，IE 8 支持的是 styleFloat,这点需要注意。
　　
### 例子
获取某一特定属性

```
let imageWrapper = document.getElementsByClassName('imageWrapper')[0];

let wTransform =getComputedStyle(imageWrapper)['transform'];
```