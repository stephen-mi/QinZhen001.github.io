---
layout:     post
title:      "CSS绝对定位absolute"
date:       2017-09-24 20:36:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Css
---

> “Yeah It's on. ”


## 正文

[网页链接](http://www.jianshu.com/p/a3da5e27d22b)

**absolute和float的相似处：包裹性 和 高度欺骗**

### 包裹性

```
<div style="border:4px solid blue;">
  <img src="img/25/1.jpg" />
</div>
<div style="border:4px solid red; position: absolute;">
  <img src="img/25/2.jpg" />
</div>
```

一旦给元素加上absolute或float就相当于给元素加上了display: inline-block;。什么意思呢？比如内联元素span默认宽度是自适应的，你给其加上width是不起作用的。要想width定宽，你需要将span设成display:block。但如果你给span加上absolute或float，那span的display属性自动就变成block，就可以指定width了。因此如果看到CSS里absolute/float和display:block同时出现，那display:block就是多余的CSS代码。


### 高度欺骗

上例中给图片外层的div加上absolute，因此高度欺骗未能很好的体现出来，将absolute移到内部图片上，效果就出来了：
```
<div style="border:4px solid blue;">
  <img src="img/25/1.jpg" />
</div>
<div style="border:4px solid red;">
  <img style="position: absolute;" src="img/25/2.jpg" />
</div>
```

absolute其实已经不能算是欺骗父元素了，而是出现了层级关系。如果处于正常的文档流中的父元素算是凡人的话，那absolute已经得道成仙，用现在的话说已经不在一个次元上。从父元素的视点看，设成absolute的图片已经完全消失不见了，因此从最左边开始显示文字。而absolute的层级高，所以图片遮盖了文字。



### 如何确定定位点

一旦absolute分层后，第一个出现的问题就是让浏览器在何处显示该元素。普通文档流里的元素，浏览器可以根据其父子兄弟元素的大小和位置，计算出该元素的位置。但分层后怎么办？基本思路如下：

第一种情况：用户只给元素指定了absolute，未指定left/top/right/bottom。此时absolute元素的左上角定位点位置就是该元素正常文档流里的位置。如上面图例中，图片熊猫是父元素的第一个孩子，因此左上角定位点就是父元素的content的左上角。

**结论重复一遍：未指定left/top/right/bottom的absolute元素，其在所处层级中的定位点就是正常文档流中该元素的定位点。**


----------

### 和relative相爱相杀


#### 相杀
relative主要用于限制absolute
如果absolute元素没有position:static以外的父元素，那将相对body定位，天空才是它的极限。而一旦父元素被设为relative，那absolute子元素将相对于其父元素定位，就好像一只脚上被绑了绳子的鸟。

**但有时候不一定是最好解决方案**
```
.tipIcon2 {
  background-color: #f00;
  color: #fff;
  border-radius:50%;
  text-align: center;
  position: absolute;
  width: 20px;
  height: 20px;
  margin:-10px 0 0 -10px;   //不需要top和right了，改用margin来进行偏移
}

<div style="display: inline-block;">  //父元素不需要relative了
  <img src="img/25/2.jpg" /><!--
 --><span class="tipIcon2">6</span> 
</div>
//img和soan间的HTML注释的目的是消除换行符，你也可以将span紧跟在img后面写到一行里
```



### 相爱
全屏加一层滤镜
```
.cover {
    position: absolute;
    left: 0;right: 0;top: 0;bottom: 0;
    background-color: #fff;
    opacity: .5;filter: alpha(opacity=50);
}

<div style="display: inline-block;">
  <img src="img/25/2.jpg" /><!--
  --><span class="tipIcon2">6</span>
</div>
现在是全屏滤镜时间
<span class="cover"></span>
```


----------


CSS里有个细节值得关注：用absolute的left: 0;right: 0;top: 0;bottom: 0;来实现全屏拉伸，对于absolute元素来说，如果同时设置left和right会水平拉伸，同时设置top和bottom会垂直拉伸。那为何不设width/height为100%呢？代码都贴给你了，可以自己试试。算了告诉你答案吧，前面说了，不设top/right/top/bottom的话absolute会从正常文档流应处的位置开始定位，因此做不到全屏。除非你设置width/height为100%后，同时再设left: 0; top: 0;。这样就显得很啰嗦。

