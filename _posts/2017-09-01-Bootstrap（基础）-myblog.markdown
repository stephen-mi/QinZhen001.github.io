---
layout:     post
title:      "Bootstrap(基础)"
date:       2017-09-01 22:17:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Bootstrap
---

> “Yeah It's on. ”


## 正文
[网页链接]()
Bootstrap，来自 Twitter，是目前很受欢迎的前端框架。Bootstrap 是基于 HTML、CSS、JAVASCRIPT 的，它简洁灵活，使得 Web 开发更加快捷。 它由Twitter的设计师Mark Otto和Jacob Thornton合作开发，是一个CSS/HTML框架。Bootstrap提供了优雅的HTML和CSS规范，它即是由动态CSS语言Less写成。Bootstrap一经推出后颇受欢迎，一直是GitHub上的热门开源项目，包括NASA的MSNBC（微软全国广播公司）的Breaking News都使用了该项目。 国内一些移动开发者较为熟悉的框架，如WeX5前端开源框架等，也是基于Bootstrap源码进行性能优化而来。

----------

特点：
Bootstrap是基于HTML5和CSS3开发的，它在jQuery的基础上进行了更为个性化的完善，形成一套自己独有的网站风格，并兼容大部分jQuery插件。

### 表格相关
table(基础)
bordered（边框）
hover（悬停）
striped(斑纹)
condensed（紧凑）
responsive（响应）

### 移动端支持
```
<meta name="viewport" content="width=device-width, initial-scale=1">
```

### 实现水平表单效果
1. 在`<form>`元素是使用类名“form-horizontal”。
2. 配合Bootstrap框架的网格系统。

### 其他
* 大写变为小写 text-lowercase  
* 小写变为大写 text-uppercase 
* 首字母大写 text-capitalize

aria-haspopup :true表示点击的时候会出现菜单或是浮动元素； false表示没有pop-up效果。

aria-expanded:表示展开状态。默认为undefined, 表示当前展开状态未知。其它可选值：true表示元素是展开的；false表示元素不是展开的。

class="sr-only"
全称是 screen reader only，意为：（仅供）屏幕阅读器，这个 class 主要用于增强 accessbility（可访问性）。加上 sr-only的意义就在于能保证屏幕阅读器正确读取且不会影响 UI 的视觉呈现。



.col-xs- 超小屏幕 手机 (<768px)

.col-sm- 小屏幕 平板 (≥768px)

.col-md- 中等屏幕 桌面显示器 (≥992px)

.col-lg- 大屏幕 大桌面显示器 (≥1200px)

 