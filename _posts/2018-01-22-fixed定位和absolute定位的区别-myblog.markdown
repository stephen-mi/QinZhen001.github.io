---
layout:     post
title:      "fixed定位和absolute定位的区别"
date:       2018-01-22 20:51:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Css
---

> “Yeah It's on. ”


## 正文

http://blog.csdn.net/taoerchun/article/details/47811783

fixed:固定定位
absolute:绝对定位

区别很简单：
1. 没有滚动条的情况下没有差异
2. 在有滚动条的情况下，fixed定位不会随滚动条移动而移动，而absolute则会随滚动条移动


可以这么理解，fixed：固定在当前window不动， absolute：会随参照对象元素的高度和宽度变化而变化

>一般fixed用在遮盖层和固定在页面某个位置，如固定在顶端的菜单栏，又如弹出提示框居中显示

### 例子
```
    <style>
        body {
            height: 1000px; /*让窗体出现滚动条*/
        }

        .fixed {
            position: fixed;
            left: 100px;
            right: 100px;
            top: 100px;
            bottom: 100px;
            width: auto;
            height: auto;
            border: 1px solid blue;

        }

        .absolute {
            position: absolute;
            left: 100px;
            right: 100px;
            top: 100px;
            bottom: 100px;
            width: auto;
            height: auto;
            border: 1px solid red;
        }
    </style>
</head>
<body>
<div class="fixed">fixed定位</div>
<div class="absolute">absolute定位</div>
</body>
```
