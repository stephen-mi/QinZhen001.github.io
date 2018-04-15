---
layout:     post
title:      "css中Grid布局"
date:       2018-02-21 15:49:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Css
---

> “Yeah It's on. ”


## 正文
[5分钟学会Grid布局](http://www.css88.com/archives/8506)

[Grid布局完全指南](http://www.css88.com/archives/8510)

CSS Grid 布局由两个核心组成部分是 wrapper（父元素）和 items（子元素）。 wrapper 是实际的 grid(网格)，items 是 grid(网格) 内的内容。





>注意：在 网格容器(Grid Container) 上使用column，float，clear， vertical-align 不会产生任何效果。











```
<div class="wrapper">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
</div>
```
要把 wrapper 元素变成一个 grid(网格)，只要简单地把其 display 属性设置为 grid 即可：
```
.wrapper {
    display: grid;
}
```

### Columns(列) 和 rows(行)
为了使其成为二维的网格容器，我们需要定义列和行。让我们创建3列和2行。我们将使用grid-template-row和grid-template-column属性。
```
.wrapper {
    display: grid;
    grid-template-columns: 100px 100px 100px;
    grid-template-rows: 50px 50px;
}
```

正如你所看到的，我们为 grid-template-columns 写入了 3 个值，这样我们就会得到 3 列。 我们想要得到 2 行，因此我们为 grid-template-rows 指定了2个值。


### 放置 items(子元素)
这里才是体现 Grid 布局超能力的地方，因为它使得创建布局变得非常简单。
```
<div class="wrapper">
  <div class="item1">1</div>
  <div class="item2">2</div>
  <div class="item3">3</div>
  <div class="item4">4</div>
  <div class="item5">5</div>
  <div class="item6">6</div>
</div>
```
现在，我们来创建一个 3×3 的 grid(网格)：

```
.wrapper {
    display: grid;
    grid-template-columns: 100px 100px 100px;
    grid-template-rows: 100px 100px 100px;
}
```

要定位和调整 items(子元素) 大小，我们将使用 grid-column 和 grid-row 属性来设置：
```
.item1 {
    grid-column-start: 1;
    grid-column-end: 4;
}
```
item1 占据从第一条网格线开始，到第四条网格线结束。**换句话说，它将独立占据整行。**

![enter description here][1]

如果你不明白我们设置的只有 3 列，为什么有4条网格线呢？看看下面这个图像，我画了黑色的列网格线：


![enter description here][2]


一个更简单的缩写方法来编写上面的语法：
```
.item1 {
    grid-column: 1 / 4;
}
```


为了确保你已经正确理解了这个概念，我们重新排列其他的 items(子元素) 。

```
.item1 {
    grid-column-start: 1;
    grid-column-end: 3;
}
.item3 {
    grid-row-start: 2;
    grid-row-end: 4;
}
.item4 {
    grid-column-start: 2;
    grid-column-end: 4;
}
```

你可以尝试在你的脑子里过一边上面代码的布局效果，应该不会很难。

以下是页面上的布局效果：

![enter description here][3]


>截至2017年3月，许多浏览器都提供了对 CSS Grid 的原生支持，而且无需加浏览器前缀：Chrome（包括 Android ），Firefox，Safari（包括iOS）和 Opera 。 另一方面，Internet Explorer 10和11支持它，Edge 16也 已经支持。

  [1]: http://newimg88.b0.upaiyun.com/newimg88/2017/12/1_he7CoAzdQB3sei_WpHOtNg.png
  [2]: http://newimg88.b0.upaiyun.com/newimg88/2017/12/1_l-adYpQCGve7W6DWY949pw.png
  [3]: http://newimg88.b0.upaiyun.com/newimg88/2017/12/1_QDSybpxjXSat6UtoHgUapQ.png