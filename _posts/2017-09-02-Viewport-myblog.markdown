---
layout:     post
title:      "Viewport"
date:       2017-09-03 20:26:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Html
---

> “Yeah It's on. ”


## 正文
[网页链接](http://www.cnblogs.com/pigtail/archive/2013/03/15/2961631.html)

### 什么是Viewport
手机浏览器是把页面放在一个虚拟的“窗口”（viewport）中，通常这个虚拟的“窗口”（viewport）比屏幕宽，这样就不用把每个网页挤到很小的窗口中（这样会破坏没有针对手机浏览器优化的网页的布局），用户可以通过平移和缩放来看网页的不同部分。移动版的 Safari 浏览器最新引进了 viewport 这个 meta tag，让网页开发者来控制 viewport 的大小和缩放，其他手机浏览器也基本支持。

### Viewport 基础
一个常用的针对移动网页优化过的页面的 viewport meta 标签大致如下：
```
<meta name=”viewport” content=”width=device-width, initial-scale=1, maximum-scale=1″>
```
width：控制 viewport 的大小，可以指定的一个值，如果 600，或者特殊的值，如 device-width 为设备的宽度（单位为缩放为 100% 时的 CSS 的像素）。
height：和 width 相对应，指定高度。
initial-scale：初始缩放比例，也即是当页面第一次 load 的时候缩放比例。
maximum-scale：允许用户缩放到的最大比例。
minimum-scale：允许用户缩放到的最小比例。
user-scalable：用户是否可以手动缩放

### 关于viewport的一些问题
viewport并非只是ios上的独有属性，在android、winphone上同样也有viewport。它们要解决的问题是相同的，即无视设备的真实分辨率，直接通过dpi，在物理尺寸和浏览器之间重设分辨率，这个分辨率和设备的分辨率无关。比如，你拿个3.5寸-320 * 480的iphone3 gs、3.5寸-640 *960的iphone4或者9.7寸-1024*768的ipad2，虽然设备的分辨率不同,物理尺寸也不同，但你可以通过设置viewport让它们在浏览器里有相同的分辨率。比如说，你的网站是800px宽，你可以通过设置viewport的width=800，来让你的网站在这三个不同的设备上都刚好满屏显示你的网站。




