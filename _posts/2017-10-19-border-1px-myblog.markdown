---
layout:     post
title:      "移动端设置border-1px()"
date:       2017-10-19 16:45:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Css
---

> “Yeah It's on. ”


## 正文
 
[网页链接](https://blog.csdn.net/qq_34543438/article/details/73839086)

即通过伪类+子绝父相 实现1px的下边框


**stylus写法**
在 stylus文件夹中创建mixin.styl文件

```
border-1px($color)
  position: relative
  &:after
    display: block
    position: absolute
    left: 0
    bottom: 0
    width: 100%
    border-top: 1px solid $color
    content: ' '
```

在 stylus文件夹中创建base.styl文件，内容如下：（根据设备的dpr确定y轴的缩放比例）
```
@media (-webkit-min-device-pixel-ratio: 1.5),(min-device-pixel-ratio: 1.5)  
   .border-1px  
       &::after  
          -webkit-transform: scaleY(0.7)  
          transform: scaleY(0.7)  
  
@media (-webkit-min-device-pixel-ratio: 2),(min-device-pixel-ratio: 2)  
   .border-1px  
       &::after  
          -webkit-transform: scaleY(0.5)  
          transform: scaleY(0.5)  
```


### 调用
```
 .food
          position relative
          padding 12px 0
          box-sizing border-box
          border-1px(rgba(7, 17, 27, 0.1))
```



## 其他实现方式


### border-img
[https://www.w3cplus.com/css/fix-1px-for-retina.html](https://www.w3cplus.com/css/fix-1px-for-retina.html)


### postcss-write-svg
使用border-image每次都要去调整图片，总是需要成本的。基于上述的原因，我们可以借助于PostCSS的插件postcss-write-svg来帮助我们。如果你的项目中已经有使用PostCSS，那么只需要在项目中安装这个插件





