---
layout:     post
title:      "filter和backdrop-filter"
date:       2017-08-11 17:24:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Css
---

> “Yeah It's on. ”


## 正文


[网页链接](http://www.w3cplus.com/css3/ten-effects-with-css3-filter)

Filters主要是运用在图片上，以实现一些特效。**他会直接影响其后代元素，有点类似于opacity。**  兼容性比较好，不仅仅作用于当前元素，后代元素也会继承这个属性，作用于一个空背景元素没有效果

```
 elm {
        filter: none | <filter-function > [ <filter-function> ]* 
      }      
```

其默认值是none，他不具备继承性，其中filter-function一个具有以下值可选：

* grayscale灰度
* sepia褐色（求专业指点翻译）
* saturate饱和度
* hue-rotate色相旋转
* invert反色
* opacity透明度
* brightness亮度
* contrast对比度
* blur模糊
* drop-shadow阴影

![enter description here][1]

## backdrop-filter
是在Filter Level2提出来的。其取值和filter
Level1中filter属性的属性值一样，包括：
* `<url>`
* blur()
* brightness()
* contrast()
* drop-shadow()
* grayscale()
* hue-rotate()
* invert()
* opacity()
* saturate()
* sepia()

既然backdrop-filter整出的效果和filter没有差别，那还整个新属性出来，这不蛋疼？其实否也，你是否有发现过，最早在SVG上得到的filter效果，只能使用在SVG元素上；而filter使用在元素上，会直接影响其后代所有元素。那么问题来了，如果只需要对元素的背景做filter效果，怎么破。这个时候就突显了backdrop-filter的重要性。

[backdrop-filter](https://www.w3cplus.com/css3/advanced-css-filters.html)


### 例子
```
background: rgba(0,0,0,.2); 
backdrop-filter: blur(2px) hue-rotate(180deg);
```

使用backdrop-filter可以实现我们一直无法实现的高斯模糊效果。
```
.header {
    background-color: rgba(255,255,255,.6);
    backdrop-filter: blur(5px)
}
```

backdrop-filter除了可以实现类似iOS系统上的高斯模糊效果之外，还可以实现一些其它效果，比如说提高图像上的文本的可读性效果，而且还可以结合多个backdrop-filter属性值，可以实现类似于CSS混合模式的图片合层效果


### 使用backdrop-filter事项
在使用backdrop-filter时，有一些小细节需要注意：

* **运用backdrop-filter元素的背景应该使用半透明，不然永远看不到效果  (重要)**
* 当backdrop-filter属性和裁剪属性(如border-radius、mask、clip-path等)结全在一起使用时，会有Bug产生
* backdrop-filter可以创建一个堆栈文本(Stacking Context)，类似于opacity属性一样
* 可以配合动画属性animation一起使用
* 到目前为止，仅有Safari浏览器支持，而且还需要添加前缀：-webkit-backdrop-filter,如果你使用autoprefixer这样的插件，无需考虑前缀相关事项

## filter()
但很多时候，只是希望元素的背景做效果调整，又不希望他会影响其他元素。而且又没有backdrop-filter属性的情形之下，filter()就显得格外的重要。

filter()并不等于以前介绍过的filter属性。简单的理解，一个是函数，一个是属性。这里是filter()函数。


filter(`<url>`, `<filter-function-list>`)

其中<url>是指一个图像，`<filter-function-list>`是一个过滤器。这两者结合在一起将会返回一个处理过的新图像。如：
```
.element {
    background: filter(url(path/to/img.jpg), blur(5px));
}
```
因此，你可以给图片使用过滤效果，然后填充到元素中，比如background-filter、background-opacity、background-blur


### 注意事项
* 规范中定义的过滤函数
* 和background-size属性一起使用会有Bug
* 支持动画
* 需要添加前缀：-webkit-filter()



  [1]: http://www.w3cplus.com/sites/default/files/filter-demo.png