---
layout:     post
title:      "naturalWidth和naturalHeight"
date:       2018-08-10 22:21:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - JavaScript
---

> “Yeah It's on. ”


## 正文
[网页链接](https://segmentfault.com/a/1190000007664778)

naturalWidth和naturalHeight是html5新增的属性，它们可以直接获取图片的原始宽高。而且这在Fixefox/Chrome/Safari/Opera/IE9里已经实现。


[https://caniuse.com/#search=naturalWidth](https://caniuse.com/#search=naturalWidth)

页面中的img元素想要获取图片的原始尺寸通常使用innerWidths属性或者使用jQuery的width()方法，
但是如果给图片添加了width样式，那么用innerWidth或width()获得宽度是不是你想要的，因为innerWidth或width()获取的是元素盒模型的实际渲染的宽度，而不是图片的原始宽度。

所以我们使用naturalWidth和naturalHeight去获取图片的原始尺寸，考虑的兼容问题，可以采用new Image()去获得图片的原始尺寸：

```javascript
  function getNaturalSize(img) {
    var narturalSize = {}
    if (img.naturalWidth && img.naturalHeight) {
      narturalSize.width = img.naturalWidth
      narturalSize.height = img.naturalHeight
    } else {
      var image = new Image()
      image.src = img.src
      narturalSize.width = image.width
      narturalSize.height = image.height
    }
    return narturalSize
  }
```




使用该方法可以获取图片的原始尺寸，通常在图片放大缩小，动态生成图片处需要用到该方法！









