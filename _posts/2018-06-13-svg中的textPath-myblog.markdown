---
layout:     post
title:      "svg中的textPath"
date:       2018-06-13 16:17:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Other
---

> “Yeah It's on. ”


## 正文
[网页链接](https://blog.csdn.net/huanhuanq1209/article/details/71425612)

在学习css揭秘中，发现可以用svg的textPath实现各种路径的文字效果，打开了新世界大门。所以在此深入理解下SVG的textPath。

[环形文字](https://github.com/QinZhen001/learn-css-secrets/blob/master/%E5%AD%97%E4%BD%93%E6%8E%92%E5%8D%B0/%E7%8E%B0%E5%AE%9E%E4%B8%AD%E7%9A%84%E6%96%87%E5%AD%97%E6%95%88%E6%9E%9C/%E7%8E%AF%E5%BD%A2%E6%96%87%E5%AD%97/circular-text.html)


----------


SVG的文本可以沿着一条自定义的Path来排布，比如曲线、圆形等等，使用方式如下所示


```css
<svg viewBox="0 0 1000 300"
     xmlns="http://www.w3.org/2000/svg" 
     xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <path id="MyPath"
          d="M 100 200 
             C 200 100 300   0 400 100
             C 500 200 600 300 700 200
             C 800 100 900 100 900 100" />
  </defs>

  <use xlink:href="#MyPath" fill="none" stroke="red"  />

 <text font-family="Verdana" font-size="42.5">
    <textPath xlink:href="#MyPath">
      We go up, then we go down, then up again
    </textPath>
  </text>

  <!-- Show outline of the viewport using 'rect' element -->
  <rect x="1" y="1" width="998" height="298"
        fill="none" stroke="black" stroke-width="2" />
</svg>
```


使用很简单，在`<defs>`下定义一个path，在`<text>`元素下添加一个textPath引用，即可达到效果。



我们来对代码做一点儿修改，给text元素添加x和y：
```css
 <text x=100 y=100  font-family="Verdana" font-size="42.5">
    <textPath xlink:href="#MyPath">
      We go up, then we go down, then up again
    </textPath>
  </text>
```

可以注意到，text并没有进行简单的平移操作


这要如何理解呢？



原因很简单，text的坐标系被修改了，没有加入textPath之前，text处于一个直角坐标系下，x轴和y轴是两条相互垂直的直线。加入textPath之后，text的坐标系有如下性质：
1. 坐标系的x轴为path；
2. 坐标系的y轴在x轴的任意点上，方向都不一致，但是必然是该点对于**x轴切线的垂直线**。






