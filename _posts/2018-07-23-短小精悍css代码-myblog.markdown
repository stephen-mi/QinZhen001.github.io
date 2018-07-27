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












