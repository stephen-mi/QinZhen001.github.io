---
layout:     post
title:      "Elements面板篇"
date:       2017-09-18 12:38:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - 调试
---

> “Yeah It's on. ”


## 正文
[网页链接](https://segmentfault.com/a/1190000004088747)


在Elements面板，右键选中想要监听的DOM节点弹出菜单，鼠标停在Break on……，这时候就会出现子菜单，子菜单有三个选项：

* Subtree modifications，在该DOM结点及其子结点的结构有变动时中断。
* Attributes modifications，在该DOM结点（不包括其子结点）的属性有所变化时中断。
* node removal，在该DOM结点被移除出DOM树时中断。


----------

Attributes modifications可以用在找出某个属性或者class是由哪段代码添加或修改的，尤其是在修改JS插件时非常省事

### 查看DOM节点的最终CSS
chrome也是有的，藏在Elements - Computed

关于这个功能，有个比较常用的场景，那就是查看一段文字的字体。