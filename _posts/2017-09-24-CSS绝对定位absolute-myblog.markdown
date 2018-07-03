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

**一旦给元素加上absolute或float就相当于给元素加上了display: block;**。什么意思呢？比如内联元素span默认宽度是自适应的，你给其加上width是不起作用的。要想width定宽，你需要将span设成display:block。但如果你给span加上absolute或float，那span的display属性自动就变成block，就可以指定width了。因此如果看到CSS里absolute/float和display:block同时出现，那display:block就是多余的CSS代码。


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

**float是欺骗父元素，让其父元素误以为其高度塌陷了，但float元素本身仍处于文档流中，文字会环绕着float元素，不会被遮蔽。**



absolute其实已经不能算是欺骗父元素了，而是出现了**层级关系**。如果处于正常的文档流中的父元素算是凡人的话，那absolute已经得道成仙，用现在的话说已经不在一个次元上。从父元素的视点看，设成absolute的图片已经完全消失不见了，因此从最左边开始显示文字。而absolute的层级高，所以图片遮盖了文字。



### 如何确定定位点

#### 设置了TRBL

相对最近的设定了position:relative/absolute的父（祖先）节点的**padding-box的区**进行定位（忽略文字），找不到符合条件的父（祖先）节点，则相对浏览器窗口进行定位。


### 没有设置了TRBL

则默认浮动，默认浮动在父级节点的content-box区。


### 和relative相爱相杀


#### 相杀
**relative主要用于限制absolute**


如果absolute元素没有position:static以外的父元素，那将相对body定位，天空才是它的极限。而一旦父元素被设为relative，那absolute子元素将相对于其父元素定位，就好像一只脚上被绑了绳子的鸟。

有个细节值得关注:
用absolute的left: 0;right: 0;top: 0;bottom: 0;来实现全屏拉伸，对于absolute元素来说，如果同时设置left和right会水平拉伸，同时设置top和bottom会垂直拉伸。


那为何不设width/height为100%呢？


因为前面说了，不设top/right/top/bottom的话absolute会从正常文档流应处的位置开始定位，因此做不到全屏。除非你设置width/height为100%后，同时再设left: 0; top: 0;。这样就显得很啰嗦。






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

### 和z-index的关系

z-index被太多的滥用了。几乎成了个定势思维：只要设了absolute就需要同步设置z-index。其实不是这样的。上面所有例子都没有用到z-index，同样正常分层正常覆盖。


以下情况根本不需要设z-index：

* 让absolute元素覆盖正常文档流内元素（不用设z-index，自然覆盖）
* 让后一个absolute元素覆盖前一个absolute元素（不用设z-index，只要在HTML端正确设置元素顺序即可）


那什么时候需要设置z-index呢？当absolute元素覆盖另一个absolute元素，且HTML端不方便调整DOM的先后顺序时，需要设置z-index: 1。非常少见的情况下多个absolute交错覆盖，或者需要显示最高层次的模态对话框时，可以设置z-index > 1。



## 补充





### 减少重绘和回流的开销

例如将元素隐藏，你或许会用display:none。

（这里插一句题外话，用display:none隐藏容易显示难，如果你用的是JQuery等插件，你或许会疑惑，直接用show/hide API不就行了，难在哪里？其中一个难点就是保存隐藏前元素的display属性值。例如A隐藏前display:block，B隐藏前display:inline，A和B都改成none隐藏后，要显示出来时，你必须事先保存元素的display属性值，否则做不到显示后display仍旧是原先的值。而这些工作JQuery插件都替你做好了，才让你产生了隐藏显示很容易的错觉。）



display:none会导致render tree重绘和回流。












作者：张歆琳
链接：https://www.jianshu.com/p/a3da5e27d22b
來源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。












