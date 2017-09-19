---
layout:     post
title:      "将 footer 保持在底部的最好方法"
date:       2017-09-19 22:52:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Css
---

> “Yeah It's on. ”


## 正文
[网页链接](http://www.jianshu.com/p/4896e6936ce3)

### 问题所在
页面内容太少，无法将内容区域撑开，从而在 footer 下面留下一大块空白。


### 解决方法
解决该问题的最好方法是采用 flexbox——CSS3提供的一种先进布局模型，旨在建立具有适应性的布局。如果你对 flexbox 还不怎么熟悉，文章最后有一些扩展阅读链接，可以帮助你了解 flexbox。

我们的演示页面应该具备 Header、主体内容区域和 Footer，下面是该页面的 HTML
```
<body>
    <header>...</header>
    <section class="main-content">...</section>
    <footer>...</footer>
</body>
```

为了启用 flex模式，我们将 body 的 display 属性设置为 flex, 然后将方向属性设置为列, （默认是行，也就是横向布局）。同时，将html 和 body 元素的高度设置为100%，使其充满整个屏幕。

```
html{
    height: 100%;
}

body{
    display: flex;
    flex-direction: column;
    height: 100%;
}
```


现在，我们需要调整各个区域占用的页面空间，我们将通过flex 属性来达到这一目的，该属性实际包含了三个属性，分别是：

* flex-grow：元素在同一容器中对可分配空间的分配比率，及扩展比率
* flex-shrink：如果空间不足，元素的收缩比率
* flex-basis：元素的伸缩基准值

我们希望 header 和footer 只占用他们应该占用的空间，将剩余的空间全部交给主体内容区域


```
header{
   /* 我们希望 header 采用固定的高度，只占用必须的空间 */
   /* 0 flex-grow, 0 flex-shrink, auto flex-basis */
   flex: 0 0 auto;
}

.main-content{
   /* 将 flex-grow 设置为1，该元素会占用全部可使用空间 
      而其他元素该属性值为0，因此不会得到多余的空间*/
   /* 1 flex-grow, 0 flex-shrink, auto flex-basis */
   flex: 1 0 auto;
}

footer{
   /* 和 header 一样，footer 也采用固定高度*/
   /* 0 flex-grow, 0 flex-shrink, auto flex-basis */
   flex: 0 0 auto;
}
```


----------


作者：Bing573
链接：http://www.jianshu.com/p/4896e6936ce3
來源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
