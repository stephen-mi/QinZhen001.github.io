---
layout:     post
title:      "background"
date:       2017-09-26 15:50:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Css
---

> “Yeah It's on. ”


## 正文
[网页链接](http://www.w3school.com.cn/cssref/pr_background-size.asp)

### background-size

background-size 属性规定背景图像的尺寸。
**background-size: length|percentage|cover|contain;**

* length	
设置背景图像的高度和宽度。
第一个值设置宽度，第二个值设置高度。
如果只设置一个值，则第二个值会被设置为 "auto"。

* percentage	
以父元素的百分比来设置背景图像的宽度和高度。
第一个值设置宽度，第二个值设置高度。
如果只设置一个值，则第二个值会被设置为 "auto"。

* cover	
把背景图像扩展至足够大，以使背景图像完全覆盖背景区域。
背景图像的某些部分也许无法显示在背景定位区域中。

* contain	
  把图像图像扩展至最大尺寸，以使其宽度和高度完全适应内容区域。

[例子](http://www.topcss.org/demo/background-size-cover-contain.html)

####  background-size:cover
背景铺满元素

1. 调整背景图片的宽度或高度（较小者），以铺满整个元素
2. 保持背景图片的宽高比

####  background-size:contain
元素包含整个背景图片

1. 调整背景图片的宽度或高度（较大者），使背景图片完全包含在元素中
2. 保持背景图片的宽高比





### background-attachment 属性
[http://www.w3school.com.cn/cssref/pr_background-attachment.asp](http://www.w3school.com.cn/cssref/pr_background-attachment.asp)

```
body 
  { 
  background-image: url(bgimage.gif); 
  background-attachment: fixed;
  }
```

* scroll 	默认值。背景图像会随着页面其余部分的滚动而移动。
* fixed 	当页面的其余部分滚动时，背景图像不会移动。



### background-position 属性
[http://www.w3school.com.cn/cssref/pr_background-position.asp](http://www.w3school.com.cn/cssref/pr_background-position.asp)

```
body
{ 
background-image:url('bgimage.gif');
background-repeat:no-repeat;
background-attachment:fixed;
background-position:center;
}
```






