---
layout:     post
title:      "短小精悍css代码"
date:       2018-07-23 21:07:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Css
---

> “Yeah It's on. ”


## 正文

### 自定义滚动条

```
// scss
scrollBar {
  &::-webkit-scrollbar-track-piece {
    background: #d3dce6;
  }
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #99a9bf;
    border-radius: 20px;
  }
}
```


### 文字抗锯齿
[网页链接](http://usabilitypost.com/2012/11/05/stop-fixing-font-smoothing/)

```css
body {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
```

antialiased - 平滑像素级别上的字体，而不是子像素。在深色背景上从子像素渲染切换到抗锯齿，使其看起来更轻。



grayscale - 使用灰度抗锯齿渲染文本，而不是子像素。在深色背景上从子像素渲染切换到抗锯齿，使其看起来更轻。



**说人话，也就是在深色背景中浅色字体会更加纤细**


### 优化渲染文本
```css
body {
  text-rendering: optimizeLegibility;
}
```

该text-renderingCSS属性提供信息，以什么来优化渲染文本时的渲染引擎。

浏览器在速度，易读性和几何精度之间进行权衡。


```css
/* Keyword values */
text-rendering: auto;
text-rendering: optimizeSpeed;
text-rendering: optimizeLegibility;
text-rendering: geometricPrecision;

/* Global values */
text-rendering: inherit;
text-rendering: initial;
text-rendering: unset;
```

>该text-rendering属性是SVG属性，未在任何CSS标准中定义。但是，Gecko和WebKit浏览器允许您将此属性应用于Windows，macOS和Linux上的HTML和XML内容。



**一个非常明显的效果是optimizeLegibility**，对于某些字体（例如，Microsoft的Calibri，Candara，Constantia和Corbel，或者DejaVu字体系列），文本中的连字（ff，fi，fl等）小于20px 。



#### auto
浏览器在绘制文本时做出有关何时优化速度，易读性和几何精度的有根据的猜测。有关浏览器如何解释此值的差异，请参阅兼容性表。
#### optimizeSpeed
浏览器在绘制文本时强调渲染速度超过易读性和几何精度。它禁用字距调整和连字。
#### optimizeLegibility
浏览器强调了渲染速度和几何精度的易读性。这样可以进行字距调整和可选的连字。
#### geometricPrecision
浏览器强调几何精度，而不是渲染速度和易读性。字体的某些方面（例如字距调整）不会线性缩放。因此，此值可以使使用这些字体的文本看起来很好。




###  padding 的百分比值 

**padding 百分比值无论是水平方向还是垂直方向均是相对于宽度计算的！** 


margin 的百分比值 和padding 属性一样



### 内联元素垂直方向的 margin 

margin对尺寸的影响是针对具有块状特性的元素而言的，对于纯内联元素则不适用。 


和 padding 不同，内联元素垂直方向的 margin 是没有任何影响的，既不会影响外部尺寸， 也不会影响内部尺寸，有种石沉大海的感觉。对于水平方向，由于内联元素宽度表现为“包裹 性”，也不会影响内部尺寸。 



### margin:auto计算有一个前提条件

为什么明明 容器定高、元素定高，margin:auto 却无法垂直居中？ 

```css
.father {    
    height: 200px; 
} 
.son { 
    height: 100px; 
    margin: auto; 
} 
```

触发 margin:auto 计算有一个前提条件，就是 width 或 height 为 auto 时， 元素是具有对应方向的自动填充特性的


比方说这里，假如说把.son 元素的 height:100px 去 掉，.son 的高度会自动和父元素等高变成 200px 吗？显然不会！因此无法触发 margin:auto 计算，故而无法垂直居中。 

垂直方向 margin 无法实现居中了吗？当然是可以的，而且场景还不止一种。





### 元素尺寸



**元素尺寸**：对应 jQuery 中的$().width()和$().height()方法，包括 padding 和border，也就是元素的border box的尺寸。在原生的DOM API中写作offsetWidth 和 offsetHeight，所以，有时候也成为“元素偏移尺寸”。 


**元素内部尺寸**：对应 jQuery 中的$().innerWidth()和$().innerHeight()方法， 表示元素的内部区域尺寸，包括 padding 但不包括 border，也就是元素的 padding box 的尺寸。在原生的 DOM API 中写作 clientWidth 和 clientHeight，所以， 有时候也称为“元素可视尺寸”。 



**元素外部尺寸**：对应 jQuery 中的$().outerWidth(true)和$().outerHeight (true)方法，表示元素的外部尺寸，不仅包括 padding 和 border，还包括 margin， 也就是元素的 margin box 的尺寸。没有相对应的原生的 DOM API。





### margin改变元素尺寸


CSS 世界默认的流方向是水平方向，因此，对于普通流体元素，margin 只能改变元素水 平方向尺寸；但是，对于具有拉伸特性的绝对定位元素，则水平或垂直方向都可以，因为此时 的尺寸表现符合“充分利用可用空间”。



### margin负值与等高布局实例页面

[http://demo.cssworld.cn/4/3-2.php](http://demo.cssworld.cn/4/3-2.php)


核心思想:
```css
.column-left,
.column-right {
    margin-bottom: -9999px;
    padding-bottom: 9999px;
}
```











